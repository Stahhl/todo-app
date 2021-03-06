using app.DataAccess;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "aspnet", Version = "v1" });
});

builder.Services.AddScoped<ITodoRepository>(x => 
    new TodoRepository(x.GetRequiredService<IConfiguration>().GetConnectionString("Database")));

var app = builder.Build();

app.UseDeveloperExceptionPage();
app.UseSwagger();

EndpointHelper.MapEndpoints(app);

app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "aspnet v1"));

app.Run();
