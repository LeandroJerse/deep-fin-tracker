# 🔧 Configurar CORS no Backend - Guia Completo

## 🎯 Problema

Erro de CORS ao tentar acessar a API do frontend:
```
Access to XMLHttpRequest at 'http://localhost:5013/api/...' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

## ✅ Solução para ASP.NET Core

### 📝 Passo 1: Editar o arquivo `Program.cs`

Adicione a configuração de CORS no seu `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

// ... outras configurações ...

// ===== ADICIONAR CONFIGURAÇÃO DE CORS =====
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",      // Vite dev server
                "http://localhost:3000",      // React/Next (caso use)
                "http://localhost:5174",      // Vite alternativo
                "http://127.0.0.1:5173",      // Localhost IP
                "https://seudominio.com"      // Produção (quando tiver)
            )
            .AllowAnyMethod()                 // GET, POST, PUT, DELETE, etc.
            .AllowAnyHeader()                 // Permite qualquer header
            .AllowCredentials();              // Permite cookies/auth
    });
});
// ===== FIM DA CONFIGURAÇÃO DE CORS =====

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ===== USAR CORS (IMPORTANTE: ANTES DE UseAuthorization) =====
app.UseCors("AllowFrontend");
// ===== FIM =====

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### 🔑 Pontos Importantes:

1. **`app.UseCors()` DEVE vir ANTES de `app.UseAuthorization()`**
2. Adicione todas as URLs do frontend que você usa
3. Use `AllowAnyOrigin()` APENAS para testes (não em produção)

### 🌟 Configuração Alternativa (Mais Permissiva - Apenas para DEV)

Se quiser permitir qualquer origem durante o desenvolvimento:

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

// Depois usar:
app.UseCors("AllowAll");
```

⚠️ **ATENÇÃO:** Não use `AllowAnyOrigin()` em produção!

## 🎯 Configuração por Ambiente

Para diferentes configurações em DEV e PROD:

```csharp
builder.Services.AddCors(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        // Desenvolvimento: mais permissivo
        options.AddPolicy("CorsPolicy", policy =>
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
    }
    else
    {
        // Produção: apenas domínios específicos
        options.AddPolicy("CorsPolicy", policy =>
        {
            policy.WithOrigins("https://seudominio.com")
                .WithMethods("GET", "POST", "PUT", "DELETE")
                .WithHeaders("Content-Type", "Authorization")
                .AllowCredentials();
        });
    }
});

app.UseCors("CorsPolicy");
```

## 🔧 Solução 2: CORS por Controller (Alternativa)

Se preferir configurar CORS por controller:

```csharp
// No Program.cs, adicionar o serviço
builder.Services.AddCors();

// No seu controller
[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowFrontend")] // Aplicar CORS a todo o controller
public class RastreamentoTubaroesController : ControllerBase
{
    // seus métodos...
    
    [HttpGet("v1/latest-position")]
    public async Task<IActionResult> GetLatestPositions()
    {
        // seu código...
    }
}
```

## 🧪 Testar se CORS está Funcionando

### 1. Via Browser Console

Abra o DevTools (F12) e execute:

```javascript
fetch('http://localhost:5013/api/RastreamentoTubaroes/v1/latest-position')
  .then(res => res.json())
  .then(data => console.log('Sucesso!', data))
  .catch(err => console.error('Erro:', err))
```

### 2. Via CURL

```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     --verbose \
     http://localhost:5013/api/RastreamentoTubaroes/v1/latest-position
```

Deve retornar headers como:
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

## 🔍 Verificar Headers da Resposta

A resposta da API deve incluir estes headers:

```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

## ⚠️ Problemas Comuns e Soluções

### Problema 1: CORS ainda não funciona após configurar

**Solução:**
1. Reinicie completamente o servidor backend
2. Limpe o cache do navegador (Ctrl+Shift+Del)
3. Teste em uma aba anônima
4. Verifique se `app.UseCors()` está ANTES de `app.UseAuthorization()`

### Problema 2: Funciona no Swagger mas não no Frontend

**Solução:**
- Swagger faz requisições do servidor, não do navegador
- Configure CORS mesmo que o Swagger funcione

### Problema 3: Erro em requisições OPTIONS

**Solução:**
```csharp
// Adicionar suporte explícito para OPTIONS
app.UseRouting();
app.UseCors("AllowFrontend"); // ANTES de UseEndpoints
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
```

### Problema 4: "Credentials mode is 'include'" error

**Solução:**
```csharp
// Se usar credentials, não pode usar AllowAnyOrigin
policy.WithOrigins("http://localhost:5173") // Use origins específicas
      .AllowCredentials(); // Agora funciona
```

## 🌐 Configuração para Ngrok (Desenvolvimento Remoto)

Se estiver usando ngrok:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "https://*.ngrok-free.app",
                "https://fb457da07468.ngrok-free.app" // Seu URL específico
            )
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});
```

## 📋 Checklist de Verificação

- [ ] `builder.Services.AddCors()` está no Program.cs
- [ ] Policy está configurada com as origens corretas
- [ ] `app.UseCors("PolicyName")` está ANTES de `app.UseAuthorization()`
- [ ] Servidor backend foi reiniciado
- [ ] URL do frontend está correta (porta 5173 para Vite)
- [ ] Testado em aba anônima do navegador
- [ ] Headers CORS aparecem na resposta (verifique no Network do DevTools)

## 🚀 Código Completo - Program.cs Exemplo

```csharp
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Adicionar CORS
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

// Outros serviços
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar seu DbContext, etc...

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// IMPORTANTE: CORS antes de Authorization
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();
```

## 🎯 Após Configurar

1. **Reinicie o backend** (Ctrl+C e rodar novamente)
2. **Reinicie o frontend** (Ctrl+C e `npm run dev`)
3. **Limpe o cache** do navegador
4. **Teste acessando:** `http://localhost:5173/rastreamento`

---

**✅ Após aplicar essas configurações, o erro de CORS deve ser resolvido!**

