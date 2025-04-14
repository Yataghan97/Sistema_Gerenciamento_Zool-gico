using Microsoft.EntityFrameworkCore;
using teste_dev.api.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173") // URL do seu front-end React
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// Configuração do DbContext para conectar ao banco de dados
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Adicionando os serviços necessários
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ativar o CORS antes dos controllers
app.UseCors("AllowFrontend");

// Configuração do Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Middleware de tratamento de erros (se necessário)
app.UseMiddleware<teste_dev.api.Middlewares.ErrorHandlingMiddleware>();

// Redirecionamento HTTPS, caso necessário
app.UseHttpsRedirection();

// Middleware de autorização (se necessário)
app.UseAuthorization();

// Mapeamento dos controllers
app.MapControllers();

// Iniciar a aplicação
app.Run();
