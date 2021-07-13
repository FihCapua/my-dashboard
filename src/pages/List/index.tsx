import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import { Container, Content, Filter } from './styles';

const List: React.FC = () => {
    const months = [
        { value: 7, label: 'Julho' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Setembro' },
    ];

    const years = [
        { value: 2021, label: 2021 },
        { value: 2022, label: 2022 },
        { value: 2023, label: 2023 },
    ];

    return (
        <Container>
            <ContentHeader title="List" lineColor="#F7931B">
                <SelectInput options={months} />
                <SelectInput options={years} />
            </ContentHeader>

            <Filter>
                <button
                    type="button"
                    className="tag-filter tag-filter-recurrent"
                >
                    Recorrentes
                </button>
                <button
                    type="button"
                    className="tag-filter tag-filter-eventual"
                >
                    Eventuais
                </button>
            </Filter>

            <Content>
                <HistoryFinanceCard
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="13/07/2021"
                    amount="R$ 130,00"
                />
            </Content>
        </Container>
    );
};

export default List;
