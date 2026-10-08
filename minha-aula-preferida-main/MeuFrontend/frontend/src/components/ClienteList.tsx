import type { Cliente } from '../types/Cliente' // Ajuste o caminho se necessário

interface Props {
  clientes: Cliente[]
  loading: boolean
  onDelete: (id: number) => Promise<void>
}

function ClienteList({ clientes, loading, onDelete }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 bg-spfc-branco rounded-xl border-2 border-dashed border-spfc-cinza-escuro">
        <p className="text-spfc-preto font-semibold flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-spfc-vermelho border-t-transparent rounded-full animate-spin"></span>
          Carregando clientes...
        </p>
      </div>
    )
  }

  if (clientes.length === 0) {
    return (
      <div className="text-center py-12 bg-spfc-branco rounded-xl border-2 border-dashed border-spfc-cinza-claro">
        <p className="text-spfc-cinza-escuro font-medium">Nenhum cliente cadastrado ainda.</p>
      </div>
    )
  }

  return (
    <div className="bg-spfc-branco rounded-xl border border-spfc-cinza-claro shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-spfc-cinza-claro text-spfc-cinza-escuro text-sm uppercase font-semibold">
          <tr>
            <th className="px-6 py-4">Nome</th>
            <th className="px-6 py-4">E-mail</th>
            <th className="px-6 py-4">CPF</th>
            <th className="px-6 py-4 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-spfc-cinza-claro">
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-spfc-preto">{cliente.nome}</td>
              <td className="px-6 py-4 text-spfc-cinza-escuro">{cliente.email}</td>
              <td className="px-6 py-4 text-spfc-cinza-escuro font-mono text-sm">{cliente.cpf}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onDelete(cliente.id)}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium flex items-center gap-1 mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClienteList