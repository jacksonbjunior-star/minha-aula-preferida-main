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
  const [erro, setErro] = useState<string | null>(null)
  const [valorTotal, setValorTotal] = useState<number | null>(null) // 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    setValorTotal(null) 
    try {
      setLoading(true)
      const venda = await vendaService.realizarVenda({ 
        id_Cliente: Number(idCliente),
        id_Produto: Number(idProduto),
        quantidade: Number(quantidade),
      })
      setValorTotal(venda.valorTotal)
      setIdCliente('')
      setIdProduto('')
      setQuantidade('')
      onVendaCriada()
    } catch (err: any) {
      const mensagem = err.response?.data?.message || 'Erro ao cadastrar. Tente novamente.'
      setErro(mensagem) 
    } finally {
      setLoading(false)
    }
  }
return (
  <form onSubmit={handleSubmit}>
    <h2>Cadastrar Venda</h2>

    {erro && (
      <p style={{ color: 'red', backgroundColor: '#ffe0e0', padding: '10px', borderRadius: '4px' }}>
        {erro}
      </p>
    )}

    {valorTotal !== null && (
      <p style={{ color: 'green', backgroundColor: '#e0ffe0', padding: '10px', borderRadius: '4px', fontWeight: 'bold' }}>
        ✅ Venda realizada! Valor total: R$ {valorTotal.toFixed(2)}
      </p>
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

    {}
    <div>
      <label htmlFor="idProduto">ID do Produto</label>
      <input
        id="idProduto"
        type="number"
        min="1"
        step="1"
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
        min="1"
        step="1"
        value={quantidade}
        onChange={e => setQuantidade(e.target.value)}
        required
      />
    </div>

    {}
    <button type="submit" disabled={loading}>
      {loading ? 'Salvando...' : 'Cadastrar'}
    </button>
  </form>
)
export default VendaForm