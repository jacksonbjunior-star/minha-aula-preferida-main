import { useEffect, useState } from 'react'
import type { Produto } from '../types/Produto'
import { produtoService } from '../services/ProdutoService'
import ProdutoForm from '../components/ProdutoForm'
import ProdutoList from '../components/ProdutoList'

function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])         
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const carregarProdutos = async () => {
    try {
      setLoading(true)
      setErro(null)
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

  // 👇 ADICIONE ESTA FUNÇÃO
  const handleDelete = async (id: number) => {
    const confirmou = window.confirm('Tem certeza que deseja excluir este produto?')
    if (!confirmou) return

    try {
      setLoading(true)
      setErro(null)
      await produtoService.deletar(id)
      setProdutos((produtosAtuais) => produtosAtuais.filter((p) => p.id !== id))
    } catch (error) {
      console.error('Erro ao deletar:', error)
      setErro('Não foi possível excluir o produto.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Gestão de Produtos</h1>
      <ProdutoForm onProdutoCriado={carregarProdutos} />
      {erro && <p>{erro}</p>}
      
      {/* 👇 ADICIONE A PROP onDelete AQUI */}
      <ProdutoList 
        produtos={produtos} 
        loading={loading} 
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ProdutosPage