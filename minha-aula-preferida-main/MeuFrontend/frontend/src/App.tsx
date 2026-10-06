import { useEffect, useState } from 'react'
import type { Produto } from './types/Produto'
import { produtoService } from './services/ProdutoService'
import ProdutoForm from './components/ProdutoForm'
import ProdutoList from './components/ProdutoList'

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading,  setLoading]  = useState(false)
  const [erro,     setErro]     = useState<string | null>(null)

  const carregarProdutos = async () => {
    try {
      setLoading(true)
      const dados = await produtoService.listar()
      setProdutos(dados)
    } catch {
      setErro('Erro ao carregar produtos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

 return (
  <div className="min-h-screen bg-spfc-cinza-claro p-8">
    {/* Container centralizado com largura máxima */}
    <div className="max-w-4xl mx-auto">
      
      {/* Título principal com estilo SPFC */}
      <h1 className="text-4xl font-bold text-spfc-preto border-b-4 border-spfc-vermelho pb-3 mb-8">
        Gestão de Produtos
      </h1>
      
      {/* Formulário de cadastro */}
      <ProdutoForm onProdutoCriado={carregarProdutos} />
      
      {/* Título da lista */}
      <h2 className="text-2xl font-semibold text-spfc-preto mt-10 mb-4">
        Produtos Cadastrados
      </h2>
      
      {/* Mensagem de erro estilizada */}
      {erro && (
        <p className="bg-spfc-vermelho text-spfc-branco px-4 py-2 rounded-lg mb-4 font-medium">
          {erro}
        </p>
      )}
      
      {/* Lista de produtos */}
      <ProdutoList produtos={produtos} loading={loading} />
    </div>
  </div>
)
}

export default App