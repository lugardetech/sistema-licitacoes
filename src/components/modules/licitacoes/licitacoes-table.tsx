'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import { Licitacao } from '@/types'
import { Eye, Edit, Trash2, Search, Plus } from 'lucide-react'

interface LicitacoesTableProps {
  licitacoes: Licitacao[]
  onEdit: (licitacao: Licitacao) => void
  onView: (licitacao: Licitacao) => void
  onDelete: (id: string) => void
  onNew: () => void
}

export function LicitacoesTable({ 
  licitacoes, 
  onEdit, 
  onView, 
  onDelete, 
  onNew 
}: LicitacoesTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredLicitacoes = licitacoes.filter(licitacao => {
    const matchesSearch = 
      licitacao.numero_edital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licitacao.orgao_licitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licitacao.objeto.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || licitacao.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getModalidadeLabel = (modalidade: string) => {
    const modalidades = {
      'PREGAO_ELETRONICO': 'Pregão Eletrônico',
      'CONCORRENCIA': 'Concorrência',
      'TOMADA_PRECOS': 'Tomada de Preços',
      'CONVITE': 'Convite',
      'CONCURSO': 'Concurso',
      'LEILAO': 'Leilão'
    }
    return modalidades[modalidade as keyof typeof modalidades] || modalidade
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Licitações</CardTitle>
          <Button onClick={onNew}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Licitação
          </Button>
        </div>
        
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por número, órgão ou objeto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">Todos os status</option>
            <option value="ATIVO">Ativo</option>
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="VENCIDO">Vencido</option>
            <option value="FINALIZADO">Finalizado</option>
            <option value="PENDENTE">Pendente</option>
          </select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Edital</th>
                <th className="text-left py-3 px-4 font-medium">Órgão</th>
                <th className="text-left py-3 px-4 font-medium">Modalidade</th>
                <th className="text-left py-3 px-4 font-medium">Valor</th>
                <th className="text-left py-3 px-4 font-medium">Abertura</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLicitacoes.map((licitacao) => (
                <tr key={licitacao.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{licitacao.numero_edital}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-600">
                      {licitacao.orgao_licitante}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      {getModalidadeLabel(licitacao.modalidade)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">
                      {formatCurrency(licitacao.valor_estimado)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      {formatDate(licitacao.data_abertura_propostas)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge 
                      variant="secondary" 
                      className={getStatusColor(licitacao.status.toLowerCase())}
                    >
                      {licitacao.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onView(licitacao)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEdit(licitacao)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(licitacao.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredLicitacoes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma licitação encontrada
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}