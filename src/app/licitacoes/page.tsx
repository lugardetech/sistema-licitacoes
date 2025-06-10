'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { LicitacoesTable } from '@/components/modules/licitacoes/licitacoes-table'
import { LicitacaoForm } from '@/components/modules/licitacoes/licitacao-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Licitacao } from '@/types'
import { toast } from 'sonner'

const mockLicitacoes: Licitacao[] = [
  {
    id: '1',
    numero_edital: '001/2024',
    orgao_licitante: 'Prefeitura Municipal de São Paulo',
    modalidade: 'PREGAO_ELETRONICO',
    objeto: 'Aquisição de equipamentos de informática',
    valor_estimado: 250000,
    data_publicacao: new Date('2024-01-15'),
    data_abertura_propostas: new Date('2024-02-15'),
    status: 'ATIVO',
    documentos: [],
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-10')
  },
  {
    id: '2',
    numero_edital: '002/2024',
    orgao_licitante: 'Governo do Estado de SP',
    modalidade: 'CONCORRENCIA',
    objeto: 'Obras de infraestrutura urbana',
    valor_estimado: 1500000,
    data_publicacao: new Date('2024-01-20'),
    data_abertura_propostas: new Date('2024-03-01'),
    status: 'EM_ANDAMENTO',
    documentos: [],
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15')
  }
]

export default function LicitacoesPage() {
  const [licitacoes, setLicitacoes] = useState<Licitacao[]>(mockLicitacoes)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingLicitacao, setEditingLicitacao] = useState<Licitacao | null>(null)
  const [isViewMode, setIsViewMode] = useState(false)

  const handleNew = () => {
    setEditingLicitacao(null)
    setIsViewMode(false)
    setIsFormOpen(true)
  }

  const handleEdit = (licitacao: Licitacao) => {
    setEditingLicitacao(licitacao)
    setIsViewMode(false)
    setIsFormOpen(true)
  }

  const handleView = (licitacao: Licitacao) => {
    setEditingLicitacao(licitacao)
    setIsViewMode(true)
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta licitação?')) {
      setLicitacoes(prev => prev.filter(l => l.id !== id))
      toast.success('Licitação excluída com sucesso!')
    }
  }

  const handleSubmit = (data: any) => {
    if (editingLicitacao) {
      setLicitacoes(prev => 
        prev.map(l => 
          l.id === editingLicitacao.id 
            ? { ...l, ...data, updated_at: new Date() }
            : l
        )
      )
    } else {
      const newLicitacao: Licitacao = {
        id: Date.now().toString(),
        ...data,
        data_publicacao: new Date(data.data_publicacao),
        data_abertura_propostas: new Date(data.data_abertura_propostas),
        data_entrega_documentos: data.data_entrega_documentos ? new Date(data.data_entrega_documentos) : undefined,
        status: 'PENDENTE',
        documentos: [],
        created_at: new Date(),
        updated_at: new Date()
      }
      setLicitacoes(prev => [...prev, newLicitacao])
    }
    setIsFormOpen(false)
    setEditingLicitacao(null)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingLicitacao(null)
    setIsViewMode(false)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Licitações</h1>
          <p className="text-gray-600">
            Gerencie todas as suas licitações
          </p>
        </div>

        <LicitacoesTable
          licitacoes={licitacoes}
          onNew={handleNew}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />

        <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isViewMode ? 'Visualizar Licitação' : 
                 editingLicitacao ? 'Editar Licitação' : 'Nova Licitação'}
              </DialogTitle>
            </DialogHeader>
            
            {!isViewMode && (
              <LicitacaoForm
                onSubmit={handleSubmit}
                initialData={editingLicitacao ? {
                  numero_edital: editingLicitacao.numero_edital,
                  orgao_licitante: editingLicitacao.orgao_licitante,
                  modalidade: editingLicitacao.modalidade,
                  objeto: editingLicitacao.objeto,
                  valor_estimado: editingLicitacao.valor_estimado,
                  data_publicacao: editingLicitacao.data_publicacao.toISOString().slice(0, 16),
                  data_abertura_propostas: editingLicitacao.data_abertura_propostas.toISOString().slice(0, 16),
                  data_entrega_documentos: editingLicitacao.data_entrega_documentos?.toISOString().slice(0, 16)
                } : undefined}
                isEditing={!!editingLicitacao}
              />
            )}
            
            {isViewMode && editingLicitacao && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>Número do Edital:</strong>
                    <p>{editingLicitacao.numero_edital}</p>
                  </div>
                  <div>
                    <strong>Órgão Licitante:</strong>
                    <p>{editingLicitacao.orgao_licitante}</p>
                  </div>
                </div>
                <div>
                  <strong>Objeto:</strong>
                  <p>{editingLicitacao.objeto}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>Valor Estimado:</strong>
                    <p>R$ {editingLicitacao.valor_estimado.toLocaleString('pt-BR')}</p>
                  </div>
                  <div>
                    <strong>Status:</strong>
                    <p>{editingLicitacao.status}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}