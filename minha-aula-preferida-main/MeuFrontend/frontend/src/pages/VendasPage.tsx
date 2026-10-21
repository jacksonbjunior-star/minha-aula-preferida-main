import { useEffect, useState } from "react";
import type { Venda } from "../types/Venda";  
import { vendaService } from "../services/VendaService";
import VendaForm from "../components/VendaForm";
import VendaList from "../components/VendaList";


function VendasPage() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

    const carregarListas = async () => {
    try {
      setLoading(true);
      setErro(null);
      const dados = await vendaService.listarVenda();
      setVendas(dados);
    } catch {
      setErro("Erro ao carregar vendas.");
    } finally {
      setLoading(false);
    }
    useEffect(() => {
      carregarListas();
    }, []); 

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-spfc-preto mb-6">Vendas</h1>
        <VendaForm onVendaCriada={carregarListas} />
        {erro && <p className="text-red-500 mt-4">{erro}</p>}
        <VendaList vendas={vendas} loading={loading} />
      </div>
    );
  }
}

export default VendasPage