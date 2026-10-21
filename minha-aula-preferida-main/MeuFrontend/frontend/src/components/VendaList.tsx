import type { Venda } from '../types/Venda'

interface Props {
  vendas: Venda[]
  loading: boolean
}

function VendaList({ vendas, loading }: Props) {
  if (loading) return <p className="text-gray-500">Carregando histórico de vendas...</p>
  if (vendas.length === 0) return <p className="text-gray-500">Nenhuma venda registrada ainda.</p>

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-spfc-cinza-claro">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vendas.map((v) => (
            <tr key={v.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">#{v.id}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{v.id_Cliente}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{v.id_Produto}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{v.quantidade}</td>
              <td className="px-4 py-3 text-sm font-bold text-green-700">
<<<<<<< HEAD
                R$ {v.valor_Total?.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {new Date(v.data_Venda).toLocaleDateString('pt-BR')}
=======
                R$ {v.valorTotal?.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {new Date(v.dataVenda).toLocaleDateString('pt-BR')}
>>>>>>> 2a9d2b64445aa6dca96e305ba4564396b5c52058
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VendaList