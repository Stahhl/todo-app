namespace app.Dtos;

public record TodoUpdateDto(string newTitle, string newText, bool newIsComplete);