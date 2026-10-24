import { useEffect, useState } from 'react'
import type { Produto } from '../types/Produto'
import { produtoService } from '../services/ProdutoService'
import ProdutoForm from '../components/ProdutoForm'
import ProdutoList from '../components/ProdutoList'

function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])         
  const [loading, setLoading] = useState(false) // Loading inicial da lista
  const [deletingId, setDeletingId] = useState<number | null>(null) // Loading granular da exclusão
  const [erro, setErro] = useState<string | null>(null)

  const carregarProdutos = async () => {
    try {
      setLoading(true)
      setErro(null)
      const dados = await produtoService.listar()
      setProdutos(dados)
    } catch { 
      setErro('Erro ao carregar produtos. Verifique sua conexão.') 
    } finally { 
      setLoading(false) 
    }
  }

  useEffect(() => { 
    carregarProdutos() 
  }, [])

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id) // Ativa o loading APENAS neste item
      setErro(null)
      await produtoService.deletar(id)
      // Atualização otimista: remove o item da lista sem precisar recarregar tudo
      setProdutos((produtosAtuais) => produtosAtuais.filter((p) => p.id !== id))
    } catch (error) {
      console.error('Erro ao deletar:', error)
      setErro('Não foi possível excluir o produto. Tente novamente.')
    } finally {
      setDeletingId(null) // Desativa o loading do item
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-spfc-preto mb-8">Gestão de Produtos</h1>
      
      {erro && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">Atenção</p>
          <p>{erro}</p>
        </div>
      )}

      <ProdutoForm onProdutoCriado={carregarProdutos} />
      
      <ProdutoList 
        produtos={produtos} 
        loading={loading} 
        deletingId={deletingId}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ProdutosPage