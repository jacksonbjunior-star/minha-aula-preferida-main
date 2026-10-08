import { useState } from 'react'
import { clienteService } from '../services/ClienteService'

interface Props { 
  onClienteCriado: () => void 
}

function ClienteForm({ onClienteCriado }: Props) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    try {
      setLoading(true)
     await clienteService.criar({ nome, email, cpf })
      setNome('')
      setEmail('')
      setCpf('')
      onClienteCriado()
    } catch { 
      setErro('Erro ao cadastrar cliente. Tente novamente.') 
    } finally { 
      setLoading(false) 
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-spfc-branco p-6 rounded-xl border border-spfc-cinza-claro shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-spfc-preto border-b border-spfc-cinza-claro pb-2">Cadastrar Novo Cliente</h2>
      
      {erro && (
        <p className="bg-spfc-vermelho text-spfc-branco px-4 py-2 rounded-lg text-sm font-medium">
          {erro}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="nome" className="text-sm font-medium text-spfc-cinza-escuro">Nome Completo</label>
          <input 
            id="nome" 
            value={nome}
            onChange={e => setNome(e.target.value)} 
            required 
            className="border border-spfc-cinza-claro rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-spfc-vermelho focus:border-transparent transition-all"
            placeholder="Ex: João da Silva"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cpf" className="text-sm font-medium text-spfc-cinza-escuro">CPF</label>
          <input 
            id="cpf" 
            value={cpf}
            onChange={e => setCpf(e.target.value)} 
            required
            className="border border-spfc-cinza-claro rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-spfc-vermelho focus:border-transparent transition-all"
            placeholder="000.000.000-00"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-spfc-cinza-escuro">E-mail</label>
        <input 
          id="email" 
          type="email" 
          value={email}
          onChange={e => setEmail(e.target.value)} 
          required 
          className="border border-spfc-cinza-claro rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-spfc-vermelho focus:border-transparent transition-all"
          placeholder="cliente@exemplo.com"
        />
      </div>

      <button 
        disabled={loading}
        className="w-full md:w-auto bg-spfc-vermelho text-spfc-branco font-bold py-2.5 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-spfc-branco border-t-transparent rounded-full animate-spin"></span>
            Salvando...
          </>
        ) : 'Cadastrar Cliente'}
      </button>
    </form>
  )
}

export default ClienteForm