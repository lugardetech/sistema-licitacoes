import { createClient } from '@supabase/supabase-js'

// Configuração mock - substitua pelas suas credenciais reais do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// Client para uso do lado do servidor e cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client para uso do lado do cliente
export const createSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}