import { useState, useEffect } from 'react'
import { vendaService } from '../services/VendaService'

interface Props {
  onVendaCriada: () => void
}

function VendaForm({ onVendaCriada }: Props) {
  const [idCliente, setIdCliente] = useState('')
  const [idProduto, setIdProduto] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro,    setErro]    = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    try {
      setLoading(true)
      await vendaService.realizarVenda({
        id_Cliente: Number(idCliente),
        id_Produto: Number(idProduto),
        quantidade: Number(quantidade),
      })
      setIdCliente('')
      setIdProduto('')
      setQuantidade('')
      onVendaCriada()
    } catch {
      setErro('Erro ao cadastrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Produto</h2>

      {erro && (
        <p style={{ color: 'red' }}>{erro}</p>
      )}

      <div>
        <label htmlFor="idCliente">ID do Cliente</label>
        <input
          id="idCliente"
          type="text"
          value={idCliente}
          onChange={e => setIdCliente(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="idProduto">Id do Produto</label>
        <input
          id="idProduto"
          type="number"
          step="0.01"
          value={idProduto}
          onChange={e => setIdProduto(e.target.value)}
          required
        />
      </div>

       
       
      <div>
        <label htmlFor="quantidade">Quantidade</label>
        <input 
          id="quantidade"
          type="number"
          step="0.'01"
          value={quantidade}
          onChange={e => setQuantidade(e.target.value)}
          required
        />
      </div>
    

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Cadastrar'}
      </button>
    </form>
  )
}
export default VendaForm