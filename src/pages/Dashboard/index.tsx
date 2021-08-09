import React, { useMemo, useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMonths from '../../utils/months';

import { Container, Content } from './styles';
import happyImg from '../../assets/happy.svg';
import grinningImg from '../../assets/grinning.svg';
import sadImg from '../../assets/sad.svg';
import opsImg from '../../assets/ops.svg';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryChartBox from '../../components/HistoryChartBox';
import BarChartBox from '../../components/BarChartBox';

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(
        new Date().getMonth() + 1
    );
    const [yearSelected, setYearSelected] = useState<number>(
        new Date().getFullYear()
    );

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            };
        });
    }, []);

    const years = useMemo(() => {
        const uniqueYears: number[] = [];

        [...expenses, ...gains].forEach((item) => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map((year) => {
            return {
                value: year,
                label: year,
            };
        });
    }, []);

    const totalExpenses = useMemo(() => {
        let total = 0;

        expenses.forEach((item) => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getUTCFullYear();

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount. Amount must be a number');
                }
            }
        });

        return total;
    }, [monthSelected, yearSelected]);

    const totalGains = useMemo(() => {
        let total = 0;

        gains.forEach((item) => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getUTCFullYear();

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount. Amount must be a number');
                }
            }
        });

        return total;
    }, [monthSelected, yearSelected]);

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    }, [totalGains, totalExpenses]);

    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: 'Que triste',
                description: 'Neste mês, você gastou mais do que deveria',
                footerText:
                    'Verifique seus gastos e tente cortar alguns gastos desnecessários',
                icon: sadImg,
            };
        } else if (totalGains === 0 && totalExpenses === 0) {
            return {
                title: 'Ooops',
                description:
                    'Neste mês, não há registros de entradas ou saídas',
                footerText:
                    'Parece que você nao fez nenhum registro no mês e ano selecionado',
                icon: opsImg,
            };
        } else if (totalBalance === 0) {
            return {
                title: 'Ufaaa',
                description: 'Neste mês, você gastou exatamente o que ganhou',
                footerText:
                    'Tenha cuidado. No próximo mês tente poupar o seu dinheiro',
                icon: grinningImg,
            };
        } else {
            return {
                title: 'Muito bem!',
                description: 'Sua carteira está positiva!',
                footerText: 'Continue assim. Considere investir seu saldo',
                icon: happyImg,
            };
        }
    }, [totalBalance, totalGains, totalExpenses]);

    // Atualização do gráfico de pizza
    const relationExepensesVsGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(
            ((totalExpenses / total) * 100).toFixed(1)
        );

        const data = [
            {
                name: 'Entradas',
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: '#E44C4E',
            },
            {
                name: 'Saídas',
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
                color: '#F7931B',
            },
        ];

        return data;
    }, [totalGains, totalExpenses]);

    // Atualização do gráfico de linha (cartesiano)
    const historyData = useMemo(() => {
        return listOfMonths
            .map((_, month) => {
                let amountEntry = 0;
                gains.forEach((gain) => {
                    const date = new Date(gain.date);
                    const gainMonth = date.getMonth();
                    const gainYear = date.getFullYear();

                    if (gainMonth === month && gainYear === yearSelected) {
                        try {
                            amountEntry += Number(gain.amount);
                        } catch {
                            throw new Error(
                                'amountEntry is invalid. amountEntry must be valid number'
                            );
                        }
                    }
                });

                let amountOutput = 0;
                expenses.forEach((expense) => {
                    const date = new Date(expense.date);
                    const expenseMonth = date.getMonth();
                    const expenseYear = date.getFullYear();

                    if (
                        expenseMonth === month &&
                        expenseYear === yearSelected
                    ) {
                        try {
                            amountOutput += Number(expense.amount);
                        } catch {
                            throw new Error(
                                'amountOutput is invalid. amountOutput must be valid number'
                            );
                        }
                    }
                });

                return {
                    monthNumber: month,
                    month: listOfMonths[month].substr(0, 3),
                    amountEntry,
                    amountOutput,
                };
            })
            .filter((item) => {
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();

                // P/ mostrar no grafico de linha somente ate o mês atual se for ano corrente ou todos os meses dos anos antigos
                return (
                    (yearSelected === currentYear &&
                        item.monthNumber <= currentMonth) ||
                    yearSelected < currentYear
                );
            });
    }, [yearSelected]);

    // gráficos de barras
    const relationExpensesRecurrentVsEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses
            .filter((expense) => {
                const date = new Date(expense.date);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;

                return month === monthSelected && year === yearSelected;
            })
            .forEach((expense) => {
                if (expense.frequency === 'recorrente') {
                    return (amountRecurrent += Number(expense.amount));
                }

                if (expense.frequency === 'eventual') {
                    return (amountEventual += Number(expense.amount));
                }
            });

        const total = amountRecurrent + amountEventual;

        const percentRecurrent = Number(
            ((amountRecurrent / total) * 100).toFixed(1)
        );
        const percentEventual = Number(
            ((amountEventual / total) * 100).toFixed(1)
        );

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: '#F7931B',
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: '#E44C4E',
            },
        ];
    }, [monthSelected, yearSelected]);

    const relationGainsRecurrentVsEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains
            .filter((gain) => {
                const date = new Date(gain.date);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;

                return month === monthSelected && year === yearSelected;
            })
            .forEach((gain) => {
                if (gain.frequency === 'recorrente') {
                    return (amountRecurrent += Number(gain.amount));
                }

                if (gain.frequency === 'eventual') {
                    return (amountEventual += Number(gain.amount));
                }
            });

        const total = amountRecurrent + amountEventual;

        const percentRecurrent = Number(
            ((amountRecurrent / total) * 100).toFixed(1)
        );
        const percentEventual = Number(
            ((amountEventual / total) * 100).toFixed(1)
        );

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: '#F7931B',
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: '#E44C4E',
            },
        ];
    }, [monthSelected, yearSelected]);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (err) {
            throw new Error('invalid month value. Is accept 0 - 12');
        }
    };

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (err) {
            throw new Error('invalid year value. Is accept integer number');
        }
    };

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput
                    options={months}
                    defaultValue={monthSelected}
                    onChange={(event) =>
                        handleMonthSelected(event.target.value)
                    }
                />
                <SelectInput
                    options={years}
                    defaultValue={yearSelected}
                    onChange={(event) => handleYearSelected(event.target.value)}
                />
            </ContentHeader>

            <Content>
                <WalletBox
                    title="Saldo"
                    color="#4E41F0"
                    amount={totalBalance}
                    footerlabel="atualizado com base nas entradas e saídas"
                    icon="dollar"
                />

                <WalletBox
                    title="Entradas"
                    amount={totalGains}
                    color="#F7931B"
                    footerlabel="atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                />

                <WalletBox
                    title="Saídas"
                    color="#E44C4E"
                    amount={totalExpenses}
                    footerlabel="atualizado com base nas entradas e saídas"
                    icon="arrowDown"
                />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChartBox data={relationExepensesVsGains} />

                <HistoryChartBox
                    data={historyData}
                    lineColorAmountEntry="#F7931B"
                    lineColorAmountOutput="#E44C4E"
                />

                <BarChartBox
                    title="Saídas"
                    data={relationExpensesRecurrentVsEventual}
                />

                <BarChartBox
                    title="Entradas"
                    data={relationGainsRecurrentVsEventual}
                />
            </Content>
        </Container>
    );
};

export default Dashboard;
