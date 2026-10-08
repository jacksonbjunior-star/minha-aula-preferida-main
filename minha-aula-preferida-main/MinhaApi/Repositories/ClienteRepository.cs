using System.ComponentModel.DataAnnotations;
using MinhaApi.Models;
using MinhaApi.Repositories;
using MySqlConnector;
    public class ClienteRepository : IClienteRepository
    {
        private readonly string _connectionString;

        public ClienteRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection") 
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        }

        public IEnumerable<Cliente> GetAll()
        {
            var lista = new List<Cliente>();
            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            string sql = "SELECT id, nome, email, cpf, ativo FROM clientes";
            using var cmd = new MySqlCommand(sql, conn);
            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                lista.Add(new Cliente
                {
                    Id = Convert.ToInt32(reader["id"]),
                    Nome = reader["nome"].ToString() ?? "",
                    Email = reader["email"].ToString() ?? "",
                    Cpf = reader["cpf"].ToString() ?? "",
                    Ativo = Convert.ToBoolean(reader["ativo"])
                });
            }
            return lista;
        }

        public Cliente? GetById(int id)
        {
            using var conn = new MySqlConnection(_connectionString);
            conn.Open();
            
            string sql = "SELECT id, nome, email, cpf, ativo FROM clientes WHERE id = @Id";
            using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Id", id);
            
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new Cliente
                {
                    Id = Convert.ToInt32(reader["id"]),
                    Nome = reader["nome"].ToString() ?? "",
                    Email = reader["email"].ToString() ?? "",
                    Cpf = reader["cpf"].ToString() ?? "",
                    Ativo = Convert.ToBoolean(reader["ativo"])
                };
            }
            return null;
        }

        public void Add(Cliente c)
        {
            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            string sql = @"INSERT INTO clientes (nome, email, cpf, ativo)
                         VALUES (@Nome, @Email, @Cpf, @Ativo);
                         SELECT LAST_INSERT_ID();";

            using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Nome", c.Nome);
            cmd.Parameters.AddWithValue("@Email", c.Email);
            cmd.Parameters.AddWithValue("@Cpf", c.Cpf);      // ✅ Corrigido: adicionado @
            cmd.Parameters.AddWithValue("@Ativo", c.Ativo);  // ✅ Corrigido: adicionado @

            var idGerado = cmd.ExecuteScalar();
            c.Id = Convert.ToInt32(idGerado);
        }

        public void Update(Cliente c)
        {
            using var conn = new MySqlConnection(_connectionString);
            conn.Open();
            
            string sql = @"UPDATE clientes
                         SET nome = @Nome, email = @Email, cpf = @Cpf, ativo = @Ativo 
                         WHERE id = @Id";
                         
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
            
            // ✅ Corrigido: adicionado o nome da tabela 'clientes'
            string sql = "DELETE FROM clientes WHERE id = @Id"; 
            
            using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.ExecuteNonQuery();
        }
}
