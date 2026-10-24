import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'

// Importamos apenas as PÁGINAS, não os componentes soltos
import ProdutosPage from './pages/ProdutosPage'
import ClientesPage from './pages/ClientesPage'
import VendasPage from './pages/VendasPage'
import FornecedoresPage from './pages/FornecedorPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-spfc-cinza-claro">
        {/* A Sidebar agora pode usar o hook useNavigate ou links <Link> do React Router */}
        <Sidebar /> 

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Routes>
              {/* Rota padrão redireciona para produtos */}
              <Route path="/" element={<Navigate to="/produtos" replace />} />
              
              {/* Cada rota renderiza sua página isolada, com sua própria lógica */}
              <Route path="/produtos" element={<ProdutosPage />} />
              <Route path="/clientes" element={<ClientesPage />} />
              <Route path="/vendas" element={<VendasPage />} />
              <Route path="/fornecedores" element={<FornecedoresPage />} />
              
              {/* Rota de fallback para URLs inválidas */}
              <Route path="*" element={<h1 className="text-2xl">Página não encontrada (404)</h1>} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App