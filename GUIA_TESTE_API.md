# 🔧 Guia de Teste de API

## 🎯 Página de Diagnóstico Criada!

Criei uma página completa de diagnóstico para testar a conexão com a API.

## 🚀 Como Usar

### Acesse a Página de Testes:
```
http://localhost:5173/api-test
```

### Ou via navegação do app:
Adicione um link na sua interface para redirecionar para `/api-test`

## ✨ Recursos da Página de Teste

### 1. **Teste de Conectividade Básica**
- Verifica se o servidor backend está acessível
- Mostra tempo de resposta
- Detecta problemas de rede

### 2. **Teste do Endpoint Info**
- Testa especificamente `/api/Info/v1`
- Verifica se o endpoint está respondendo
- Mostra a resposta completa

### 3. **Teste de Lista de Tubarões**
- Testa `/api/RastreamentoTubaroes/v1`
- Verifica se os dados de tubarões estão acessíveis
- Mostra quantos registros retornaram

### 4. **Teste de Últimas Posições**
- Testa `/api/RastreamentoTubaroes/v1/latest-position`
- Verifica o endpoint usado pelo mapa
- Identifica problemas específicos deste endpoint

## 📊 Informações Exibidas

Para cada teste, você verá:
- ✅ Status (OK ou FALHOU)
- 🔗 Endpoint completo testado
- ⏱️ Tempo de resposta em milissegundos
- 📋 Status code HTTP (200, 404, 500, etc.)
- ❌ Mensagem de erro (se houver)
- 📄 Dados da resposta (expansível)

## 🎨 Interface

A página mostra:
- **Card de Configuração:** Base URL, ambiente, timeout
- **Cards de Teste:** Um para cada endpoint
- **Diagnóstico Geral:** Resumo de todos os problemas
- **Soluções Sugeridas:** O que fazer se algo falhar

## 🔍 Como Interpretar os Resultados

### ✅ Tudo Verde (OK)
```
✓ Conectividade Básica: OK (50ms)
✓ Endpoint Info: OK (120ms)
✓ Lista de Tubarões: OK (200ms)
✓ Últimas Posições: OK (180ms)
```
**Resultado:** API está funcionando perfeitamente!

### ❌ Conectividade Falhou
```
✗ Conectividade Básica: FALHOU
Erro: Failed to fetch
```
**Problema:** Backend não está rodando ou URL está errada
**Solução:** 
1. Inicie o backend
2. Verifique a URL em `src/config/api.ts`

### ❌ Endpoint Info Falhou (404)
```
✗ Endpoint Info: FALHOU
Status: 404
```
**Problema:** Endpoint `/api/Info/v1` não existe no backend
**Solução:** 
1. Crie o endpoint no backend
2. Ou teste outro endpoint que você sabe que existe

### ❌ CORS Error
```
✗ Endpoint Info: FALHOU
Erro: CORS policy blocked
```
**Problema:** CORS não está configurado
**Solução:** Configure CORS no backend (ver `CONFIGURAR_CORS_BACKEND.md`)

### ❌ Timeout
```
✗ Lista de Tubarões: FALHOU
Tempo: 10000ms
Erro: Timeout
```
**Problema:** Requisição muito lenta
**Solução:**
1. Otimize a query no backend
2. Aumente o timeout em `src/config/api.ts`

## 🛠️ Usar no Console do Navegador

Você também pode testar programaticamente:

```javascript
// Abra o console (F12) e execute:

// Teste individual do endpoint Info
const result = await ApiTestService.testInfoEndpoint()
console.log(result)

// Executar todos os testes
const allResults = await ApiTestService.runAllTests()
console.log(allResults)

// Teste de CORS
const corsTest = await ApiTestService.testCORS()
console.log(corsTest)
```

## 📝 Criar o Endpoint Info no Backend

Se o endpoint `/api/Info/v1` não existe, crie no backend:

### ASP.NET Core:

```csharp
[ApiController]
[Route("api/[controller]")]
public class InfoController : ControllerBase
{
    [HttpGet("v1")]
    public IActionResult GetInfo()
    {
        return Ok(new
        {
            name = "Deep Fin Tracker API",
            version = "1.0.0",
            status = "online",
            timestamp = DateTime.UtcNow,
            environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
        });
    }
}
```

## 🔄 Teste Individual

Cada card de teste tem um botão de refresh (🔄) que permite testar apenas aquele endpoint específico, sem executar todos os outros.

## 📊 Exportar Resultados

Os resultados dos testes aparecem no console do navegador (F12) com todos os detalhes em formato JSON, permitindo copiar e compartilhar.

## 🎯 Casos de Uso

### 1. Primeira Configuração
Use a página para verificar se a API está configurada corretamente antes de usar o sistema.

### 2. Debugging
Quando algo não funciona, use para identificar qual endpoint específico está com problema.

### 3. Monitoramento
Execute periodicamente para garantir que a API está saudável.

### 4. Documentação
Compartilhe com a equipe para mostrar quais endpoints existem e como estão respondendo.

## ⚡ Atalho Rápido

Adicione este botão em qualquer página:

```tsx
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function MyComponent() {
  const navigate = useNavigate()
  
  return (
    <Button onClick={() => navigate('/api-test')}>
      Testar API
    </Button>
  )
}
```

---

**🎉 Agora você tem uma ferramenta completa de diagnóstico de API!**

Acesse: **http://localhost:5173/api-test**

