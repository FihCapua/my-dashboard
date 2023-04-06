import { Content } from "../../components/Content";
import { ContentHeader } from "../../components/ContentHeader";
import { HistoryFinanceCard } from "../../components/HistoryFInanceCard";
import { SelectInput } from "../../components/SelectInput";
import { Container } from "./style";

export const List: React.FC = () => {
  const options = [
    { value: "Fiama", label: "Fiama" },
    { value: "Teste", label: "Teste" },
  ];

  return (
    <Container>
      <ContentHeader title="List" lineColor="#E44C4E">
        <SelectInput options={options} />
      </ContentHeader>
      <Content>
        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="05/05/1992"
          amount={(135.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        />
        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="05/05/1992"
          amount={(135.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        />
        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="05/05/1992"
          amount={(135.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        />
        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="05/05/1992"
          amount={(135.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        />
        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="05/05/1992"
          amount={(135.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        />
        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="05/05/1992"
          amount={(135.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        />
        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="05/05/1992"
          amount={(135.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        />
        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="05/05/1992"
          amount={(135.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        />
        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="05/05/1992"
          amount={(135.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        />
        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="05/05/1992"
          amount={(135.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        />
      </Content>
    </Container>
  );
};
