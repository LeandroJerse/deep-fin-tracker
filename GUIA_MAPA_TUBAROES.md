# 🦈 Guia de Uso - Sistema de Mapa de Rastreamento de Tubarões

## 📋 Resumo

Sistema completo e modular para visualização de rastreamento de tubarões em tempo real utilizando Mapbox GL. O sistema busca automaticamente as últimas posições dos tubarões via API e exibe em um mapa interativo.

## 🎯 Componentes Criados

### Estrutura de Arquivos

```
src/
├── components/
│   └── map/
│       ├── SharkMapContainer.tsx      # Container principal com gerenciamento de estado
│       ├── SharkTrackingMap.tsx       # Componente base do mapa
│       ├── SharkMarker.tsx            # Marcador individual de tubarão
│       ├── SharkInfoPopup.tsx         # Popup com informações detalhadas
│       ├── MapControls.tsx            # Controles de zoom e filtros
│       ├── index.ts                   # Exportações centralizadas
│       └── README.md                  # Documentação detalhada
├── hooks/
│   └── useSharkTracking.ts            # Hook para gerenciar dados do rastreamento
└── pages/
    └── SharkTrackingPage.tsx          # Página de exemplo completa
```

## 🚀 Como Usar

### 1. Uso Simples (Recomendado)

```tsx
import SharkMapContainer from '@/components/map/SharkMapContainer'

function MinhaPage() {
  return (
    <div className="h-screen">
      <SharkMapContainer />
    </div>
  )
}
```

### 2. Uso Avançado com Todas as Opções

```tsx
import SharkMapContainer from '@/components/map/SharkMapContainer'
import { RastreamentoTubaroes } from '@/types/rastreamentoTubaroes'

function MinhaPage() {
  const handleSharkClick = (shark: RastreamentoTubaroes) => {
    console.log('Tubarão selecionado:', shark)
    // Adicione sua lógica aqui
  }

  return (
    <div className="h-screen">
      <SharkMapContainer
        autoRefresh={true}           // Atualização automática
        refreshInterval={60000}      // Atualiza a cada 60 segundos
        onSharkSelect={handleSharkClick}
        className="rounded-lg shadow-xl"
      />
    </div>
  )
}
```

### 3. Usando o Hook Diretamente

```tsx
import { useSharkTracking } from '@/hooks/useSharkTracking'
import SharkTrackingMap from '@/components/map/SharkTrackingMap'

function MeuComponenteCustomizado() {
  const { sharks, loading, error, refetch } = useSharkTracking(true, 30000)

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <div className="h-screen">
      <button onClick={refetch}>Atualizar</button>
      <SharkTrackingMap sharks={sharks} />
    </div>
  )
}
```

## 🔑 Configuração do Token Mapbox

### Passo 1: Obter Token
1. Acesse: https://account.mapbox.com/access-tokens/
2. Crie uma conta gratuita (se não tiver)
3. Crie um novo token público
4. Copie o token

### Passo 2: Inserir no Sistema
1. Ao abrir o mapa pela primeira vez, você verá uma tela de configuração
2. Cole o token do Mapbox no campo indicado
3. Pressione Enter ou clique em "Iniciar Mapa"
4. O mapa será carregado automaticamente

## ✨ Recursos Principais

### 🗺️ Visualização do Mapa
- Mapa base: Satellite Streets (Mapbox)
- Zoom e navegação interativos
- Ajuste automático de bounds para mostrar todos os tubarões
- Escala métrica

### 🎯 Marcadores Inteligentes
- **Cores por Comportamento:**
  - 🔵 Azul: Transitando
  - 🟠 Laranja: Busca
  - 🟢 Verde: Forrageando
- Efeito hover com animação
- Ícone de tubarão integrado
- Popup com informações detalhadas ao clicar

### 🎮 Controles Interativos
- **Zoom:** Ampliar (+), Reduzir (-), Resetar (⊡)
- **Filtros:** Filtrar por comportamento
- **Estatísticas:** Total e filtrados em tempo real
- **Atualização:** Botão de refresh manual

### 📊 Informações Exibidas
Cada tubarão exibe:
- ID único
- Coordenadas (Latitude/Longitude)
- Comportamento atual
- Temperatura da água
- Probabilidade de forrageio
- Clorofila-a ambiente
- SSHA (Sea Surface Height Anomaly)
- Data e hora da última atualização

## 🛠️ Integração com API

O sistema utiliza automaticamente:
- **Serviço:** `RastreamentoTubaroesService.getLatestposition()`
- **Endpoint:** `API_ENDPOINTS.RASTEAMENTO_TUBAROES.LATEST_POSITION`
- **Tipo de retorno:** `PaginatedResponse<RastreamentoTubaroes>`

### Estrutura de Dados Esperada

```typescript
interface RastreamentoTubaroes {
  Id: number              // ID do tubarão
  Tempo: string          // Data/hora do registro
  Lat: number            // Latitude
  Lon: number            // Longitude
  TempCc: number         // Temperatura em °C
  PForrageio: number     // Probabilidade de forrageio (0-1)
  Comportamento: string  // "Transitando" | "Busca" | "Forrageando"
  ChlorAAmbiente: number // Clorofila-a
  SshaAmbiente: number   // SSH Anomaly
}
```

## 📍 Acessar a Página

A página de rastreamento está disponível em:
```
http://localhost:5173/rastreamento
```

Ou no seu domínio de produção:
```
https://seudominio.com/rastreamento
```

## 🎨 Personalização

### Alterar Cores dos Comportamentos

Edite `src/components/map/SharkMarker.tsx`:

```typescript
const getBehaviorColor = (comportamento: string): string => {
  const colors: Record<string, string> = {
    'Transitando': '#3B82F6',  // Sua cor personalizada
    'Busca': '#F59E0B',
    'Forrageando': '#10B981',
  }
  return colors[comportamento] || '#6B7280'
}
```

### Alterar Estilo do Mapa

Edite `src/components/map/SharkTrackingMap.tsx`:

```typescript
const newMap = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/mapbox/dark-v11', // Altere o estilo aqui
  center: [-40, -15],
  zoom: 3,
})
```

Estilos disponíveis:
- `streets-v12` - Ruas
- `outdoors-v12` - Outdoor
- `light-v11` - Claro
- `dark-v11` - Escuro
- `satellite-v9` - Satélite
- `satellite-streets-v12` - Satélite com ruas (atual)

### Alterar Intervalo de Atualização Automática

```tsx
<SharkMapContainer
  autoRefresh={true}
  refreshInterval={120000} // 2 minutos (em milissegundos)
/>
```

## 🔧 Troubleshooting

### Problema: Mapa não carrega
**Solução:** Verifique se o token do Mapbox é válido e público

### Problema: Marcadores não aparecem
**Solução:** Verifique se a API está retornando dados com `Lat` e `Lon` válidos

### Problema: Erro de CORS
**Solução:** Configure o CORS no backend para permitir requisições do frontend

### Problema: Performance lenta com muitos tubarões
**Solução:** Considere implementar clustering (agrupamento) de marcadores

## 📚 Exemplos Adicionais

### Filtrar Tubarões por Temperatura

```tsx
import { useSharkTracking } from '@/hooks/useSharkTracking'

function MapaComFiltroTemperatura() {
  const { sharks } = useSharkTracking()
  
  const sharksQuentes = sharks.filter(s => s.TempCc > 25)
  
  return <SharkTrackingMap sharks={sharksQuentes} />
}
```

### Mostrar Apenas Tubarões Forrageando

```tsx
const sharksForrageando = sharks.filter(
  s => s.Comportamento === 'Forrageando'
)
```

### Adicionar Notificação Sonora

```tsx
const handleSharkSelect = (shark: RastreamentoTubaroes) => {
  // Tocar som
  new Audio('/notification.mp3').play()
  
  // Mostrar notificação
  alert(`Tubarão #${shark.Id} selecionado!`)
}

<SharkMapContainer onSharkSelect={handleSharkSelect} />
```

## 🌟 Próximos Passos

1. **Implementar trajetórias:** Mostrar o caminho percorrido por cada tubarão
2. **Adicionar clustering:** Agrupar marcadores quando houver muitos próximos
3. **Exportar dados:** Permitir download dos dados em CSV/JSON
4. **Análise de padrões:** Gráficos de comportamento ao longo do tempo
5. **Modo offline:** Cache dos dados para visualização sem internet
6. **Heatmap:** Visualização de densidade de tubarões por área

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação em `src/components/map/README.md`
2. Revise os exemplos neste guia
3. Consulte a documentação do Mapbox: https://docs.mapbox.com/

---

**Desenvolvido com ❤️ para rastreamento oceânico**

