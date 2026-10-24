import { useState } from 'react'
import { produtoService } from '../services/ProdutoService'
import type { NovoProduto } from '../types/Produto'

interface Props {
  onProdutoCriado: () => void
}

// Estado unificado é mais limpo e fácil de resetar
const estadoInicial: NovoProduto = {
  nome: '',
  preco: 0,
  estoque: 0,
  ativo: true,
}

function ProdutoForm({ onProdutoCriado }: Props) {
  const [formData, setFormData] = useState<NovoProduto>(estadoInicial)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    
    // Validação básica extra
    if (formData.preco < 0 || formData.estoque < 0) {
      setErro('Preço e estoque não podem ser negativos.')
      return
    }

    try {
      setLoading(true)
      await produtoService.criar(formData)
      setFormData(estadoInicial) // Reseta o formulário facilmente
      onProdutoCriado()
    } catch {
      setErro('Erro ao cadastrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-spfc-branco rounded-xl shadow-lg p-6 mb-8 border-t-4 border-spfc-vermelho">
      <h2 className="text-2xl font-bold text-spfc-preto mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-spfc-vermelho rounded"></span>
        Cadastrar Produto
      </h2>

      {erro && (
        <div className="bg-spfc-vermelho text-spfc-branco px-4 py-3 rounded-lg mb-4 font-medium flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {erro}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-spfc-preto font-semibold mb-2">Nome do Produto</label>
          <input
            id="nome" name="nome" type="text" value={formData.nome} onChange={handleChange} required
            className="w-full px-4 py-3 border-2 border-spfc-preto rounded-lg focus:outline-none focus:border-spfc-vermelho transition-colors"
            placeholder="Ex: Camisa do São Paulo"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="preco" className="block text-spfc-preto font-semibold mb-2">Preço (R$)</label>
            <input
              id="preco" name="preco" type="number" step="0.01" min="0" value={formData.preco} onChange={handleChange} required
              className="w-full px-4 py-3 border-2 border-spfc-preto rounded-lg focus:outline-none focus:border-spfc-vermelho transition-colors"
              placeholder="0.00"
            />
          </div>
          <div>
            <label htmlFor="estoque" className="block text-spfc-preto font-semibold mb-2">Estoque</label>
            <input
              id="estoque" name="estoque" type="number" min="0" value={formData.estoque} onChange={handleChange} required
              className="w-full px-4 py-3 border-2 border-spfc-preto rounded-lg focus:outline-none focus:border-spfc-vermelho transition-colors"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            id="ativo" name="ativo" type="checkbox" checked={formData.ativo} onChange={handleChange}
            className="w-5 h-5 text-spfc-vermelho border-spfc-preto rounded focus:ring-spfc-vermelho"
          />
          <label htmlFor="ativo" className="text-spfc-preto font-semibold">Produto Ativo</label>
        </div>

        <button 
          type="submit" disabled={loading}
          className="w-full bg-spfc-vermelho text-spfc-branco font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {loading ? 'Salvando...' : 'Cadastrar'}
        </button>
      </div>
    </form>
  )
}
export default ProdutoForm