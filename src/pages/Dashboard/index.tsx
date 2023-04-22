import React, { useMemo, useState } from "react";
import { ContentHeader } from "../../components/ContentHeader";
import { SelectInput } from "../../components/SelectInput";
import { Container, Content } from "./style";

import { gains } from "../../mock/gains";
import { expenses } from "../../mock/expenses";

import { listOfMonths } from "../../utils/listOfMonths";
import { WalletBox } from "../../components/WalletBox";
import { MessageBox } from "../../components/MessageBox";
import happyFace from "../../assets/happy.svg";

export const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );

  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  const [selectedFrequency, setSelectedFrequency] = useState([
    "recorrente",
    "eventual",
  ]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...gains, ...expenses].forEach((item) => {
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
    } catch (error) {
      console.error("Ivalid month value. Is accept 0 - 12");
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      console.error("Ivalid year value. Is accept integer numbers");
    }
  };

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f77f10">
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Content>
        <WalletBox
          title="Saldo"
          color="#4E41F0"
          amount={150}
          icon={"dolar"}
          footerLabel="atualizado c/ base nas entradas e saídas"
        />
        <WalletBox
          title="Entradas"
          color="#F7931B"
          amount={150}
          icon={"arrowUp"}
          footerLabel="atualizado c/ base nas entradas e saídas"
        />
        <WalletBox
          title="Saídas"
          color="#E44C4E"
          amount={150}
          icon={"arrowDown"}
          footerLabel="atualizado c/ base nas entradas e saídas"
        />

        <MessageBox
          title="Muito bem!"
          description="Sua Carteira está positiva!"
          icon={happyFace}
          footerText="Considere investir o seu saldo"
        />
      </Content>
    </Container>
  );
};
