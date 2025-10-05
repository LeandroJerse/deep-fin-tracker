# Sistema de Mapa de Rastreamento de Tubarões 🦈

Sistema modular e completo para visualização de rastreamento de tubarões utilizando Mapbox GL.

## 📁 Estrutura de Componentes

### 1. `SharkMapContainer` (Componente Principal)
**Responsabilidade:** Gerenciamento de dados e estados do mapa

**Props:**
- `autoRefresh?: boolean` - Ativa atualização automática (padrão: false)
- `refreshInterval?: number` - Intervalo de atualização em ms (padrão: 30000)
- `onSharkSelect?: (shark: RastreamentoTubaroes) => void` - Callback ao selecionar tubarão
- `className?: string` - Classes CSS adicionais

**Exemplo de uso:**
```tsx
import SharkMapContainer from '@/components/map/SharkMapContainer'

function MyPage() {
  return (
    <div className="h-screen">
      <SharkMapContainer
        autoRefresh={true}
        refreshInterval={60000}
        onSharkSelect={(shark) => console.log(shark)}
      />
    </div>
  )
}
```

### 2. `SharkTrackingMap`
**Responsabilidade:** Renderização do mapa base e marcadores

**Props:**
- `sharks: RastreamentoTubaroes[]` - Lista de tubarões a exibir
- `onSharkSelect?: (shark: RastreamentoTubaroes) => void` - Callback de seleção

**Recursos:**
- Configuração de token Mapbox via UI
- Controles de navegação integrados
- Escala e atribuição
- Ajuste automático de bounds

### 3. `SharkMarker`
**Responsabilidade:** Renderização individual de cada marcador de tubarão

**Props:**
- `shark: RastreamentoTubaroes` - Dados do tubarão
- `map: mapboxgl.Map` - Instância do mapa
- `onMarkerClick?: (shark: RastreamentoTubaroes) => void` - Callback de clique

**Características:**
- Cores baseadas em comportamento
- Efeito hover animado
- Popup com informações detalhadas
- Ícone SVG integrado

### 4. `SharkInfoPopup`
**Responsabilidade:** Exibição de informações detalhadas do tubarão

**Props:**
- `shark: RastreamentoTubaroes` - Dados do tubarão

**Informações exibidas:**
- ID do tubarão
- Comportamento (com badge colorido)
- Coordenadas (latitude/longitude)
- Temperatura da água
- Probabilidade de forrageio
- Clorofila-a ambiente
- SSHA (Sea Surface Height Anomaly)
- Data/hora da última atualização

### 5. `MapControls`
**Responsabilidade:** Controles de zoom, filtros e estatísticas

**Props:**
- `onZoomIn: () => void` - Ampliar zoom
- `onZoomOut: () => void` - Reduzir zoom
- `onResetView: () => void` - Resetar visualização
- `onFilterChange: (comportamento: string | null) => void` - Filtrar por comportamento
- `totalSharks: number` - Total de tubarões
- `filteredCount: number` - Tubarões filtrados visíveis

**Funcionalidades:**
- Controles de zoom (+, -, reset)
- Filtros de comportamento
- Estatísticas em tempo real

## 🎣 Hook Customizado

### `useSharkTracking`
**Responsabilidade:** Gerenciamento de estado e busca de dados

**Parâmetros:**
- `autoRefetch?: boolean` - Ativa busca automática
- `refreshInterval?: number` - Intervalo de atualização

**Retorno:**
```tsx
{
  sharks: RastreamentoTubaroes[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  totalRecords: number
}
```

**Exemplo de uso:**
```tsx
import { useSharkTracking } from '@/hooks/useSharkTracking'

function MyComponent() {
  const { sharks, loading, error, refetch } = useSharkTracking(true, 30000)
  
  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>
  
  return <div>{sharks.length} tubarões encontrados</div>
}
```

## 🎨 Esquema de Cores

### Comportamentos:
- **Transitando:** Azul (`#3B82F6`)
- **Busca:** Laranja (`#F59E0B`)
- **Forrageando:** Verde (`#10B981`)

## 🚀 Início Rápido

### 1. Obter Token do Mapbox
- Acesse: https://account.mapbox.com/access-tokens/
- Crie um token público gratuito
- Copie o token

### 2. Usar o Componente
```tsx
import SharkMapContainer from '@/components/map/SharkMapContainer'

export default function App() {
  return (
    <div className="h-screen p-4">
      <SharkMapContainer />
    </div>
  )
}
```

### 3. Configurar o Token
- Ao abrir o mapa pela primeira vez, cole o token na interface
- O token será armazenado no estado do componente

## 📊 Integração com Serviços

O sistema utiliza automaticamente o serviço `RastreamentoTubaroesService.getLatestposition()` para buscar as posições mais recentes dos tubarões.

## 🔧 Dependências

- `mapbox-gl` - Biblioteca de mapas
- `react` - Framework UI
- `lucide-react` - Ícones
- `@/components/ui/*` - Componentes shadcn/ui

## 📝 Notas Importantes

1. **Token Mapbox:** É necessário um token válido do Mapbox para visualizar o mapa
2. **Coordenadas:** O sistema usa diretamente `Lat` e `Lon` do tipo `RastreamentoTubaroes`
3. **Performance:** Os marcadores são gerenciados eficientemente com cleanup automático
4. **Responsividade:** Todos os componentes são responsivos e mobile-friendly

## 🎯 Recursos Futuros

- [ ] Histórico de trajetória dos tubarões
- [ ] Agrupamento de marcadores (clustering)
- [ ] Exportação de dados em diferentes formatos
- [ ] Análise de padrões de comportamento
- [ ] Notificações de alertas
- [ ] Modo offline com cache
- [ ] Visualização de heatmap

