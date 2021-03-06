using app.Dtos;
using app.Models;

namespace app.DataAccess;

public interface ITodoRepository
{
    Task<IEnumerable<Todo>> GetTodos();
    Task<IEnumerable<Todo>> UpdateOrder(Guid id, TodoOrderUpdateDto dto);
    Task<Todo> UpdateTodo(Guid id, TodoUpdateDto dtp);
    Task<Todo> GetTodo(Guid id);
    Task<Todo> AddTodo(TodoCreateDto dto);
    Task<bool> DeleteTodo(Guid id);
}