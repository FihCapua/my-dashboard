import React from 'react';
import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from 'recharts';
import formatCurrent from '../../utils/formatCurrency';
// import formatCurrent from '../../utils/formatCurrency';
import {
    Container,
    SideLeft,
    SideRight,
    SubtitleContainers,
    Subtitles,
} from './styles';

interface IBarChartProps {
    title: string;
    data: {
        name: string;
        amount: number;
        percent: number;
        color: string;
    }[];
}

const BarChartBox: React.FC<IBarChartProps> = ({ title, data }) => (
    <Container>
        {console.log(
            'data',
            data.map((indice) => {
                indice.percent;
            })
        )}
        <SideLeft>
            <h2>{title}</h2>
            <SubtitleContainers>
                {data.map((indicator) => (
                    <Subtitles key={indicator.name} color={indicator.color}>
                        <div>{indicator.percent}%</div>
                        <span>{indicator.name}</span>
                    </Subtitles>
                ))}
            </SubtitleContainers>
        </SideLeft>
        <SideRight>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <Bar dataKey="amount" name="Valor">
                        {data.map((indicator) => (
                            <Cell key={indicator.name} fill={indicator.color} />
                        ))}
                    </Bar>
                    <Tooltip
                        cursor={{ fill: 'none' }}
                        formatter={(value: number) =>
                            formatCurrent(Number(value))
                        }
                    />
                </BarChart>
            </ResponsiveContainer>
        </SideRight>
    </Container>
);

export default BarChartBox;
