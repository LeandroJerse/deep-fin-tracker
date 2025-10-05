# ⚡ Solução Rápida - CORS

## 🎯 Adicione isso no seu `Program.cs`

### Passo 1: Adicionar Serviço de CORS (depois de `var builder = ...`)

```csharp
// ADICIONAR AQUI - Depois das outras configurações de serviço
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:3000",
                "http://127.0.0.1:5173"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});
```

### Passo 2: Usar CORS (ANTES de `app.UseAuthorization()`)

```csharp
// ADICIONAR AQUI - ANTES de app.UseAuthorization()
app.UseCors("AllowFrontend");
```

## 📋 Exemplo Completo do Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);

// Serviços
builder.Services.AddControllers();

// ⭐ ADICIONAR CORS AQUI ⭐
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:3000",
                "http://127.0.0.1:5173"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ⭐ USAR CORS AQUI (ANTES DE UseAuthorization) ⭐
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();
```

## 🚀 Passo a Passo

1. ✅ Abra o arquivo `Program.cs` do seu projeto backend
2. ✅ Adicione o código de CORS nas posições indicadas
3. ✅ Salve o arquivo
4. ✅ **REINICIE** o servidor backend (Ctrl+C e rodar novamente)
5. ✅ Recarregue o frontend (F5 no navegador)

## ✅ Como Testar

Abra o console do navegador (F12) e execute:

```javascript
fetch('http://localhost:5013/api/RastreamentoTubaroes/v1/latest-position')
  .then(res => res.json())
  .then(data => console.log('✅ CORS Funcionando!', data))
  .catch(err => console.error('❌ Erro:', err))
```

## 🔍 Verificar Headers

No Network do DevTools (F12 → Network), procure por:
- `Access-Control-Allow-Origin: http://localhost:5173`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE`
- `Access-Control-Allow-Headers: *`

## ⚠️ Se Ainda Não Funcionar

### Opção 1: CORS Mais Permissivo (Apenas DEV!)

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

app.UseCors("AllowAll");
```

### Opção 2: Verificar Ordem dos Middlewares

A ordem correta é:
```csharp
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");  // ← Antes de Authorization
app.UseAuthorization();
app.MapControllers();
```

### Opção 3: Adicionar ao Controller Específico

```csharp
using Microsoft.AspNetCore.Cors;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowFrontend")]
public class RastreamentoTubaroesController : ControllerBase
{
    [HttpGet("v1/latest-position")]
    public async Task<IActionResult> GetLatestPositions()
    {
        // seu código...
    }
}
```

## 📞 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| CORS ainda não funciona | Reinicie o backend completamente |
| Funciona no Swagger, não no frontend | Swagger não usa browser CORS, adicione config mesmo assim |
| Erro "Credentials mode 'include'" | Use `WithOrigins` específicas, não `AllowAnyOrigin` |
| OPTIONS request falha | Verifique se CORS está antes de Authorization |

---

**💡 Dica:** Após configurar, sempre reinicie o servidor backend!

