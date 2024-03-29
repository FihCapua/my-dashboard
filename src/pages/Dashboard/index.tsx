import React, { useMemo, useState, useCallback } from "react";
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
import { PieChartBox } from "../../components/PieChart";
import { HistoryBox } from "../../components/HistoryBox";
import { BarChartBox } from "../../components/BarChartBox";

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
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Eita!",
        description: "Esse mês não há registros de entradas ou saídas",
        footerText: "Você não fez nenhum registro esse mês",
        icon: sadFace,
      };
    }else if (totalBalance === 0) {
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
  }, [totalBalance, totalGains, totalExpenses]);

  const relationGainsVsExpenses = useMemo(() => {
    const total = totalGains + totalExpenses;
    const percentGains = Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: "#E44C4E",
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0,
        color: "#F7931B",
      },
    ];

    return data;
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return (
      listOfMonths
        .map((_, month) => {
          let amountEntry = 0;

          gains.forEach((gain) => {
            const date = new Date(gain.date);
            const gainMonth = date.getMonth() + 1;
            const gainYear = date.getFullYear();

            if (gainMonth === month && gainYear === yearSelected) {
              try {
                amountEntry += Number(gain.amount);
              } catch (error) {
                console.log(error);
              }
            }
          });

          let amountOutput = 0;

          expenses.forEach((expenses) => {
            const date = new Date(expenses.date);
            const expensesMonth = date.getMonth() + 1;
            const expensesYear = date.getFullYear();

            if (expensesMonth === month && expensesYear === yearSelected) {
              try {
                amountOutput += Number(expenses.amount);
              } catch (error) {
                console.log(error);
              }
            }
          });

          return {
            monthNumber: month,
            month: listOfMonths[month].substring(0, 3),
            amountEntry,
            amountOutput,
          };
        })
        // ajuste no histórico de saldo pra deixar a visualização somente até o mês atual do ano atual ou todos os meses nos anos anteriores
        .filter((item) => {
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();

          return (
            (yearSelected === currentYear &&
              item.monthNumber <= currentMonth) ||
            yearSelected < currentYear
          );
        })
    );
  }, [yearSelected]);

  const relationExpensesRecurrentVsEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === "recorrente") {
          return (amountRecurrent += Number(expense.amount));
        }

        if (expense.frequency === "eventual") {
          return (amountEventual += Number(expense.amount));
        }
      });

    const total = amountRecurrent + amountEventual;
    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0, 
        color: "#F7931B",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: "#E44C4E",
      },
    ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVsEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((gain) => {
        if (gain.frequency === "recorrente") {
          return (amountRecurrent += Number(gain.amount));
        }

        if (gain.frequency === "eventual") {
          return (amountEventual += Number(gain.amount));
        }
      });

    const total = amountRecurrent + amountEventual;
    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: "#F7931B",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: "#E44C4E",
      },
    ];
  }, [monthSelected, yearSelected]);

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      console.error("Ivalid month value. Is accept 0 - 12");
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      console.error("Ivalid year value. Is accept integer numbers");
    }
  }, []);

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

        <PieChartBox data={relationGainsVsExpenses} />

        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />

        <BarChartBox
          title="Saídas"
          data={relationExpensesRecurrentVsEventual}
        />

        <BarChartBox title="Entradas" data={relationGainsRecurrentVsEventual} />
      </Content>
    </Container>
  );
};
