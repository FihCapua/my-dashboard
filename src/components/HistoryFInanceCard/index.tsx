import { Container, Tag } from "./style"

interface IHistoryFinanceCardProps {
    cardColor: string;
    tagColor: string;
    title: string;
    subtitle: string;
    amount: string;
}

export const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({
    cardColor,
    tagColor,
    title,
    subtitle,
    amount
}) => {
    return(
        <Container color={cardColor}>
            <Tag color={tagColor} />

            <div>
                <h4>{title}</h4>
                <small>{subtitle}</small>
            </div>

            <h3>{amount}</h3>
        </Container>
    )
}