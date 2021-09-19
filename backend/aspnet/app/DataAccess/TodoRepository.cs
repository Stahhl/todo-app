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
        var param = new {Title = dto.title, Text = dto.text};
        const string sql =
            "insert into todos(title, text) " +
            "values " +
            "(@Title, @Text) " + 
            "returning id, title, text, todoorder, iscomplete";

        await using var con = new NpgsqlConnection(_connectionString);
        return await con.QueryFirstAsync<Todo>(sql, param);
    }

    public async Task<bool> DeleteTodo(Guid id)
    {
        var param = new { Id = id };
        const string sql = 
            "delete from todos where id = @Id";

        await using var con = new NpgsqlConnection(_connectionString);
        return await con.ExecuteAsync(sql, param) == 1;
    }

    public async Task<Todo> GetTodo(Guid id)
    {
        var param = new { Id = id };
        const string sql = 
            "select * from todos where id = @Id";

        await using var con = new NpgsqlConnection(_connectionString);
        return await con.QueryFirstAsync<Todo>(sql, param); 
    }

    public async Task<IEnumerable<Todo>> GetTodos()
    {
        const string sql = 
            "select * from todos";

        await using var con = new NpgsqlConnection(_connectionString);
        return await con.QueryAsync<Todo>(sql); 
    }

    public async Task<IEnumerable<Todo>> UpdateOrder(Guid id, TodoOrderUpdateDto dto)
    {
        var param = new { Id = id, NewOrder = dto.newOrder };
        const string sql = 
            "update todos set todoorder = @NewOrder where id = @Id";

        await using var con = new NpgsqlConnection(_connectionString);

        if(await con.ExecuteAsync(sql, param) == 1)
            return await GetTodos();

        return Enumerable.Empty<Todo>();
    }

    public async Task<Todo> UpdateTodo(TodoUpdateDto dtp)
    {
        throw new NotImplementedException();
    }
}