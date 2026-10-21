import api from './api'
import type { Fornecedor, NovoFornecedor } from '../types/Fornecedor'

export const fornecedorService = {
  listar: async (): Promise<Fornecedor[]> => {
    const { data } = await api.get('/fornecedor') // Ajuste para '/fornecedores' se necessário
    return data
  },

  criar: async (f: NovoFornecedor): Promise<Fornecedor> => {
    const { data } = await api.post('/fornecedor', f)
    return data
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/fornecedor/${id}`)
  }
}