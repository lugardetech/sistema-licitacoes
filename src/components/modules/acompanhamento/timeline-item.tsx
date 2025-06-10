'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/lib/utils'
import { Timeline } from '@/types'
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Plus,
  Edit
} from 'lucide-react'

interface TimelineItemProps {
  item: Timeline
  isLast?: boolean
}

function getTimelineIcon(tipo: string) {
  switch (tipo) {
    case 'CRIACAO':
      return <Plus className="h-4 w-4 text-blue-600" />
    case 'ATUALIZACAO':
      return <Edit className="h-4 w-4 text-yellow-600" />
    case 'DOCUMENTO':
      return <FileText className="h-4 w-4 text-purple-600" />
    case 'LEMBRETE':
      return <AlertTriangle className="h-4 w-4 text-orange-600" />
    case 'FINALIZACAO':
      return <CheckCircle className="h-4 w-4 text-green-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-600" />
  }
}

function getTimelineColor(tipo: string) {
  switch (tipo) {
    case 'CRIACAO':
      return 'bg-blue-100 border-blue-200'
    case 'ATUALIZACAO':
      return 'bg-yellow-100 border-yellow-200'
    case 'DOCUMENTO':
      return 'bg-purple-100 border-purple-200'
    case 'LEMBRETE':
      return 'bg-orange-100 border-orange-200'
    case 'FINALIZACAO':
      return 'bg-green-100 border-green-200'
    default:
      return 'bg-gray-100 border-gray-200'
  }
}

export function TimelineItem({ item, isLast = false }: TimelineItemProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col items-center">
        <div className={`
          p-2 rounded-full border-2 ${getTimelineColor(item.tipo)}
        `}>
          {getTimelineIcon(item.tipo)}
        </div>
        {!isLast && (
          <div className="w-0.5 h-8 bg-gray-200 mt-2" />
        )}
      </div>
      
      <div className="flex-1 pb-8">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {item.descricao}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDateTime(item.data)}
                </p>
              </div>
              <Badge variant="secondary" className="ml-2">
                {item.tipo.replace('_', ' ')}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}