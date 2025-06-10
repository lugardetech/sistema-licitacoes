'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDateTime, getStatusColor } from "@/lib/utils"
import { FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const activities = [
  {
    id: "1",
    type: "CRIACAO",
    description: "Nova licitação cadastrada - Pregão Eletrônico nº 001/2024",
    timestamp: new Date("2024-01-10T10:30:00"),
    status: "ativo"
  },
  {
    id: "2",
    type: "DOCUMENTO",
    description: "Documento vencido - Certidão CND Federal",
    timestamp: new Date("2024-01-10T09:15:00"),
    status: "vencido"
  },
  {
    id: "3",
    type: "ATUALIZACAO",
    description: "Status atualizado - Pregão nº 045/2023",
    timestamp: new Date("2024-01-10T08:45:00"),
    status: "em-andamento"
  },
  {
    id: "4",
    type: "FINALIZACAO",
    description: "Licitação finalizada - Concorrência nº 012/2023",
    timestamp: new Date("2024-01-09T16:20:00"),
    status: "finalizado"
  }
]

function getActivityIcon(type: string) {
  switch (type) {
    case "CRIACAO":
      return <FileText className="h-4 w-4 text-blue-600" />
    case "DOCUMENTO":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    case "ATUALIZACAO":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "FINALIZACAO":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    default:
      return <FileText className="h-4 w-4 text-gray-600" />
  }
}

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.description}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-gray-500">
                    {formatDateTime(activity.timestamp)}
                  </p>
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(activity.status)}
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}