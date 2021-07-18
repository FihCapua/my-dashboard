import React, { useMemo, useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMonths from '../../utils/months';

import { Container, Content } from './styles';
import WalletBox from '../../components/WalletBox';

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
                    amount={150.0}
                    footerlabel="atualizado com base nas entradas e saídas"
                    icon="dollar"
                />

                <WalletBox
                    title="Entradas"
                    amount={5000.0}
                    color="#F7931B"
                    footerlabel="atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                />

                <WalletBox
                    title="Saídas"
                    color="#E44C4E"
                    amount={4850.0}
                    footerlabel="atualizado com base nas entradas e saídas"
                    icon="arrowDown"
                />
            </Content>
        </Container>
    );
};

export default Dashboard;
