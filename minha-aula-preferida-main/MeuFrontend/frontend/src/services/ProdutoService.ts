import api from './api'
import type { Produto, NovoProduto } from '../types/Produto'

export const produtoService = {
  listar: async (): Promise<Produto[]> => {
    const { data } = await api.get('/produto')
    return data
  },

  criar: async (p: NovoProduto): Promise<Produto> => {
    const { data } = await api.post('/produto', p)
    return data
  },

  // ✅ Padronizado com Axios
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/produto/${id}`)
  },
}