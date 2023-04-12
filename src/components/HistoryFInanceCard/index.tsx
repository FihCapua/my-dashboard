import React from "react";
import { Container, Tag } from "./style"

interface IHistoryFinanceCardProps {
    tagColor: string;
    title: string;
    subtitle: string;
    amount: string;
}

export const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({
    tagColor,
    title,
    subtitle,
    amount
}) => {
    return(
        <Container>
            <Tag color={tagColor} />

            <div>
                <h4>{title}</h4>
                <small>{subtitle}</small>
            </div>

            <h3>{amount}</h3>
        </Container>
    )
}