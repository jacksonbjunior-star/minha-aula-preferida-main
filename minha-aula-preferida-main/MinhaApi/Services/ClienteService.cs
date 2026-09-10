using MinhaApi.Models;
using MinhaApi.Repositories;
using MinhaApi.Services;


public class ClienteService : IClienteService
{
    private readonly IClienteRepository _repo;

    public ClienteService(IClienteRepository repo)
        => _repo = repo;

    public IEnumerable<Cliente> GetAll()
        => _repo.GetAll();

    public Cliente? GetById(int id)
        => _repo.GetById(id);

    public  Cliente Create(Cliente cliente)
    {
        if (string.IsNullOrWhiteSpace(cliente.Nome) || string.IsNullOrWhiteSpace(cliente.Email))
            throw new ArgumentException("Nome e email são obrigatórios");
        _repo.Add(cliente); 
        return cliente;
            
    }   
    public  Cliente? Update(int id, cliente c)
    {
        
        
    }

}