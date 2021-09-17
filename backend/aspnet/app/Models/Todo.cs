public class Todo
{
    public Todo() 
    { 
        Title = "";
        Text = "";
    }
    public Todo(TodoCreateDto dto)
    {
        Title = dto.title;
        Text = dto.description;
    }

    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Text { get; set; }
    public int Order { get; set; }
    public bool IsComplete { get; set; }
}