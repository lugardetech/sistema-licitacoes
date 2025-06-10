'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Documento } from '@/types'
import { formatDate } from '@/lib/utils'
import { 
  FileText, 
  Download, 
  Edit, 
  Trash2, 
  Upload, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Search
} from 'lucide-react'

interface DocumentsGridProps {
  documents: Documento[]
  onUpload: () => void
  onEdit: (document: Documento) => void
  onDelete: (id: string) => void
  onDownload: (document: Documento) => void
}

export function DocumentsGrid({ 
  documents, 
  onUpload, 
  onEdit, 
  onDelete, 
  onDownload 
}: DocumentsGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || doc.tipo === typeFilter
    return matchesSearch && matchesType
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'VALIDO':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'VENCIDO':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'PENDENTE':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VALIDO':
        return 'bg-green-100 text-green-800'
      case 'VENCIDO':
        return 'bg-red-100 text-red-800'
      case 'PENDENTE':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTipoLabel = (tipo: string) => {
    const tipos = {
      'EDITAL': 'Edital',
      'PROPOSTA': 'Proposta',
      'CERTIFICADO': 'Certificado',
      'OUTROS': 'Outros'
    }
    return tipos[tipo as keyof typeof tipos] || tipo
  }

  const isExpiringSoon = (validade?: Date) => {
    if (!validade) return false
    const today = new Date()
    const daysUntilExpiry = Math.ceil((validade.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">Todos os tipos</option>
            <option value="EDITAL">Edital</option>
            <option value="PROPOSTA">Proposta</option>
            <option value="CERTIFICADO">Certificado</option>
            <option value="OUTROS">Outros</option>
          </select>
        </div>
        
        <Button onClick={onUpload}>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-medium truncate">
                      {document.nome}
                    </CardTitle>
                  </div>
                </div>
                {getStatusIcon(document.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <Badge variant="secondary">
                  {getTipoLabel(document.tipo)}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className={getStatusColor(document.status)}
                >
                  {document.status}
                </Badge>
              </div>
              
              {document.validade && (
                <div className="text-xs text-gray-600">
                  <strong>Validade:</strong> {formatDate(document.validade)}
                  {isExpiringSoon(document.validade) && (
                    <Badge variant="destructive" className="ml-2 text-xs">
                      Vence em breve
                    </Badge>
                  )}
                </div>
              )}
              
              <div className="text-xs text-gray-500">
                Criado em: {formatDate(document.created_at)}
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDownload(document)}
                  className="flex-1"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(document)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(document.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Nenhum documento encontrado
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Faça upload dos seus primeiros documentos
          </p>
          <div className="mt-6">
            <Button onClick={onUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Upload de Arquivo
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}