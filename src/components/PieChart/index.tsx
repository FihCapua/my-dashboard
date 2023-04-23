import React from "react";
import { ResponsiveContainer, Pie, Cell, PieChart } from "recharts";
import { Container, Legend, SideLeft, SideRight } from "./style";

interface IPieChartProps {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

export const PieChartBox: React.FC<IPieChartProps> = ({ data }) => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      {data.map((indicator) => (
        <Legend key={indicator.name} color={indicator.color}>
          <div>{indicator.percent}%</div>
          <span>{indicator.name}</span>
        </Legend>
      ))}
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
