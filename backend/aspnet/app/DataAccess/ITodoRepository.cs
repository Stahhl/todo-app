namespace app.DataAccess
{
    public interface ITodoRepository
    {
        Task<IEnumerable<Todo>> GetTodos();
        Task<IEnumerable<Todo>> UpdateOrder(TodoOrderUpdateDto dto);
        Task<Todo> UpdateTodo(TodoUpdateDto dtp);
        Task<Todo> GetTodo(Guid id);
        Task<Todo> AddTodo(TodoCreateDto dto);
        Task<bool> DeleteTodo(Guid id);
    }
}