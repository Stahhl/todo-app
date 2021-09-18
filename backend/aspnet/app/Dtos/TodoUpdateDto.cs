namespace app.Dtos;

public record TodoUpdateDto(string title, string text, bool isComplete);