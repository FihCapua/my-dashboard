import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import { Container, Content } from './styles';

const List: React.FC = () => {
    const options = [
        { value: 'Teste', label: 'Teste' },
        { value: 'Teste2', label: 'Teste2' },
    ];

    return (
        <Container>
            <ContentHeader title="List" lineColor="#F7931B">
                <SelectInput options={options} />
            </ContentHeader>

            <Content>
                <HistoryFinanceCard
                    cardColor="#313862"
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="13/07/2021"
                    amount="R$ 130,00"
                />

                <HistoryFinanceCard
                    cardColor="#313862"
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="13/07/2021"
                    amount="R$ 130,00"
                />

                <HistoryFinanceCard
                    cardColor="#313862"
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="13/07/2021"
                    amount="R$ 130,00"
                />

                <HistoryFinanceCard
                    cardColor="#313862"
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="13/07/2021"
                    amount="R$ 130,00"
                />

                <HistoryFinanceCard
                    cardColor="#313862"
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="13/07/2021"
                    amount="R$ 130,00"
                />

                <HistoryFinanceCard
                    cardColor="#313862"
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="13/07/2021"
                    amount="R$ 130,00"
                />

                <HistoryFinanceCard
                    cardColor="#313862"
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="13/07/2021"
                    amount="R$ 130,00"
                />

                <HistoryFinanceCard
                    cardColor="#313862"
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="13/07/2021"
                    amount="R$ 130,00"
                />

                <HistoryFinanceCard
                    cardColor="#313862"
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="13/07/2021"
                    amount="R$ 130,00"
                />

                <HistoryFinanceCard
                    cardColor="#313862"
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
