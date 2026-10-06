import type { Produto } from '../types/Produto'

interface Props {
  produtos: Produto[]
  loading: boolean
  onDelete: (id: number) => Promise<void> // 👈 1. Recebemos a função do pai
}

function ProdutoList({ produtos, loading, onDelete }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 bg-spfc-branco rounded-xl border-2 border-dashed border-spfc-cinza-escuro">
        <p className="text-spfc-preto font-semibold flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-spfc-vermelho border-t-transparent rounded-full animate-spin"></span>
          Carregando produtos...
        </p>
      </div>
    )
  }

  if (produtos.length === 0) {
    return (
      <div className="text-center py-12 bg-spfc-branco rounded-xl border-2 border-dashed border-gray-300">
        <p className="text-spfc-cinza-escuro font-medium text-lg">Nenhum produto cadastrado ainda.</p>
        <p className="text-sm text-gray-500 mt-1">Use o formulário acima para adicionar o primeiro!</p>
      </div>
    )
  }

  // 2. Função de confirmação para evitar cliques acidentais
  const handleDelete = async (id: number, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${nome}"?`)) {
      await onDelete(id)
    }
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {produtos.map(p => (
        <li 
          key={p.id} 
          className="bg-spfc-branco border-l-4 border-spfc-preto rounded-r-lg p-5 shadow-sm hover:shadow-lg hover:border-l-spfc-vermelho transition-all duration-300 flex flex-col justify-between relative group"
        >
          {/* 3. Botão de Excluir (Fica discreto, aparece no hover) */}
          <button
            onClick={() => handleDelete(p.id, p.nome)}
            className="absolute top-3 right-3 p-2 text-gray-400 hover:text-spfc-vermelho hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Excluir produto"
          >
            {/* Ícone de Lixeira (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>

          <div className="pr-8">
            <h3 className="text-spfc-preto font-bold text-lg mb-2 line-clamp-2">
              {p.nome}
            </h3>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Preço</span>
            <span className="text-spfc-vermelho font-extrabold text-xl">
              R$ {p.preco.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ProdutoList