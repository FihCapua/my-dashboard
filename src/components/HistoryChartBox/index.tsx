import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import formatCurrent from '../../utils/formatCurrency';
import { Container, ChartHeader, SubtitleContainer, Subtitle } from './styles';

interface IHistoryBoxProps {
    data: {
        month: string;
        amountEntry: number;
        amountOutput: number;
    }[];
    lineColorAmountEntry: string;
    lineColorAmountOutput: string;
}

const HistoryChartBox: React.FC<IHistoryBoxProps> = ({
    data,
    lineColorAmountEntry,
    lineColorAmountOutput,
}) => (
    <Container>
        <ChartHeader>
            <h2>Histórico de Saldo</h2>

            <SubtitleContainer>
                <Subtitle color={lineColorAmountEntry}>
                    <div></div>
                    <span>Entradas</span>
                </Subtitle>
                <Subtitle color={lineColorAmountOutput}>
                    <div></div>
                    <span>Saídas</span>
                </Subtitle>
            </SubtitleContainer>
        </ChartHeader>
        <ResponsiveContainer>
            <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
                <XAxis dataKey="month" stroke="#cecece" />
                <Tooltip
                    wrapperStyle={{ color: '#4d4d4d', background: '#000' }}
                    formatter={(value: number) => formatCurrent(Number(value))}
                />
                <Line
                    type="monotone"
                    dataKey="amountEntry"
                    name="Entradas"
                    stroke={lineColorAmountEntry}
                    strokeWidth={5}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="monotone"
                    dataKey="amountOutput"
                    name="Saídas"
                    stroke={lineColorAmountOutput}
                    strokeWidth={5}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    </Container>
);

export default HistoryChartBox;
