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

        app.MapPut("/todos/{id}/order", async (ITodoRepository repo, Guid id, TodoOrderUpdateDto dto) => 
        {
            return await repo.UpdateOrder(id, dto);
        });

        app.MapPut("/todos/{id}", async (ITodoRepository repo, Guid id, TodoUpdateDto dto) => 
        {
            return await repo.UpdateTodo(id, dto);
        });
    }
}