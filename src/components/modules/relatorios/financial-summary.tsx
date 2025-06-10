'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react'

const financialData = {
  valorTotalParticipado: 15750000,
  valorTotalVencido: 8500000,
  valorMedioParticipacao: 450000,
  valorMedioVitoria: 485000,
  crescimentoMensal: 12.5,
  metaAnual: 25000000,
  projecaoAnual: 22800000
}

export function FinancialSummary() {
  const taxaAtingimentoMeta = (financialData.projecaoAnual / financialData.metaAnual) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Total Participado</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(financialData.valorTotalParticipado)}
          </div>
          <p className="text-xs text-muted-foreground">
            Este ano
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Total Vencido</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(financialData.valorTotalVencido)}
          </div>
          <p className="text-xs text-muted-foreground">
            Taxa de conversão: {((financialData.valorTotalVencido / financialData.valorTotalParticipado) * 100).toFixed(1)}%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Crescimento Mensal</CardTitle>
          {financialData.crescimentoMensal > 0 ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            +{financialData.crescimentoMensal}%
          </div>
          <p className="text-xs text-muted-foreground">
            Comparado ao mês anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Meta Anual</CardTitle>
          <Target className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {taxaAtingimentoMeta.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(financialData.projecaoAnual)} / {formatCurrency(financialData.metaAnual)}
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Valores Médios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Valor Médio de Participação:</span>
            <span className="font-bold">{formatCurrency(financialData.valorMedioParticipacao)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Valor Médio de Vitória:</span>
            <span className="font-bold">{formatCurrency(financialData.valorMedioVitoria)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Diferença Média:</span>
            <span className={`font-bold ${
              financialData.valorMedioVitoria > financialData.valorMedioParticipacao 
                ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(financialData.valorMedioVitoria - financialData.valorMedioParticipacao)}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Projeção Anual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso da Meta</span>
              <span>{taxaAtingimentoMeta.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  taxaAtingimentoMeta >= 100 ? 'bg-green-500' : 
                  taxaAtingimentoMeta >= 80 ? 'bg-blue-500' : 
                  taxaAtingimentoMeta >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(taxaAtingimentoMeta, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Com base no desempenho atual, a projeção é de{' '}
              <strong>{formatCurrency(financialData.projecaoAnual)}</strong> até o final do ano.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}