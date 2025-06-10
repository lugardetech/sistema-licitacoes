'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { TimelineItem } from '@/components/modules/acompanhamento/timeline-item'
import { Checklist } from '@/components/modules/acompanhamento/checklist'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Timeline } from '@/types'

const mockTimeline: Timeline[] = [
  {
    id: '1',
    licitacao_id: '1',
    descricao: 'Licitação criada no sistema',
    data: new Date('2024-01-10T09:00:00'),
    tipo: 'CRIACAO',
    created_at: new Date('2024-01-10T09:00:00')
  },
  {
    id: '2',
    licitacao_id: '1',
    descricao: 'Documentos iniciais anexados',
    data: new Date('2024-01-10T14:30:00'),
    tipo: 'DOCUMENTO',
    created_at: new Date('2024-01-10T14:30:00')
  },
  {
    id: '3',
    licitacao_id: '1',
    descricao: 'Status atualizado para "Em Andamento"',
    data: new Date('2024-01-11T10:15:00'),
    tipo: 'ATUALIZACAO',
    created_at: new Date('2024-01-11T10:15:00')
  },
  {
    id: '4',
    licitacao_id: '1',
    descricao: 'Lembrete: Prazo para entrega de propostas se aproxima',
    data: new Date('2024-01-12T08:00:00'),
    tipo: 'LEMBRETE',
    created_at: new Date('2024-01-12T08:00:00')
  }
]

const mockLicitacoes = [
  { id: '1', numero_edital: '001/2024', orgao_licitante: 'Prefeitura Municipal' },
  { id: '2', numero_edital: '002/2024', orgao_licitante: 'Governo do Estado' }
]

export default function AcompanhamentoPage() {
  const [selectedLicitacao, setSelectedLicitacao] = useState<string>('1')
  const [timeline] = useState<Timeline[]>(mockTimeline)

  const filteredTimeline = timeline
    .filter(item => item.licitacao_id === selectedLicitacao)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Acompanhamento</h1>
          <p className="text-gray-600">
            Acompanhe o progresso das suas licitações
          </p>
        </div>

        <div className="w-full max-w-xs">
          <Select value={selectedLicitacao} onValueChange={setSelectedLicitacao}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar licitação" />
            </SelectTrigger>
            <SelectContent>
              {mockLicitacoes.map((licitacao) => (
                <SelectItem key={licitacao.id} value={licitacao.id}>
                  {licitacao.numero_edital} - {licitacao.orgao_licitante}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Timeline do Processo</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredTimeline.length > 0 ? (
                  <div className="space-y-0">
                    {filteredTimeline.map((item, index) => (
                      <TimelineItem
                        key={item.id}
                        item={item}
                        isLast={index === filteredTimeline.length - 1}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Nenhuma atividade registrada
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Checklist licitacao_id={selectedLicitacao} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}