import React, { useEffect, useMemo, useState } from "react";
import { ContentHeader } from "../../components/ContentHeader";
import { HistoryFinanceCard } from "../../components/HistoryFInanceCard";
import { SelectInput } from "../../components/SelectInput";
import { Container, Filters } from "./style";

import { gains } from "../../mock/gains";
import { expenses } from "../../mock/expenses";

import { listOfMonths } from "../../utils/listOfMonths";

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
  const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual'])


  const type = match.params.type


  const title  = useMemo(() => {
    return type === 'entry-balance' ? 'Entradas': 'Saídas'
  }, [type])

  const lineColor = useMemo(() => {
    return type === 'entry-balance' ? '#F7931B' : '#E44C4E'
  }, [type])

  const listDate = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses
  }, [type])

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month
      }
    })
  }, [listDate])
  

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    listDate.forEach(item => {
      const date = new Date(item.date)
      const year = date.getFullYear()

      if(!uniqueYears.includes(year)) {
        uniqueYears.push(year)
      }
    })

    return uniqueYears.map(year => {
      return {
        value: year,
        label: year
      }
    })
  }, [listDate])

  const handleFrequency = (frequency: string) => {
    const alreadyFrequency = selectedFrequency.findIndex(item => item === frequency)

    if(alreadyFrequency >= 0) {
      const filtered = selectedFrequency.filter(item => item !== frequency)
      setSelectedFrequency(filtered)
    } else {
      setSelectedFrequency((prev) => [...prev, frequency])
    }
  }

  useEffect(() => {
    const filteredDate = listDate.filter(item => {
      const date = new Date(item.date)
      const month = String(date.getMonth() + 1)
      const year = String(date.getFullYear())

      return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency)
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
  }, [listDate, monthSelected, yearSelected, selectedFrequency])

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput options={months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected} />
        <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected} />
      </ContentHeader>

      <Filters>
        <button 
          className={`tag-filter tag-filter-recurrent ${selectedFrequency.includes('recorrente') && 'tag-actived'}`}
          onClick={() => handleFrequency('recorrente')}
        >
          Recorrentes
        </button>
        <button 
          className={`tag-filter tag-filter-eventual ${selectedFrequency.includes('recorrente') && 'tag-actived'}`}
          onClick={() => handleFrequency('eventual')}
        >
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