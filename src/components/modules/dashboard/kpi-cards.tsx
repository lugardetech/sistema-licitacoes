'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { FileText, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface KPICardsProps {
  data: {
    totalLicitacoes: number
    licitacoesAtivas: number
    taxaSucesso: number
    valorTotal: number
    documentosVencidos: number
  }
}

export function KPICards({ data }: KPICardsProps) {
  const kpis = [
    {
      title: "Total de Licitações",
      value: data.totalLicitacoes.toString(),
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Licitações Ativas",
      value: data.licitacoesAtivas.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Taxa de Sucesso",
      value: `${data.taxaSucesso}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Valor Total",
      value: formatCurrency(data.valorTotal),
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Docs. Vencidos",
      value: data.documentosVencidos.toString(),
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <div className={`${kpi.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}