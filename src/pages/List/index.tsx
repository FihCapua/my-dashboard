import React, { useMemo } from 'react';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import { Container, Content, Filter } from './styles';

interface IRouteParams {
    match: {
        params: {
            type: string;
        };
    };
}

const List: React.FC<IRouteParams> = ({ match }) => {
    // Desestruturação do tipo string para os parametros do match, p/ serem lidos no return
    const { type } = match.params;
    // useMemo = além de memorizar valores, ele fica escutando as ações e mudando de acordo com a necessidade
    const options = useMemo(() => {
        return type === 'entry-balance'
            ? {
                  title: 'Entradas',
                  lineColor: '#F7931B',
              }
            : {
                  title: 'Saídas',
                  lineColor: '#E44C4E',
              };
    }, [type]);

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
            <ContentHeader title={options.title} lineColor={options.lineColor}>
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
