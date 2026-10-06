// src/services/produtoService.ts
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
  // No seu ProdutoService.ts
  deletar: async (id: number): Promise<void> => {
  const response = await fetch(`http://localhost:5000/api/produtos/${id}`, {
    method: 'DELETE', // 👈 O método HTTP de exclusão
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar produto');
  }
},
}