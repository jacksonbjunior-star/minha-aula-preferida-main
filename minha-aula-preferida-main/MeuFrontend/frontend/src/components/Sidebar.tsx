import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-spfc-vermelho text-spfc-branco'
        : 'text-spfc-preto hover:bg-gray-100'
    }`

  return (
    <aside className="w-64 bg-spfc-branco border-r border-gray-200 min-h-screen p-6">
      <h2 className="text-2xl font-bold text-spfc-vermelho mb-8">Minha API</h2>
      
      <nav className="space-y-2">
        <NavLink to="/produtos" className={linkClass} end>
          📦 Produtos
        </NavLink>
        
        <NavLink to="/clientes" className={linkClass} end>
          👥 Clientes
        </NavLink>
        
        <NavLink to="/vendas" className={linkClass} end>
          💰 Vendas
        </NavLink>
        
        <NavLink to="/fornecedores" className={linkClass} end>
           Fornecedores
        </NavLink>
      </nav>
    </aside>
  )
}