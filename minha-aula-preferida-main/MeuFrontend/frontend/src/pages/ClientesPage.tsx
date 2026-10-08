import { useEffect, useState } from 'react'
import type { Cliente } from '../types/Cliente'
import { clienteService } from '../services/ClienteService'
import ClienteForm from '../components/ClienteForm'
import ClienteList from '../components/ClienteList'

function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const carregarClientes = async () => {
    setLoading(true)
    setErro(null)
    try { 
      setClientes(await clienteService.listar()) 
    } catch { 
      setErro('Erro ao carregar clientes.') 
    } finally { 
      setLoading(false) 
    }
  }

  useEffect(() => { 
    carregarClientes() 
  }, [])

  // 👇 NOVA FUNÇÃO: Lógica para deletar o cliente
  const handleDelete = async (id: number) => {
    const confirmou = window.confirm('Tem certeza que deseja excluir este cliente?')
    if (!confirmou) return

    try {
      setLoading(true)
      setErro(null)
      
      // Chama o serviço de deletar (certifique-se de que existe no ClienteService)
      await clienteService.deletar(id)
      
      // Atualização Otimista: remove o cliente da lista instantaneamente
      setClientes((clientesAtuais) => clientesAtuais.filter((c) => c.id !== id))
      
    } catch (error) {
      console.error('Erro ao deletar:', error)
      setErro('Não foi possível excluir o cliente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-spfc-preto border-b-4 border-spfc-vermelho pb-3 mb-8">
        Gestão de Clientes
      </h1>
      
      <ClienteForm onClienteCriado={carregarClientes} />
      
      <h2 className="text-xl font-semibold text-spfc-preto mt-10 mb-4">Clientes Cadastrados</h2>
      
      {erro && (
        <p className="bg-spfc-vermelho text-spfc-branco px-4 py-2 rounded-lg mb-4 font-medium">
          {erro}
        </p>
      )}
      
      {/* 👇 ADICIONADO: Passamos a função onDelete para o componente filho */}
      <ClienteList 
        clientes={clientes} 
        loading={loading} 
        onDelete={handleDelete} 
      />
    </div>
  )
}

export default ClientesPage