import React, { useMemo, useState, useEffect } from 'react';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import { Container, Content, Filter } from './styles';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

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
    const [monthSelected, setMonthSelected] = useState<string>(
        String(new Date().getMonth() + 1)
    );
    const [yearSelected, setYearSelected] = useState<string>(
        String(new Date().getFullYear())
    );
    const [selectFrequency, setSelectFrequency] = useState([
        'recorrente',
        'eventual',
    ]);
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

    // useMemo vai memorizar os dados
    const years = useMemo(() => {
        // uniqueYears retornará uma lista
        // eslint-disable-next-line prefer-const
        let uniqueYears: number[] = [];

        // percorrerá os itens da lista e retornará os valores
        listData.forEach((item) => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            // se uniqueYears no ano em questao for unico, inclui o ano - se nao, nao inclui
            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        // percorrerá o uniqueYears e retorna o valor e do mes
        return uniqueYears.map((year) => {
            return {
                value: year,
                label: year,
            };
        });
    }, [listData]);

    // useMemo vai memorizar os dados
    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            };
        });
    }, []);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = selectFrequency.findIndex(
            (item) => item === frequency
        );

        // Se ja estiver com a seleção marcada desmarque
        if (alreadySelected >= 0) {
            const filtered = selectFrequency.filter(
                (item) => item !== frequency
            );
            // manda só o que o usuario escolheu manter filtrado
            setSelectFrequency(filtered);
        } else {
            setSelectFrequency((prev) => [...prev, frequency]); // pega o valor selecionado anterior espalha e adiciona mais um filtro caso o usuario selecione
        }
    };

    // Utiliza a mesma ideia do useMemo, porém ele dispara toda vez que a tela é carregada
    useEffect(() => {
        // Primeiro a aplicação filtro por mês e ano
        const filteredDate = listData.filter((item) => {
            const date = new Date(String(item.date));
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return (
                month === monthSelected &&
                year === yearSelected &&
                selectFrequency.includes(item.frequency)
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
    }, [listData, monthSelected, yearSelected, selectFrequency]);

    return (
        <Container>
            <ContentHeader title={options.title} lineColor={options.lineColor}>
                <SelectInput
                    options={months}
                    defaultValue={monthSelected}
                    onChange={(event) => setMonthSelected(event.target.value)}
                />
                <SelectInput
                    options={years}
                    defaultValue={yearSelected}
                    onChange={(event) => setYearSelected(event.target.value)}
                />
            </ContentHeader>

            <Filter>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent ${
                        selectFrequency.includes('recorrente') && 'tag-actived'
                    }`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>
                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual ${
                        selectFrequency.includes('eventual') && 'tag-actived'
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
