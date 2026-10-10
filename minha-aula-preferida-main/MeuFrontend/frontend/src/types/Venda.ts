export interface Venda {
  id: number
  id_Cliente: number
  id_Produto: number
  data_Venda: Date
  valor_Unitario: number
  quantidade: number
  valor_Total: number

}
export type NovoVenda = Omit<Venda, 'id' | 'data_Venda' | 'valor_Unitario' | 'valor_Total'>