# 🔍 Guia de Debug - Coordenadas dos Tubarões

## 📊 Logs Adicionados

Adicionei logs detalhados em todo o fluxo de dados para diagnosticar o problema das coordenadas.

## 🔎 Como Usar

### 1. Abra o Console do Navegador
```
Pressione F12 → Aba "Console"
```

### 2. Acesse a Página de Rastreamento
```
http://localhost:5173/rastreamento
```

### 3. Observe os Logs

Os logs aparecem em ordem cronológica:

## 📋 Ordem dos Logs

### 1️⃣ SERVICE - Chamada à API
```
🔍 [SERVICE] Buscando dados da API: http://localhost:5013/api/...
```
**O que verificar:** URL está correta?

### 2️⃣ SERVICE - Resposta da API
```
📊 [SERVICE] Resposta completa da API: {...}
📦 [SERVICE] apiResponse.data: [...]
📈 [SERVICE] Quantidade de registros: 10
🔢 [SERVICE] Pagination: {...}
```
**O que verificar:** 
- `apiResponse.data` tem dados?
- Quantidade de registros > 0?

### 3️⃣ SERVICE - Primeiro Tubarão
```
🦈 [SERVICE] Primeiro tubarão retornado: {...}
🔑 [SERVICE] Chaves do primeiro tubarão: ["Id", "Tempo", "Lat", ...]
📍 [SERVICE] Coordenadas do primeiro:
   - Lat: -23.5505 number
   - Lon: -46.6333 number
```
**O que verificar:**
- As chaves incluem `Lat` e `Lon`? (com essa capitalização exata)
- Os valores são números?
- Os valores não são `undefined` ou `null`?

### 4️⃣ SERVICE - Resultado Final
```
✅ [SERVICE] Retornando resultado: { items: [...], totalRecords: 10, ... }
```
**O que verificar:** `items` array tem dados?

### 5️⃣ MAP - Dados Recebidos
```
🗺️ LeafletMap - Atualizando marcadores
📊 Total de tubarões recebidos: 10
🦈 Dados dos tubarões: [...]
```
**O que verificar:** Número de tubarões recebidos > 0?

### 6️⃣ MAP - Primeiro Tubarão
```
📍 Primeiro tubarão completo: {...}
🔑 Chaves do objeto: ["Id", "Tempo", "Lat", ...]
📐 Lat do primeiro: -23.5505
📐 Lon do primeiro: -46.6333
```
**O que verificar:** `Lat` e `Lon` têm valores válidos?

### 7️⃣ MAP - Processamento Individual
```
🦈 Processando tubarão 1:
  - Objeto completo: {...}
  - Id: 1
  - Lat: -23.5505 (tipo: number)
  - Lon: -46.6333 (tipo: number)
  - Comportamento: Forrageando
```
**O que verificar:** Tipo é `number` e não `undefined`?

### 8️⃣ MAP - Validação
```
✅ Coordenadas válidas! Criando marcador...
```
OU
```
❌ Tubarão #1 tem coordenadas inválidas: undefined undefined
   Todas as propriedades: [["Id", 1], ["Tempo", "..."], ...]
```

## 🔍 Cenários Possíveis

### ✅ Cenário 1: Tudo OK
```
🔍 [SERVICE] Buscando dados...
📊 [SERVICE] Resposta completa...
🦈 [SERVICE] Primeiro tubarão: { Id: 1, Lat: -23.5, Lon: -46.6, ... }
📍 [SERVICE] Coordenadas: Lat: -23.5 number, Lon: -46.6 number
✅ [SERVICE] Retornando resultado...
🗺️ LeafletMap - Atualizando marcadores
📊 Total de tubarões: 10
📐 Lat: -23.5, Lon: -46.6
🦈 Processando tubarão 1...
✅ Coordenadas válidas! Criando marcador...
```
**Resultado:** Marcadores aparecem no mapa ✅

### ❌ Cenário 2: Nomes de Campos Diferentes
```
🔑 [SERVICE] Chaves: ["id", "tempo", "latitude", "longitude", ...]
📍 [SERVICE] Coordenadas:
   - Lat: undefined undefined
   - Lon: undefined undefined
```
**Problema:** API retorna `latitude` e `longitude` ao invés de `Lat` e `Lon`

**Solução:** Precisamos mapear os campos no serviço

### ❌ Cenário 3: Dados Aninhados
```
🦈 [SERVICE] Primeiro tubarão: { data: { Id: 1, Lat: -23.5, ... } }
🔑 [SERVICE] Chaves: ["data"]
📍 [SERVICE] Coordenadas:
   - Lat: undefined undefined
```
**Problema:** Dados estão dentro de um objeto `data`

**Solução:** Precisamos acessar `shark.data.Lat`

### ❌ Cenário 4: Coordenadas como String
```
📍 [SERVICE] Coordenadas:
   - Lat: "-23.5505" string
   - Lon: "-46.6333" string
```
**Problema:** API retorna strings ao invés de números

**Solução:** Converter para número: `Number(shark.Lat)`

### ❌ Cenário 5: API Retorna Vazio
```
📦 [SERVICE] apiResponse.data: []
📈 [SERVICE] Quantidade: 0
```
**Problema:** API não tem dados ou endpoint errado

**Solução:** Verificar backend e endpoint

## 🛠️ Próximos Passos

### Depois de Ver os Logs:

#### 1. Se os campos têm nomes diferentes:
Exemplo: API retorna `latitude` ao invés de `Lat`

**Adicionar mapeamento no serviço:**
```typescript
items: apiResponse.data.map(item => ({
  Id: item.id,
  Lat: item.latitude,
  Lon: item.longitude,
  TempCc: item.temperatura,
  // ... outros campos
}))
```

#### 2. Se são strings:
```typescript
items: apiResponse.data.map(item => ({
  ...item,
  Lat: Number(item.Lat),
  Lon: Number(item.Lon),
  TempCc: Number(item.TempCc),
  // ...
}))
```

#### 3. Se estão aninhados:
```typescript
items: apiResponse.data.map(item => item.data || item)
```

## 📸 Como Compartilhar Logs

### Opção 1: Screenshot
1. F12 → Console
2. Print Screen
3. Compartilhe a imagem

### Opção 2: Copiar Logs
1. Clique com botão direito no console
2. "Save as..."
3. Compartilhe o arquivo

### Opção 3: Copiar Texto
1. Selecione os logs
2. Ctrl+C
3. Cole em um documento

## 🎯 O Que Procurar

### ✅ Sinais de Sucesso:
- ✅ Logs do SERVICE aparecem
- ✅ `apiResponse.data` tem array com dados
- ✅ Chaves incluem "Lat" e "Lon"
- ✅ Valores são numbers, não undefined
- ✅ Logs "Coordenadas válidas!"

### ❌ Sinais de Problema:
- ❌ `apiResponse.data` é `[]` ou `undefined`
- ❌ Chaves diferentes: "latitude", "lat", etc
- ❌ Valores são `undefined`, `null` ou strings
- ❌ Logs "coordenadas inválidas"
- ❌ Erro 404, 500 na requisição

## 🔄 Testar Diferentes Cenários

### 1. Página Principal
```
http://localhost:5173/rastreamento
```

### 2. Com Filtros
Clique nos filtros de comportamento e veja os logs

### 3. Atualização
Clique em "Atualizar" e veja se os logs aparecem novamente

## 📞 Próximas Ações

1. **Execute o sistema** e veja os logs
2. **Copie os logs** relevantes
3. **Identifique** qual cenário se aplica
4. **Compartilhe** os logs para análise
5. **Aplicarei** a correção específica

---

**🔍 Execute agora e me mostre os logs do console!**

Os logs vão revelar exatamente o que a API está retornando e por que as coordenadas aparecem como `undefined`.

