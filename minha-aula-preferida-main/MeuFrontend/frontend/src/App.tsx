import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'

// Componentes de Produtos
import ProdutoForm from './components/ProdutoForm'
import ProdutoList from './components/ProdutoList'
import { produtoService } from './services/ProdutoService'
import type { Produto } from './types/Produto'

// Componentes de Clientes
import ClienteForm from './components/ClienteForm'
import ClienteList from './components/ClienteList'
import { clienteService } from './services/ClienteService'
import type { Cliente } from './types/Cliente'

// ✅ NOVO: Componentes de Vendas
import VendaForm from './components/VendaForm'
import VendaList from './components/VendaList'
import { vendaService } from './services/VendaService'
import type { Venda } from './types/Venda'

function App() {
  // ✅ 1. Adicionado 'vendas' ao tipo
  const [telaAtual, setTelaAtual] = useState<'produtos' | 'clientes' | 'vendas'>('produtos')

  // Estados de Produtos
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loadingProdutos, setLoadingProdutos] = useState(false)
  const [erroProdutos, setErroProdutos] = useState<string | null>(null)

  // Estados de Clientes
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loadingClientes, setLoadingClientes] = useState(false)
  const [erroClientes, setErroClientes] = useState<string | null>(null)

  // ✅ 2. NOVO: Estados de Vendas
  const [vendas, setVendas] = useState<Venda[]>([])
  const [loadingVendas, setLoadingVendas] = useState(false)
  const [erroVendas, setErroVendas] = useState<string | null>(null)

  // Funções de Carregamento
  const carregarProdutos = async () => {
    try {
      setLoadingProdutos(true)
      setErroProdutos(null)
      setProdutos(await produtoService.listar())
    } catch { setErroProdutos('Erro ao carregar produtos.') }
    finally { setLoadingProdutos(false) }
  }

  const carregarClientes = async () => {
    try {
      setLoadingClientes(true)
      setErroClientes(null)
      setClientes(await clienteService.listar())
    } catch { setErroClientes('Erro ao carregar clientes.') }
    finally { setLoadingClientes(false) }
  }

  // ✅ 3. NOVO: Função de Carregamento de Vendas
  const carregarVendas = async () => {
    try {
      setLoadingVendas(true)
      setErroVendas(null)
      // Ajuste 'listarVenda' para o nome exato da função no seu VendaService
      setVendas(await vendaService.listarVenda()) 
    } catch { 
      setErroVendas('Erro ao carregar vendas.') 
    } finally { 
      setLoadingVendas(false) 
    }
  }

  // Carrega os dados da tela ativa
  useEffect(() => {
    if (telaAtual === 'produtos') {
      carregarProdutos()
    } else if (telaAtual === 'clientes') {
      carregarClientes()
    } else if (telaAtual === 'vendas') {
      carregarVendas() // ✅ Chama a função de vendas
    }
  }, [telaAtual])

  // Funções de Delete (mantidas iguais)
  const handleDeleteProduto = async (id: number) => {
    if (!window.confirm('Excluir este produto?')) return
    try {
      await produtoService.deletar(id)
      setProdutos(prev => prev.filter(p => p.id !== id))
    } catch { setErroProdutos('Erro ao excluir produto.') }
  }

  const handleDeleteCliente = async (id: number) => {
    if (!window.confirm('Excluir este cliente?')) return
    try {
      await clienteService.deletar(id)
      setClientes(prev => prev.filter(c => c.id !== id))
    } catch { setErroClientes('Erro ao excluir cliente.') }
  }

  return (
    <div className="flex min-h-screen bg-spfc-cinza-claro">
      <Sidebar telaAtual={telaAtual} onChangeTela={setTelaAtual} />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {telaAtual === 'produtos' ? (
            <>
              <h1 className="text-3xl font-bold text-spfc-preto border-b-4 border-spfc-vermelho pb-3 mb-8">
                Gestão de Produtos
              </h1>
              <ProdutoForm onProdutoCriado={carregarProdutos} />
              <h2 className="text-xl font-semibold text-spfc-preto mt-10 mb-4">Produtos Cadastrados</h2>
              {erroProdutos && <p className="bg-spfc-vermelho text-spfc-branco px-4 py-2 rounded-lg mb-4">{erroProdutos}</p>}
              <ProdutoList produtos={produtos} loading={loadingProdutos} onDelete={handleDeleteProduto} />
            </>
          ) : telaAtual === 'clientes' ? (
            <>
              <h1 className="text-3xl font-bold text-spfc-preto border-b-4 border-spfc-vermelho pb-3 mb-8">
                Gestão de Clientes
              </h1>
              <ClienteForm onClienteCriado={carregarClientes} />
              <h2 className="text-xl font-semibold text-spfc-preto mt-10 mb-4">Clientes Cadastrados</h2>
              {erroClientes && <p className="bg-spfc-vermelho text-spfc-branco px-4 py-2 rounded-lg mb-4">{erroClientes}</p>}
              <ClienteList clientes={clientes} loading={loadingClientes} onDelete={handleDeleteCliente} />
            </>
          ) : ( 
            // ✅ 4. NOVO: Tela de Vendas
            <>
              <h1 className="text-3xl font-bold text-spfc-preto border-b-4 border-spfc-vermelho pb-3 mb-8">
                Gestão de Vendas
              </h1>
              
              {/* O segredo está aqui: ao criar, chama carregarVendas! */}
              <VendaForm onVendaCriada={carregarVendas} />
              
              <h2 className="text-xl font-semibold text-spfc-preto mt-10 mb-4">Histórico de Vendas</h2>
              {erroVendas && <p className="bg-spfc-vermelho text-spfc-branco px-4 py-2 rounded-lg mb-4">{erroVendas}</p>}
              
              <VendaList vendas={vendas} loading={loadingVendas} />
            </>
          )}

        </div>
      </main>
    </div>
  )
}

export default App