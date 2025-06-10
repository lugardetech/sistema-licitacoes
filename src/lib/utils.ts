import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dateObj)
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj)
}

export function getStatusColor(status: string): string {
  const statusColors = {
    'ativo': 'bg-green-100 text-green-800',
    'em-andamento': 'bg-blue-100 text-blue-800',
    'vencido': 'bg-red-100 text-red-800',
    'finalizado': 'bg-gray-100 text-gray-800',
    'pendente': 'bg-yellow-100 text-yellow-800'
  }
  return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
}