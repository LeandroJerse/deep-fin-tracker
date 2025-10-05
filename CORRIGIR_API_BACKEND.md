# 🔧 Correção Necessária na API Backend

## ❌ Problema Identificado

O erro que você está recebendo:
```json
{
  "status": 400,
  "errors": {
    "idRastreamentoTubaroes": [
      "The value 'latest-position' is not valid."
    ]
  }
}
```

Isso indica que **o endpoint `/api/RastreamentoTubaroes/v1/latest-position` não existe** no seu backend, ou está configurado incorretamente.

## ✅ Soluções Possíveis

### Opção 1: Adicionar o Endpoint no Backend (Recomendado)

Você precisa criar um endpoint na sua API backend que retorne as últimas posições dos tubarões.

#### Para ASP.NET Core (C#)

Adicione este método no seu controller `RastreamentoTubaroesController.cs`:

```csharp
[HttpGet("v1/latest-position")]
[ProducesResponseType(typeof(ApiResponse<RastreamentoTubaroes>), StatusCodes.Status200OK)]
public async Task<IActionResult> GetLatestPositions(
    [FromQuery] int pageNum = 1,
    [FromQuery] int itemsPerPage = 100)
{
    try
    {
        // Query para obter a última posição de cada tubarão
        var latestPositions = await _context.RastreamentoTubaroes
            .GroupBy(r => r.IdTubarao) // Agrupe pelo ID do tubarão
            .Select(g => g.OrderByDescending(r => r.Tempo).FirstOrDefault())
            .Skip((pageNum - 1) * itemsPerPage)
            .Take(itemsPerPage)
            .ToListAsync();

        var totalRecords = await _context.RastreamentoTubaroes
            .Select(r => r.IdTubarao)
            .Distinct()
            .CountAsync();

        var response = new ApiResponse<RastreamentoTubaroes>
        {
            Data = latestPositions,
            Pagination = new PaginationInfo
            {
                PageNum = pageNum,
                ItemsPerPage = itemsPerPage,
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling((double)totalRecords / itemsPerPage)
            }
        };

        return Ok(response);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Erro ao buscar últimas posições dos tubarões");
        return StatusCode(500, "Erro interno do servidor");
    }
}
```

### Opção 2: Usar o Endpoint Existente (Solução Temporária)

Se você não pode modificar o backend agora, use o endpoint de listagem normal com ordenação por data:

#### Modifique o Frontend:

**Arquivo:** `src/services/rastreamentoTubaroesService.ts`

```typescript
static async getLatestposition(): Promise<PaginatedResponse<RastreamentoTubaroes>> {
  try {
    // Usar o endpoint LIST com ordenação por tempo decrescente
    const params = {
      pageNum: 1,
      itemsPerPage: 100,
      orderBy: 'Tempo desc' // Ordenar por tempo decrescente
    }
    
    const url = buildUrl(API_ENDPOINTS.RASTEAMENTO_TUBAROES.LIST, params)
    const apiResponse = await api.get<ApiResponse<RastreamentoTubaroes>>(url)
    
    // Filtrar para obter apenas a última posição de cada tubarão
    const latestByShark = new Map<number, RastreamentoTubaroes>()
    
    apiResponse.data.forEach(item => {
      if (!latestByShark.has(item.Id) || 
          new Date(item.Tempo) > new Date(latestByShark.get(item.Id)!.Tempo)) {
        latestByShark.set(item.Id, item)
      }
    })
    
    const latestPositions = Array.from(latestByShark.values())
    
    return {
      items: latestPositions,
      totalRecords: latestPositions.length,
      pageNum: 1,
      itemsPerPage: latestPositions.length,
      totalPages: 1,
    }
  } catch (error) {
    console.error('Erro ao buscar rastreamento de tubarões:', error)
    throw new Error('Falha ao buscar rastreamento de tubarões')
  }
}
```

### Opção 3: Criar Endpoint Simplificado (Apenas Últimas N Posições)

Se você quer apenas as N últimas posições (não separadas por tubarão):

```csharp
[HttpGet("v1/latest-position")]
public async Task<IActionResult> GetLatestPositions(
    [FromQuery] int pageNum = 1,
    [FromQuery] int itemsPerPage = 100)
{
    try
    {
        var latestPositions = await _context.RastreamentoTubaroes
            .OrderByDescending(r => r.Tempo)
            .Skip((pageNum - 1) * itemsPerPage)
            .Take(itemsPerPage)
            .ToListAsync();

        var totalRecords = await _context.RastreamentoTubaroes.CountAsync();

        var response = new ApiResponse<RastreamentoTubaroes>
        {
            Data = latestPositions,
            Pagination = new PaginationInfo
            {
                PageNum = pageNum,
                ItemsPerPage = itemsPerPage,
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling((double)totalRecords / itemsPerPage)
            }
        };

        return Ok(response);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Erro ao buscar últimas posições");
        return StatusCode(500, "Erro interno do servidor");
    }
}
```

## 🧪 Testando o Endpoint

Depois de adicionar o endpoint no backend, teste com:

```bash
# Testar diretamente
curl http://localhost:5013/api/RastreamentoTubaroes/v1/latest-position

# Ou com parâmetros
curl "http://localhost:5013/api/RastreamentoTubaroes/v1/latest-position?pageNum=1&itemsPerPage=50"
```

## 📝 Estrutura de Resposta Esperada

O endpoint deve retornar no formato:

```json
{
  "data": [
    {
      "id": 1,
      "tempo": "2024-10-05T10:30:00Z",
      "lat": -23.5505,
      "lon": -46.6333,
      "tempCc": 25.5,
      "pForrageio": 0.75,
      "comportamento": "Forrageando",
      "chlorAAmbiente": 0.45,
      "sshaAmbiente": 0.12
    }
  ],
  "pagination": {
    "pageNum": 1,
    "itemsPerPage": 100,
    "totalRecords": 15,
    "totalPages": 1
  }
}
```

## 🔄 Sobre CORS

Se depois de corrigir o endpoint você ainda tiver problemas de CORS, adicione no seu `Program.cs` ou `Startup.cs`:

```csharp
// No Program.cs (ASP.NET Core 6+)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:5173",  // Vite dev server
                "http://localhost:3000"   // Caso use outra porta
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
});

// Antes de app.UseAuthorization()
app.UseCors("AllowFrontend");
```

## ✅ Checklist de Verificação

- [ ] Endpoint `/api/RastreamentoTubaroes/v1/latest-position` criado no backend
- [ ] Endpoint retorna dados no formato correto
- [ ] CORS configurado (se necessário)
- [ ] Testado com curl ou Postman
- [ ] Frontend atualizado (se usar Opção 2)

## 🆘 Ainda com Problemas?

1. **Verifique os logs do backend** - Deve mostrar a requisição chegando
2. **Teste com Postman** - Confirme que o endpoint funciona
3. **Verifique a URL completa** - Use console.log antes da requisição
4. **Confirme a porta e o host** - Verifique `src/config/api.ts`

---

**Depois de implementar a solução, teste acessando:**
```
http://localhost:5173/rastreamento
```

