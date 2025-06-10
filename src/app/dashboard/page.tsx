'use client'

import { MainLayout } from "@/components/layout/main-layout"
import { KPICards } from "@/components/modules/dashboard/kpi-cards"
import { StatusChart } from "@/components/modules/dashboard/status-chart"
import { RecentActivities } from "@/components/modules/dashboard/recent-activities"

const mockKPIData = {
  totalLicitacoes: 156,
  licitacoesAtivas: 35,
  taxaSucesso: 78,
  valorTotal: 2500000,
  documentosVencidos: 12
}

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Visão geral das suas licitações e atividades
          </p>
        </div>

        <KPICards data={mockKPIData} />

        <div className="grid gap-6 md:grid-cols-2">
          <StatusChart />
          <RecentActivities />
        </div>
      </div>
    </MainLayout>
  )
}