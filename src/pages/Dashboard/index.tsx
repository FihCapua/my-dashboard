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
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';

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
    }, [totalBalance]);

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
            </Content>
        </Container>
    );
};

export default Dashboard;
