'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  {
    name: "Ativas",
    value: 35,
    color: "#10b981"
  },
  {
    name: "Em Andamento",
    value: 25,
    color: "#3b82f6"
  },
  {
    name: "Vencidas",
    value: 15,
    color: "#ef4444"
  },
  {
    name: "Finalizadas",
    value: 20,
    color: "#6b7280"
  },
  {
    name: "Pendentes",
    value: 5,
    color: "#f59e0b"
  }
]

export function StatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status das Licitações</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}