import { useState } from 'react'
import { fornecedorService } from '../services/FornecedorService'
import type { NovoFornecedor } from '../types/Fornecedor'

interface Props { 
  onFornecedorCriado: () => void 
}

function FornecedorForm({ onFornecedorCriado }: Props) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cnpj, setCnpj] = useState('')
  // Telefone pode ser número ou string vazia (para permitir limpar o input)
  const [telefone, setTelefone] = useState<number | ''>('') 
  const [ativo, setAtivo] = useState(true)
  
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    
    try {
      setLoading(true)
      
      const dados: NovoFornecedor = {
        nome,
        email,
        cnpj,
        telefone: Number(telefone), // Converte para número como o backend exige
        ativo
      }

      await fornecedorService.criar(dados)
      
      // Limpa o formulário após o sucesso
      setNome('')
      setEmail('')
      setCnpj('')
      setTelefone('')
      setAtivo(true)
      
      onFornecedorCriado() // Avisa a página para recarregar a lista
    } catch { 
      setErro('Erro ao cadastrar fornecedor. Tente novamente.') 
    } finally { 
      setLoading(false) 
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-spfc-branco p-6 rounded-xl border border-spfc-cinza-claro shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-spfc-preto border-b border-spfc-cinza-claro pb-2">
        Cadastrar Novo Fornecedor
      </h2>
      
      {erro && (
        <p className="bg-spfc-vermelho text-spfc-branco px-4 py-2 rounded-lg text-sm font-medium">
          {erro}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo Nome */}
        <div className="flex flex-col gap-1">
          <label htmlFor="nome" className="text-sm font-medium text-spfc-cinza-escuro">Nome / Razão Social</label>
          <input 
            id="nome" 
            value={nome}
            onChange={e => setNome(e.target.value)} 
            required 
            className="border border-spfc-cinza-claro rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-spfc-vermelho focus:border-transparent transition-all"
            placeholder="Ex: Empresa Exemplo LTDA"
          />
        </div>

        {/* Campo CNPJ */}
        <div className="flex flex-col gap-1">
          <label htmlFor="cnpj" className="text-sm font-medium text-spfc-cinza-escuro">CNPJ</label>
          <input 
            id="cnpj" 
            value={cnpj}
            onChange={e => setCnpj(e.target.value)} 
            required
            className="border border-spfc-cinza-claro rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-spfc-vermelho focus:border-transparent transition-all"
            placeholder="00.000.000/0000-00"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-spfc-cinza-escuro">E-mail</label>
          <input 
            id="email" 
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)} 
            required 
            className="border border-spfc-cinza-claro rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-spfc-vermelho focus:border-transparent transition-all"
            placeholder="contato@empresa.com"
          />
        </div>

        {/* Campo Telefone (Tipo Number) */}
        <div className="flex flex-col gap-1">
          <label htmlFor="telefone" className="text-sm font-medium text-spfc-cinza-escuro">Telefone</label>
          <input 
            id="telefone" 
            type="number" 
            value={telefone}
            onChange={e => setTelefone(e.target.value === '' ? '' : Number(e.target.value))} 
            required
            className="border border-spfc-cinza-claro rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-spfc-vermelho focus:border-transparent transition-all"
            placeholder="Ex: 11999999999"
          />
        </div>
      </div>

      {/* Campo Ativo (Checkbox) */}
      <div className="flex items-center gap-2 pt-2">
        <input 
          id="ativo" 
          type="checkbox" 
          checked={ativo}
          onChange={e => setAtivo(e.target.checked)}
          className="w-4 h-4 text-spfc-vermelho border-spfc-cinza-claro rounded focus:ring-spfc-vermelho cursor-pointer"
        />
        <label htmlFor="ativo" className="text-sm font-medium text-spfc-cinza-escuro cursor-pointer">
          Fornecedor Ativo
        </label>
      </div>

      {/* Botão de Submit */}
      <button 
        disabled={loading}
        className="w-full md:w-auto bg-spfc-vermelho text-spfc-branco font-bold py-2.5 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-spfc-branco border-t-transparent rounded-full animate-spin"></span>
            Salvando...
          </>
        ) : 'Cadastrar Fornecedor'}
      </button>
    </form>
  )
}

export default FornecedorForm