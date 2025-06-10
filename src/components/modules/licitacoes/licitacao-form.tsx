'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CalendarIcon, Upload } from 'lucide-react'
import { toast } from 'sonner'

const licitacaoSchema = z.object({
  numero_edital: z.string().min(1, 'Número do edital é obrigatório'),
  orgao_licitante: z.string().min(1, 'Órgão licitante é obrigatório'),
  modalidade: z.enum(['PREGAO_ELETRONICO', 'CONCORRENCIA', 'TOMADA_PRECOS', 'CONVITE', 'CONCURSO', 'LEILAO']),
  objeto: z.string().min(1, 'Objeto é obrigatório'),
  valor_estimado: z.number().min(0, 'Valor deve ser positivo'),
  data_publicacao: z.string(),
  data_abertura_propostas: z.string(),
  data_entrega_documentos: z.string().optional(),
})

type LicitacaoFormData = z.infer<typeof licitacaoSchema>

const modalidades = [
  { value: 'PREGAO_ELETRONICO', label: 'Pregão Eletrônico' },
  { value: 'CONCORRENCIA', label: 'Concorrência' },
  { value: 'TOMADA_PRECOS', label: 'Tomada de Preços' },
  { value: 'CONVITE', label: 'Convite' },
  { value: 'CONCURSO', label: 'Concurso' },
  { value: 'LEILAO', label: 'Leilão' },
]

interface LicitacaoFormProps {
  onSubmit: (data: LicitacaoFormData) => void
  initialData?: Partial<LicitacaoFormData>
  isEditing?: boolean
}

export function LicitacaoForm({ onSubmit, initialData, isEditing = false }: LicitacaoFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<LicitacaoFormData>({
    resolver: zodResolver(licitacaoSchema),
    defaultValues: initialData
  })

  const handleFormSubmit = async (data: LicitacaoFormData) => {
    setIsLoading(true)
    try {
      await onSubmit(data)
      toast.success(isEditing ? 'Licitação atualizada com sucesso!' : 'Licitação cadastrada com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar licitação')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? 'Editar Licitação' : 'Nova Licitação'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numero_edital">Número do Edital *</Label>
              <Input
                id="numero_edital"
                {...register('numero_edital')}
                placeholder="Ex: 001/2024"
              />
              {errors.numero_edital && (
                <p className="text-sm text-red-600">{errors.numero_edital.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgao_licitante">Órgão Licitante *</Label>
              <Input
                id="orgao_licitante"
                {...register('orgao_licitante')}
                placeholder="Ex: Prefeitura Municipal"
              />
              {errors.orgao_licitante && (
                <p className="text-sm text-red-600">{errors.orgao_licitante.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modalidade">Modalidade *</Label>
            <Select
              onValueChange={(value) => setValue('modalidade', value as any)}
              defaultValue={watch('modalidade')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a modalidade" />
              </SelectTrigger>
              <SelectContent>
                {modalidades.map((modalidade) => (
                  <SelectItem key={modalidade.value} value={modalidade.value}>
                    {modalidade.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.modalidade && (
              <p className="text-sm text-red-600">{errors.modalidade.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="objeto">Objeto *</Label>
            <Textarea
              id="objeto"
              {...register('objeto')}
              placeholder="Descreva o objeto da licitação..."
              rows={3}
            />
            {errors.objeto && (
              <p className="text-sm text-red-600">{errors.objeto.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor_estimado">Valor Estimado (R$) *</Label>
            <Input
              id="valor_estimado"
              type="number"
              step="0.01"
              {...register('valor_estimado', { valueAsNumber: true })}
              placeholder="0,00"
            />
            {errors.valor_estimado && (
              <p className="text-sm text-red-600">{errors.valor_estimado.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data_publicacao">Data de Publicação *</Label>
              <Input
                id="data_publicacao"
                type="datetime-local"
                {...register('data_publicacao')}
              />
              {errors.data_publicacao && (
                <p className="text-sm text-red-600">{errors.data_publicacao.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="data_abertura_propostas">Data de Abertura das Propostas *</Label>
              <Input
                id="data_abertura_propostas"
                type="datetime-local"
                {...register('data_abertura_propostas')}
              />
              {errors.data_abertura_propostas && (
                <p className="text-sm text-red-600">{errors.data_abertura_propostas.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="data_entrega_documentos">Data de Entrega dos Documentos</Label>
              <Input
                id="data_entrega_documentos"
                type="datetime-local"
                {...register('data_entrega_documentos')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload de Documentos</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Clique para fazer upload ou arraste arquivos aqui
              </p>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX até 10MB
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Cadastrar')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}