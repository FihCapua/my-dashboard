import React, { useEffect, useMemo, useState } from "react";
import { ContentHeader } from "../../components/ContentHeader";
import { HistoryFinanceCard } from "../../components/HistoryFInanceCard";
import { SelectInput } from "../../components/SelectInput";
import { Container, Filters } from "./style";

import { gains } from "../../mock/gains";
import { expenses } from "../../mock/expenses";

interface IRouteParams {
  match: {
    params: {
      type: any
    }
  } 
}

interface IDataProps {
  id: string,
  description: string,
  amountFormatted: string,
  dateFormatted: string,
  tagColor: string
}

export const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IDataProps[]>([])
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1))
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()))


  const type = match.params.type


  const title  = useMemo(() => {
    return type === 'entry-balance' ? 'Entradas': 'Saídas'
  }, [type])

  const lineColor = useMemo(() => {
    return type === 'entry-balance' ? '#F7931B' : '#E44C4E'
  }, [type])

  const dataControl = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses
  }, [type])

  const months = [
    { value: 1, label: "Janeiro" },
    { value: 2, label: "Fevereiro" },
    { value: 3, label: "Março" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Maio" },
    { value: 6, label: "Junho" },
    { value: 7, label: "Julho" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Setembro" },
    { value: 10, label: "Outubro" },
    { value: 11, label: "Novembro" },
    { value: 12, label: "Dezembro" },
  ];

  const years = [
    { value: 2023, label: 2023 },
    { value: 2022, label: 2022 },
    { value: 2021, label: 2021 },
    { value: 2020, label: 2020 },
  ]

  useEffect(() => {
    const filteredDate = dataControl.filter(item => {
      const date = new Date(item.date)
      const month = String(date.getMonth() + 1)
      const year = String(date.getFullYear())

      return month === monthSelected && year === yearSelected
    })
    
    const formattedData = filteredDate.map(item => {
      return {
        id: String(new Date().getTime() + item.amount),
        description: item.description,
        amountFormatted: Number(item.amount).toLocaleString(),
        dateFormatted: new Date(item.date).toISOString().substr(0, 10).split('-').reverse().join('/'),
        tagColor: item.frequency
      }
    })

    setData(formattedData)
  }, [dataControl, monthSelected, yearSelected])

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput options={months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected} />
        <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected} />
      </ContentHeader>

      <Filters>
        <button className="tag-filter tag-filter-recurrent">
          Recorrentes
        </button>
        <button className="tag-filter tag-filter-eventual">
          Eventuais
        </button>
      </Filters>

      {
        data.map(item => (
          <HistoryFinanceCard
            key={item.id}
            title={item.description}
            subtitle={item.dateFormatted}
            amount={`R$ ${item.amountFormatted}`}
            tagColor={item.tagColor === 'recorrente' ? '#4E41F0' : '#E44C4E'}
          />
        ))
      }

    </Container>
  );
};
