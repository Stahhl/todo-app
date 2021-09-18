using app.Dtos;
using app.Models;
using Dapper;
using Npgsql;

namespace app.DataAccess;

public class TodoRepository : ITodoRepository
{
    private readonly string _connectionString;

    public TodoRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<Todo> AddTodo(TodoCreateDto dto)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteTodo(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<Todo> GetTodo(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Todo>> GetTodos()
    {
        const string sql = 
            "select * from todos";

        await using var con = new NpgsqlConnection(_connectionString);
        return await con.QueryAsync<Todo>(sql); 
    }

    public async Task<IEnumerable<Todo>> UpdateOrder(TodoOrderUpdateDto dto)
    {
        throw new NotImplementedException();
    }

    public async Task<Todo> UpdateTodo(TodoUpdateDto dtp)
    {
        throw new NotImplementedException();
    }
}