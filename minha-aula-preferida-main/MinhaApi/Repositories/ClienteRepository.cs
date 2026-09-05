using System.ComponentModel.DataAnnotations;
using MinhaApi.Models;
using MinhaApi.Repositories;
using MySqlConnector;

public class ClienteRepository : IClienteRepository
{
    private readonly string _connectionString;

    public ClienteRepository(IConfiguration config)
        => _connectionString = config.GetConnectionString("DefaultConnection")!;
        
     private static List<Cliente> _db = new()
     {
         new Cliente {Id = 1 , Nome = "Primeiro Bahia", Email = "bahia@gmail.com", Cpf = "123.123.123-00"},

         new Cliente
     }




}