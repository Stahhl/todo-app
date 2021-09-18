using app.DataAccess;
using app.Dtos;
using app.Models;

public static class EndpointHelper
{
    public static void MapEndpoints(WebApplication app)
    {
        app.MapPost("/todos", async (TodoCreateDto dto) => 
        {
            return new Todo(dto);
        });

        app.MapGet("/todos", async (ITodoRepository repo) => 
        {
            return await repo.GetTodos();
        });
    }
}