import React, { useMemo, useState, useEffect } from 'react';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import { Container, Content, Filter } from './styles';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

// Essa interface informa quais valores serao recebidos no data
interface IData {
    id: number;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

interface IRouteParams {
    match: {
        params: {
            type: string;
        };
    };
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
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

    const listData = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses;
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

    // Utiliza a mesma ideia do useMemo, porém ele dispara toda vez que a tela é carregada
    useEffect(() => {
        const response = listData.map((item) => {
            return {
                id: Math.random() * data.length,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor:
                    item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
            };
        });
        setData(response);
    }, []);

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
                {data.map((item) => (
                    <HistoryFinanceCard
                        key={item.id}
                        tagColor={item.tagColor}
                        title={item.description}
                        subtitle={item.dateFormatted}
                        amount={item.amountFormatted}
                    />
                ))}
            </Content>
        </Container>
    );
};

export default List;
