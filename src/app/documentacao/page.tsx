'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { DocumentsGrid } from '@/components/modules/documentacao/documents-grid'
import { UploadDialog } from '@/components/modules/documentacao/upload-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Documento } from '@/types'
import { toast } from 'sonner'
import { AlertTriangle, CheckCircle, Clock, FileText } from 'lucide-react'

const mockDocuments: Documento[] = [
  {
    id: '1',
    licitacao_id: '1',
    nome: 'Certidão Negativa de Débitos Federais',
    tipo: 'CERTIFICADO',
    validade: new Date('2024-06-15'),
    status: 'VALIDO',
    created_at: new Date('2024-01-10')
  },
  {
    id: '2',
    licitacao_id: '1',
    nome: 'Proposta Técnica - Equipamentos TI',
    tipo: 'PROPOSTA',
    status: 'PENDENTE',
    created_at: new Date('2024-01-12')
  },
  {
    id: '3',
    licitacao_id: '1',
    nome: 'Edital Pregão 001/2024',
    tipo: 'EDITAL',
    url: '/documents/edital-001-2024.pdf',
    status: 'VALIDO',
    created_at: new Date('2024-01-05')
  },
  {
    id: '4',
    licitacao_id: '1',
    nome: 'Certidão Municipal Vencida',
    tipo: 'CERTIFICADO',
    validade: new Date('2024-01-01'),
    status: 'VENCIDO',
    created_at: new Date('2023-12-01')
  }
]

export default function DocumentacaoPage() {
  const [documents, setDocuments] = useState<Documento[]>(mockDocuments)
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const handleUpload = async (data: any) => {
    const newDocument: Documento = {
      id: Date.now().toString(),
      licitacao_id: '1',
      nome: data.nome,
      tipo: data.tipo,
      validade: data.validade ? new Date(data.validade) : undefined,
      status: 'PENDENTE',
      created_at: new Date()
    }
    
    setDocuments(prev => [...prev, newDocument])
  }

  const handleEdit = (document: Documento) => {
    console.log('Edit document:', document)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este documento?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id))
      toast.success('Documento excluído com sucesso!')
    }
  }

  const handleDownload = (document: Documento) => {
    if (document.url) {
      window.open(document.url, '_blank')
    } else {
      toast.info('Arquivo não disponível para download')
    }
  }

  const getDocumentStats = () => {
    const total = documents.length
    const validos = documents.filter(doc => doc.status === 'VALIDO').length
    const vencidos = documents.filter(doc => doc.status === 'VENCIDO').length
    const pendentes = documents.filter(doc => doc.status === 'PENDENTE').length
    
    return { total, validos, vencidos, pendentes }
  }

  const getExpiringDocuments = () => {
    const today = new Date()
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000))
    
    return documents.filter(doc => 
      doc.validade && 
      doc.validade > today && 
      doc.validade <= thirtyDaysFromNow &&
      doc.status === 'VALIDO'
    )
  }

  const stats = getDocumentStats()
  const expiringDocs = getExpiringDocuments()

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documentação</h1>
          <p className="text-gray-600">
            Gerencie todos os documentos das suas licitações
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Válidos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.validos}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.vencidos}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendentes}</div>
            </CardContent>
          </Card>
        </div>

        {expiringDocs.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Documentos Vencendo em Breve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {expiringDocs.map(doc => (
                  <div key={doc.id} className="flex justify-between items-center">
                    <span className="text-sm">{doc.nome}</span>
                    <Badge variant="destructive">
                      Vence em {Math.ceil((doc.validade!.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="todos" className="w-full">
          <TabsList>
            <TabsTrigger value="todos">Todos ({stats.total})</TabsTrigger>
            <TabsTrigger value="validos">Válidos ({stats.validos})</TabsTrigger>
            <TabsTrigger value="vencidos">Vencidos ({stats.vencidos})</TabsTrigger>
            <TabsTrigger value="pendentes">Pendentes ({stats.pendentes})</TabsTrigger>
          </TabsList>

          <TabsContent value="todos">
            <DocumentsGrid
              documents={documents}
              onUpload={() => setIsUploadOpen(true)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          </TabsContent>

          <TabsContent value="validos">
            <DocumentsGrid
              documents={documents.filter(doc => doc.status === 'VALIDO')}
              onUpload={() => setIsUploadOpen(true)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          </TabsContent>

          <TabsContent value="vencidos">
            <DocumentsGrid
              documents={documents.filter(doc => doc.status === 'VENCIDO')}
              onUpload={() => setIsUploadOpen(true)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          </TabsContent>

          <TabsContent value="pendentes">
            <DocumentsGrid
              documents={documents.filter(doc => doc.status === 'PENDENTE')}
              onUpload={() => setIsUploadOpen(true)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          </TabsContent>
        </Tabs>

        <UploadDialog
          open={isUploadOpen}
          onOpenChange={setIsUploadOpen}
          onUpload={handleUpload}
          licitacao_id="1"
        />
      </div>
    </MainLayout>
  )
}