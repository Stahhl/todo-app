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
    }
}