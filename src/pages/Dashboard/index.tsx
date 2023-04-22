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
import sadFace from "../../assets/sad.svg";

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

  const totalExpenses = useMemo(() => {
    let totalAmount: number = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (year === yearSelected && month === monthSelected) {
        try {
          totalAmount += Number(item.amount);
        } catch (error) {
          console.error("Invalid amount! Amount must be a number");
        }
      }
    });

    return totalAmount;
  }, [yearSelected, monthSelected]);

  const totalGains = useMemo(() => {
    let totalAmount: number = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (year === yearSelected && month === monthSelected) {
        try {
          totalAmount += Number(item.amount);
        } catch (error) {
          console.error("Invalid amount! Amount must be a number");
        }
      }
    });

    return totalAmount;
  }, [yearSelected, monthSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que pena!",
        description: "Nesse mês você gastou mais do que deveria",
        footerText: "Verifique seus gastos",
        icon: sadFace,
      };
    } else if (totalBalance === 0) {
      return {
        title: "Ufa, foi por pouco!",
        description: "Nesse mês você gastou exatamente o que ganhou!",
        footerText: "Tenha mais cuidado no próximo mês",
        icon: sadFace,
      };
    } else {
      return {
        title: "Muito bem!",
        description: "Sua Carteira está positiva!",
        footerText: "Considere investir o seu saldo",
        icon: happyFace,
      };
    }
  }, [totalBalance]);

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
          amount={totalBalance}
          icon={"dolar"}
          footerLabel="atualizado c/ base nas entradas e saídas"
        />
        <WalletBox
          title="Entradas"
          color="#F7931B"
          amount={totalGains}
          icon={"arrowUp"}
          footerLabel="atualizado c/ base nas entradas e saídas"
        />
        <WalletBox
          title="Saídas"
          color="#E44C4E"
          amount={totalExpenses}
          icon={"arrowDown"}
          footerLabel="atualizado c/ base nas entradas e saídas"
        />

        <MessageBox
          title={message.title}
          description={message.description}
          icon={message.icon}
          footerText={message.footerText}
        />
      </Content>
    </Container>
  );
};
