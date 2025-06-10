'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const performanceData = [
  { mes: 'Jan', licitacoes: 12, vencidas: 8, taxa: 67 },
  { mes: 'Fev', licitacoes: 15, vencidas: 10, taxa: 67 },
  { mes: 'Mar', licitacoes: 18, vencidas: 14, taxa: 78 },
  { mes: 'Abr', licitacoes: 22, vencidas: 17, taxa: 77 },
  { mes: 'Mai', licitacoes: 20, vencidas: 16, taxa: 80 },
  { mes: 'Jun', licitacoes: 25, vencidas: 20, taxa: 80 }
]

export function PerformanceChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Licitações por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="licitacoes" fill="#3b82f6" name="Total" />
              <Bar dataKey="vencidas" fill="#10b981" name="Vencidas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Taxa de Sucesso (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="taxa" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="Taxa de Sucesso (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}