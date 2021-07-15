import React, { useMemo, useState, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import { Container, Content, Filter } from './styles';

// Essa interface informa quais valores serao recebidos no data
interface IData {
    id: string;
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
    const [monthSelected, setMonthSelected] = useState<number>(
        new Date().getMonth() + 1
    );
    const [yearSelected, setYearSelected] = useState<number>(
        new Date().getFullYear()
    );
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState([
        'recorrente',
        'eventual',
    ]);
    // Desestruturação do tipo string para os parametros do match, p/ serem lidos no return
    const movimentType = match.params.type;
    // useMemo = além de memorizar valores, ele fica escutando as ações e mudando de acordo com a necessidade

    const pageData = useMemo(() => {
        return movimentType === 'entry-balance'
            ? {
                  title: 'Entrada',
                  lineColor: '#F7931B',
                  data: gains,
              }
            : {
                  title: 'Saída',
                  lineColor: '#E44C4E',
                  data: expenses,
              };
    }, [movimentType]);

    // useMemo vai memorizar os dados
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

        const { data } = pageData;

        data.forEach((item) => {
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
    }, [pageData]);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(
            (item) => item === frequency
        );

        // Se ja estiver com a seleção marcada desmarque
        if (alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(
                (item) => item !== frequency
            );
            // manda só o que o usuario escolheu manter filtrado
            setFrequencyFilterSelected(filtered);
        } else {
            setFrequencyFilterSelected((prev) => [...prev, frequency]); // pega o valor selecionado anterior espalha e adiciona mais um filtro caso o usuario selecione
        }
    };

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

    // Utiliza a mesma ideia do useMemo, porém ele dispara toda vez que a tela é carregada
    useEffect(() => {
        const { data } = pageData;
        // Primeiro a aplicação filtro por mês e ano
        const filteredDate = data.filter((item) => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return (
                month === monthSelected &&
                year === yearSelected &&
                frequencyFilterSelected.includes(item.frequency)
            );
        });

        // E depois devolve todos os valores formatados
        const formattedData = filteredDate.map((item) => {
            return {
                id: String(new Date().getTime()) + item.amount,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor:
                    item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
            };
        });

        setData(formattedData);
    }, [pageData, monthSelected, yearSelected, frequencyFilterSelected]);

    return (
        <Container>
            <ContentHeader
                title={pageData.title}
                lineColor={pageData.lineColor}
            >
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

            <Filter>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent ${
                        frequencyFilterSelected.includes('recorrente') &&
                        'tag-actived'
                    }`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>
                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual ${
                        frequencyFilterSelected.includes('eventual') &&
                        'tag-actived'
                    }`}
                    onClick={() => handleFrequencyClick('eventual')}
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
