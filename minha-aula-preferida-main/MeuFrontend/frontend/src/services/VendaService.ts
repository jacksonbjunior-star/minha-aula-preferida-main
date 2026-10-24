import api from './api'
import type { Venda, NovoVenda } from '../types/Venda'

export const vendaService = {
  
  listarVenda: async (): Promise<Venda[]> => {
    const { data } = await api.get('/venda')
    return data
  },
realizarVenda: async (v: NovoVenda): Promise<Venda> => {
  const { data } = await api.post('/venda', {
    id_Produto: v.id_Produto,
    id_Cliente: v.id_Cliente,
    quantidade: v.quantidade
   
  })
  return data
}
}