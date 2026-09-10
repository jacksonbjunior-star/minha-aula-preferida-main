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
         new Cliente {Id = 1, Nome = "Primeiro Bahia", Email = "bahia@gmail.com", Cpf = "123.123.123-00"},

         new Cliente {Id = 2, Nome = "Segundo Vicetoria", Email = "vice@gmail.com", Cpf = "222.222.222-22"}
     };

       public IEnumerable<Cliente> GetAll()
    {
            var lista = new List<Cliente>();
            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            string sql = "Select id, nome, email, cpf, ativo FROM clientes";
            using var cmd = new MySqlCommand(sql, conn);
            using var reader = cmd.ExecuteReader();

            
            while(reader.Read())
        {
                lista.Add(new Cliente
                {
                    Id = reader.GetInt32("id"),
                    Nome = reader.GetString("nome"),
                    Email = reader.GetString("email"),
                    Cpf = reader.GetString("cpf"),
                    Ativo = reader.GetBoolean("ativo")
                });
        }
        return lista;
    }

    public Cliente? GetById(int id)
         => _db.FirstOrDefault(c => c.Id == id);

    public void Add(Cliente c)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO cliente (nome, email, cpf, ativo)
                     VALUES (@Nome, @Email, @Cpf, @Ativo);
                     SELECT LAST_INSERT_ID();";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Nome", c.Nome);
        cmd.Parameters.AddWithValue("@Email", c.Email);
        cmd.Parameters.AddWithValue("Cpf", c.Cpf);
        cmd.Parameters.AddWithValue("Ativo", c.Ativo);

        var idGerado = cmd.ExecuteScalar();
        c.Id = Convert.ToInt32(idGerado);

    }
    public void Update(Cliente c)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        string sql = @"Update cliente
                     SET nome = @Nome, email = @Email, cpf = @Cpf, ativo = @Ativo WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", c.Id);
        cmd.Parameters.AddWithValue("@Nome", c.Nome);
        cmd.Parameters.AddWithValue("@Email", c.Email);
        cmd.Parameters.AddWithValue("@Cpf", c.Cpf);
        cmd.Parameters.AddWithValue("@Ativo", c.Ativo);
        cmd.ExecuteNonQuery();
    
    }
    public void Delete(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        string sql = "DELETE FROM WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);
        cmd.ExecuteNonQuery();
    }




}