using app.DataAccess;
using app.Dtos;
using app.Models;

public static class EndpointHelper
{
    public static void MapEndpoints(WebApplication app)
    {
        app.MapGet("/todos", async (ITodoRepository repo) => 
        {
            return await repo.GetTodos();
        });

        app.MapGet("/todos/{id}", async (ITodoRepository repo, Guid id) => 
        {
            return await repo.GetTodo(id);
        });

        app.MapPost("/todos", async (ITodoRepository repo, TodoCreateDto dto) => 
        {
            return await repo.AddTodo(dto);
        });


        app.MapDelete("/todos/{id}", async (ITodoRepository repo, Guid id) => 
        {
            return await repo.DeleteTodo(id);
        });
    }
}