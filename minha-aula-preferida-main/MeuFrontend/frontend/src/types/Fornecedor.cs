export interface Fornecedor {

  id: number
  nome: string
  email: string
  cnpj: string
  telefone: number  
  ativo: boolean    
}

export type NovoFornecedor = Omit<Fornecedor, 'id'>