import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
    Container,
    SideLeft,
    SideRight,
    SubtitleContainers,
    Subtitles,
} from './styles';

interface IPieChartProps {
    data: {
        name: string;
        value: number;
        percent: number;
        color: string;
    }[];
}

const PieChartBox: React.FC<IPieChartProps> = ({ data }) => (
    <Container>
        <SideLeft>
            <h2>Relação</h2>
            <SubtitleContainers>
                {data.map((indicator) => (
                    <Subtitles key={indicator.name} color={indicator.color}>
                        <div>{indicator.percent}</div>
                        <span>{indicator.name}</span>
                    </Subtitles>
                ))}
            </SubtitleContainers>
        </SideLeft>

        <SideRight>
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={data} dataKey="percent">
                        {data.map((indicator) => (
                            <Cell key={indicator.name} fill={indicator.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </SideRight>
    </Container>
);

export default PieChartBox;
