interface Props {
  // ✅ 1. Adicionado 'vendas' e 'fornecedores' aos tipos
  telaAtual: 'produtos' | 'clientes' | 'vendas' | 'fornecedores'
  onChangeTela: (tela: 'produtos' | 'clientes' | 'vendas' | 'fornecedores') => void
}

function Sidebar({ telaAtual, onChangeTela }: Props) {
  // Função auxiliar para deixar o código do botão mais limpo
  const getClasseBotao = (tela: string) => {
    return telaAtual === tela
      ? 'bg-spfc-vermelho text-white shadow-lg shadow-red-900/20' 
      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
  }

  return (
    <aside className="w-64 bg-spfc-preto text-spfc-branco min-h-screen flex flex-col shadow-xl">
      {/* Logo / Título */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-black tracking-tight">
          <span className="text-spfc-vermelho">Minha</span>Aula
        </h1>
        <p className="text-xs text-gray-400 mt-1">Painel Administrativo</p>
      </div>

      {/* Navegação */}
      <nav className="flex-1 p-4 space-y-2">
        
        {/* Botão Produtos */}
        <button
          onClick={() => onChangeTela('produtos')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${getClasseBotao('produtos')}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          Produtos
        </button>

        {/* Botão Clientes */}
        <button
          onClick={() => onChangeTela('clientes')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${getClasseBotao('clientes')}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Clientes
        </button>

        {/* ✅ 2. NOVO: Botão Vendas */}
        <button
          onClick={() => onChangeTela('vendas')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${getClasseBotao('vendas')}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Vendas
        </button>

        {/* ✅ 3. NOVO: Botão Fornecedores */}
        <button
          onClick={() => onChangeTela('fornecedores')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${getClasseBotao('fornecedores')}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Fornecedores
        </button>

      </nav>

      {/* Rodapé da Sidebar */}
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
        © 2026 Minha Aula Preferida
      </div>
    </aside>
  )
}

export default Sidebar