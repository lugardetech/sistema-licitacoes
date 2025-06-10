'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Calendar, AlertCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ChecklistItem {
  id: string
  titulo: string
  descricao?: string
  concluido: boolean
  prazo?: Date
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA'
}

interface ChecklistProps {
  licitacao_id: string
}

const mockChecklist: ChecklistItem[] = [
  {
    id: '1',
    titulo: 'Obter certidão negativa de débitos federais',
    descricao: 'Emitir CND junto à Receita Federal',
    concluido: true,
    prazo: new Date('2024-02-10'),
    prioridade: 'ALTA'
  },
  {
    id: '2',
    titulo: 'Preparar proposta técnica',
    descricao: 'Elaborar documento com especificações técnicas',
    concluido: false,
    prazo: new Date('2024-02-12'),
    prioridade: 'ALTA'
  },
  {
    id: '3',
    titulo: 'Calcular proposta comercial',
    descricao: 'Definir preços e condições comerciais',
    concluido: false,
    prazo: new Date('2024-02-13'),
    prioridade: 'MEDIA'
  },
  {
    id: '4',
    titulo: 'Revisar documentação',
    descricao: 'Verificar se todos os documentos estão corretos',
    concluido: false,
    prazo: new Date('2024-02-14'),
    prioridade: 'BAIXA'
  }
]

export function Checklist({ licitacao_id }: ChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>(mockChecklist)
  const [newItemTitle, setNewItemTitle] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const toggleItem = (id: string) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    )
  }

  const addNewItem = () => {
    if (newItemTitle.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        titulo: newItemTitle,
        concluido: false,
        prioridade: 'MEDIA'
      }
      setItems(prev => [...prev, newItem])
      setNewItemTitle('')
      setShowAddForm(false)
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'ALTA':
        return 'bg-red-100 text-red-800'
      case 'MEDIA':
        return 'bg-yellow-100 text-yellow-800'
      case 'BAIXA':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const isOverdue = (prazo?: Date) => {
    if (!prazo) return false
    return new Date() > prazo
  }

  const completedCount = items.filter(item => item.concluido).length
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Checklist de Documentos</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {completedCount} de {items.length} itens concluídos ({Math.round(progress)}%)
            </p>
          </div>
          <Button 
            size="sm" 
            onClick={() => setShowAddForm(true)}
            disabled={showAddForm}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {showAddForm && (
          <div className="flex space-x-2 p-3 border rounded-lg bg-gray-50">
            <Input
              placeholder="Título do item..."
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addNewItem()}
            />
            <Button size="sm" onClick={addNewItem}>
              Adicionar
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => {
                setShowAddForm(false)
                setNewItemTitle('')
              }}
            >
              Cancelar
            </Button>
          </div>
        )}
        
        {items.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
            <Checkbox
              checked={item.concluido}
              onCheckedChange={() => toggleItem(item.id)}
              className="mt-1"
            />
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  item.concluido ? 'line-through text-gray-500' : 'text-gray-900'
                }`}>
                  {item.titulo}
                </span>
                
                <Badge 
                  variant="secondary" 
                  className={getPrioridadeColor(item.prioridade)}
                >
                  {item.prioridade}
                </Badge>
                
                {item.prazo && isOverdue(item.prazo) && !item.concluido && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Vencido
                  </Badge>
                )}
              </div>
              
              {item.descricao && (
                <p className="text-xs text-gray-600 mt-1">
                  {item.descricao}
                </p>
              )}
              
              {item.prazo && (
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Calendar className="mr-1 h-3 w-3" />
                  Prazo: {formatDate(item.prazo)}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum item no checklist
          </div>
        )}
      </CardContent>
    </Card>
  )
}