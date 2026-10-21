import { useEffect, useState } from 'react'
import type { Fornecedor } from '../types/Fornecedor'
import { fornecedorService } from '../services/FornecedorService'
import FornecedorForm from '../components/FornecedorForm'
import FornecedorList from '../components/FornecedorList'

function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const carregarFornecedores = async () => {
    setLoading(true)
    setErro(null)
    try { 
      const dados = await fornecedorService.listar()
      setFornecedores(dados)
    } catch { 
      setErro('Erro ao carregar fornecedores.') 
    } finally { 
      setLoading(false) 
    }
  }

  useEffect(() => { 
    carregarFornecedores() 
  }, [])

  // 👇 Lógica para deletar o fornecedor (espelhando a do cliente)
  const handleDelete = async (id: number) => {
    const confirmou = window.confirm('Tem certeza que deseja excluir este fornecedor?')
    if (!confirmou) return

    try {
      setLoading(true)
      setErro(null)
      
      // Chama o serviço de deletar
      await fornecedorService.deletar(id)
      
      // Atualização Otimista: remove o fornecedor da lista instantaneamente
      setFornecedores((fornecedoresAtuais) => fornecedoresAtuais.filter((f) => f.id !== id))
      
    } catch (error) {
      console.error('Erro ao deletar:', error)
      setErro('Não foi possível excluir o fornecedor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-spfc-preto border-b-4 border-spfc-vermelho pb-3 mb-8">
        Gestão de Fornecedores
      </h1>
      
      {/* O formulário chama carregarFornecedores ao criar com sucesso */}
      <FornecedorForm onFornecedorCriado={carregarFornecedores} />
      
      <h2 className="text-xl font-semibold text-spfc-preto mt-10 mb-4">
        Fornecedores Cadastrados
      </h2>
      
      {erro && (
        <p className="bg-spfc-vermelho text-spfc-branco px-4 py-2 rounded-lg mb-4 font-medium">
          {erro}
        </p>
      )}
      
      {/* Passamos os dados e a função de deletar para a lista */}
      <FornecedorList 
        fornecedores={fornecedores} 
        loading={loading} 
        onDelete={handleDelete} 
      />
    </div>
  )
}

export default FornecedoresPage