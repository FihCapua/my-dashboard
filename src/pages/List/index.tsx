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
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())
  const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual'])


  const type = match.params.type

  const pageData = useMemo(() => {
    return type === 'entry-balance' ?
    {
      title: 'Entradas',
      lineColor: '#4E41F0',
      listDate: gains
    }
    :
    {
      title: 'Saídas',
      lineColor: '#E44C4E',
      listDate: expenses
    }
  }, [type])

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month
      }
    })
  }, [pageData.listDate])
  

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    pageData.listDate.forEach(item => {
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
  }, [pageData.listDate])

  const handleFrequency = (frequency: string) => {
    const alreadyFrequency = selectedFrequency.findIndex(item => item === frequency)

    if(alreadyFrequency >= 0) {
      const filtered = selectedFrequency.filter(item => item !== frequency)
      setSelectedFrequency(filtered)
    } else {
      setSelectedFrequency((prev) => [...prev, frequency])
    }
  }

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month)
      setMonthSelected(parseMonth)
    } catch(error) {
      console.error('Ivalid month value. Is accept 0 - 12')
    }
  }

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year)
      setYearSelected(parseYear)
    } catch(error) {
      console.error('Ivalid year value. Is accept integer numbers')
    }
  }

  useEffect(() => {
    const filteredDate = pageData.listDate.filter(item => {
      const date = new Date(item.date)
      const month = date.getMonth() + 1
      const year = date.getFullYear()

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
  }, [pageData.listDate, monthSelected, yearSelected, selectedFrequency])

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected} />
        <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected} />
      </ContentHeader>

      <Filters>
        <button 
          className={`
          tag-filter 
          tag-filter-recurrent
          ${selectedFrequency.includes('recorrente') && 'tag-actived'}`}
          onClick={() => handleFrequency('recorrente')}
        >
          Recorrentes
        </button>
        <button 
          className={`
          tag-filter 
          tag-filter-eventual
          ${selectedFrequency.includes('eventual') && 'tag-actived'}`}
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