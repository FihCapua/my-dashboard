import { ContentHeader } from "../../components/ContentHeader";
import { HistoryFinanceCard } from "../../components/HistoryFInanceCard";
import { SelectInput } from "../../components/SelectInput";
import { Container, Filters } from "./style";

export const List: React.FC = () => {
  const months = [
    { value: 1, label: "Janeiro" },
    { value: 2, label: "Fevereiro" },
    { value: 3, label: "Março" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Maio" },
    { value: 6, label: "Junho" },
    { value: 7, label: "Julho" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Setemebro" },
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

  return (
    <Container>
      <ContentHeader title="List" lineColor="#E44C4E">
        <SelectInput options={months} />
        <SelectInput options={years} />
      </ContentHeader>

      <Filters>
        <button className="tag-filter tag-filter-recurrent">
          Recorrentes
        </button>
        <button className="tag-filter tag-filter-eventual">
          Eventuais
        </button>
      </Filters>

      <HistoryFinanceCard
        tagColor="#E44C4E"
        title="Conta de Luz"
        subtitle="05/05/1992"
        amount={(135.5).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      />
    </Container>
  );
};
