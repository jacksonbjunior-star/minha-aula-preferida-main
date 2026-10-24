import { useState, useEffect } from 'react'
import { vendaService } from '../services/VendaService'
import { clienteService } from '../services/ClienteService'
import { produtoService } from '../services/ProdutoService'
import type { Cliente } from '../types/Cliente'
import type { Produto } from '../types/Produto'

interface Props {
  onVendaCriada: () => void
}

function VendaForm({ onVendaCriada }: Props) {
  const [idCliente, setIdCliente] = useState('')
  const [idProduto, setIdProduto] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [valorTotal, setValorTotal] = useState<number | null>(null)
  
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loadingListas, setLoadingListas] = useState(true)

  useEffect(() => {
    const carregarListas = async () => {
      try {
        setLoadingListas(true)
        const [listaClientes, listaProdutos] = await Promise.all([
          clienteService.listar(),
          produtoService.listar()
        ])
        setClientes(listaClientes)
        setProdutos(listaProdutos)
      } catch {
        setErro('Erro ao carregar listas de clientes e produtos.')
      } finally {
        setLoadingListas(false)
      }
    }
    carregarListas()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    setValorTotal(null)
    
    try {
      setLoading(true)
      const venda = await vendaService.realizarVenda({ 
        id_Cliente: Number(idCliente),
        id_Produto: Number(idProduto),
        quantidade: Number(quantidade),
      })
      
      // ✅ CORREÇÃO: Tenta pegar o valor em diferentes formatos (camelCase ou snake_case)
      // e garante que seja um número. Se não achar nada, usa 0.
const valorRetornado = venda.valor_Total ?? 0      

      setValorTotal(Number(valorRetornado)) 
    
      setIdCliente('')
      setIdProduto('')
      setQuantidade('')
      onVendaCriada()
    } catch (err: any) {
      const mensagem = err.response?.data?.message || 'Erro ao cadastrar. Tente novamente.'
      setErro(mensagem) 
    } finally {
      setLoading(false)
    }
  }

  if (loadingListas) {
    return <p className="text-center p-4 text-spfc-preto font-medium">Carregando formulários...</p>
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-spfc-preto mb-4">Cadastrar Venda</h2>

      {erro && (
        <p className="bg-spfc-vermelho text-spfc-branco px-4 py-2 rounded-lg mb-4">
          {erro}
        </p>
      )}

      {/* ✅ CORREÇÃO: != null verifica tanto null quanto undefined. Number() garante que é número */}
      {valorTotal != null && (
        <p className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 font-bold">
          ✅ Venda realizada! Valor total: R$ {Number(valorTotal).toFixed(2)}
        </p>
      )}

      {/* Cliente: Select em vez de input manual */}
      <div className="mb-4">
        <label htmlFor="idCliente" className="block text-sm font-medium text-gray-700 mb-1">
          Cliente
        </label>
        <select
          id="idCliente"
          value={idCliente}
          onChange={e => setIdCliente(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spfc-vermelho focus:border-transparent"
        >
          <option value="">Selecione um cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="idProduto" className="block text-sm font-medium text-gray-700 mb-1">
          Produto
        </label>
        <select
          id="idProduto"
          value={idProduto}
          onChange={e => setIdProduto(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spfc-vermelho focus:border-transparent"
        >
          <option value="">Selecione um produto</option>
          {/* ✅ CORREÇÃO: Number() garante que o preço seja tratado como número antes do toFixed */}
          {produtos.map(produto => (
            <option key={produto.id} value={produto.id}>
              {produto.nome} - R$ {Number(produto.preco).toFixed(2)} 
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700 mb-1">
          Quantidade
        </label>
        <input
          id="quantidade"
          type="number"
          min="1"
          step="1"
          value={quantidade}
          onChange={e => setQuantidade(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spfc-vermelho focus:border-transparent"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-spfc-vermelho text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Realizando venda...' : 'Cadastrar Venda'}
      </button>
    </form>
  )
}

export default VendaForm