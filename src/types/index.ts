export interface Licitacao {
  id: string
  numero_edital: string
  orgao_licitante: string
  modalidade: 'PREGAO_ELETRONICO' | 'CONCORRENCIA' | 'TOMADA_PRECOS' | 'CONVITE' | 'CONCURSO' | 'LEILAO'
  objeto: string
  valor_estimado: number
  data_publicacao: Date
  data_abertura_propostas: Date
  data_entrega_documentos?: Date
  status: 'ATIVO' | 'EM_ANDAMENTO' | 'VENCIDO' | 'FINALIZADO' | 'PENDENTE'
  documentos: Documento[]
  created_at: Date
  updated_at: Date
}

export interface Documento {
  id: string
  licitacao_id: string
  nome: string
  tipo: 'EDITAL' | 'PROPOSTA' | 'CERTIFICADO' | 'OUTROS'
  url?: string
  validade?: Date
  status: 'VALIDO' | 'VENCIDO' | 'PENDENTE'
  created_at: Date
}

export interface Timeline {
  id: string
  licitacao_id: string
  descricao: string
  data: Date
  tipo: 'CRIACAO' | 'ATUALIZACAO' | 'DOCUMENTO' | 'LEMBRETE' | 'FINALIZACAO'
  created_at: Date
}

export interface Usuario {
  id: string
  email: string
  nome: string
  role: 'ADMIN' | 'USER'
  created_at: Date
}

export interface KPI {
  total_licitacoes: number
  licitacoes_ativas: number
  taxa_sucesso: number
  valor_total: number
  documentos_vencidos: number
}

export interface Relatorio {
  id: string
  nome: string
  tipo: 'SUCESSO' | 'FINANCEIRO' | 'PERFORMANCE' | 'GERAL'
  dados: any
  created_at: Date
}