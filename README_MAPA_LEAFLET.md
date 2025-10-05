# 🗺️ Mapa de Tubarões com Leaflet

## 🎯 Visão Geral

Sistema de mapa interativo para rastreamento de tubarões usando **Leaflet** - 100% gratuito e open source.

## ⚡ Início Rápido

### 1. O mapa já funciona!
Não precisa de token, configuração ou cadastro. Apenas acesse:

```
http://localhost:5173/rastreamento
```

### 2. Características

#### 🎨 Visual
- Marcadores coloridos por comportamento
- Popups informativos ao clicar
- Animações suaves
- Design responsivo

#### 🎮 Interativo
- Zoom com scroll do mouse
- Arrastar para navegar
- Clique para ver detalhes
- Filtros por comportamento

#### 📊 Dados
- Coordenadas (Lat/Lon)
- Temperatura da água
- Probabilidade de forrageio
- Clorofila-a ambiente
- SSHA
- Data/hora da última posição

## 🛠️ Tecnologias

- **Leaflet 1.9.4** - Biblioteca de mapas
- **OpenStreetMap** - Dados de mapas
- **React** - Interface
- **TypeScript** - Tipagem

## 📦 Componentes

### LeafletMap
Componente principal do mapa

```tsx
import LeafletMap from '@/components/map/LeafletMap'

<LeafletMap 
  sharks={tubaroes}
  onSharkSelect={(shark) => console.log(shark)}
  selectedBehavior="Forrageando"
/>
```

**Props:**
- `sharks` - Array de tubarões
- `onSharkSelect?` - Callback ao clicar
- `selectedBehavior?` - Filtro de comportamento

### SharkTrackingMap
Container com controles

```tsx
import SharkTrackingMap from '@/components/map/SharkTrackingMap'

<SharkTrackingMap 
  sharks={tubaroes}
  onSharkSelect={(shark) => console.log(shark)}
/>
```

### SharkMapContainer
Solução completa com dados

```tsx
import SharkMapContainer from '@/components/map/SharkMapContainer'

<SharkMapContainer 
  autoRefresh={true}
  refreshInterval={30000}
/>
```

## 🎨 Customização

### Mudar Estilo do Mapa

Edite `src/components/map/LeafletMap.tsx`:

```typescript
// Mapas disponíveis (todos gratuitos!)

// 1. OpenStreetMap (padrão)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

// 2. Satélite Esri (GRÁTIS!)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')

// 3. CartoDB Positron (minimalista)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png')

// 4. CartoDB Dark (escuro)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png')

// 5. OpenTopoMap (topográfico)
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png')
```

### Mudar Cores dos Marcadores

```typescript
const getBehaviorColor = (comportamento: string): string => {
  const colors: Record<string, string> = {
    'Transitando': '#3B82F6',  // Sua cor aqui
    'Busca': '#F59E0B',
    'Forrageando': '#10B981',
  }
  return colors[comportamento] || '#6B7280'
}
```

### Ajustar Zoom Inicial

```typescript
const map = L.map(mapContainer.current, {
  center: [-15, -40],  // [Latitude, Longitude]
  zoom: 4,             // Nível de zoom (1-20)
  zoomControl: true,
})
```

## 🌟 Recursos Avançados

### 1. Adicionar Camadas

```typescript
const streetMap = L.tileLayer('...')
const satellite = L.tileLayer('...')

const baseMaps = {
  "Ruas": streetMap,
  "Satélite": satellite
}

L.control.layers(baseMaps).addTo(map)
```

### 2. Mapa de Calor (opcional)

```bash
npm install leaflet.heat
```

```typescript
import 'leaflet.heat'

const heatData = sharks.map(s => [s.Lat, s.Lon, s.PForrageio])
L.heatLayer(heatData).addTo(map)
```

### 3. Clustering (opcional)

```bash
npm install leaflet.markercluster
```

```typescript
import 'leaflet.markercluster'

const markers = L.markerClusterGroup()
// Adicionar marcadores ao cluster
map.addLayer(markers)
```

## 📱 Mobile

Funciona perfeitamente em dispositivos móveis:
- Touch para arrastar
- Pinça para zoom
- Tap para informações
- Responsivo

## ⚡ Performance

### Otimizações Implementadas
- Remoção automática de marcadores antigos
- Bounds calculados eficientemente
- Renderização otimizada
- CSS com GPU acceleration

### Suporta
- Milhares de marcadores
- Updates em tempo real
- Múltiplos mapas na mesma página

## 🔧 Troubleshooting

### Marcadores não aparecem
**Solução:** Verifique se as coordenadas estão corretas (Lat/Lon)

### Mapa cinza
**Solução:** Verifique a conexão com internet (OpenStreetMap precisa de internet)

### CSS quebrado
**Solução:** Certifique-se que o CSS do Leaflet está importado em `main.tsx`

### Ícones não carregam
**Solução:** Já corrigido no código com CDN do Leaflet

## 🌍 Modos Offline (Futuro)

Para funcionar offline:
1. Use `leaflet-offline` plugin
2. Baixe tiles antecipadamente
3. Armazene em IndexedDB
4. Funcione sem internet

## 📚 Recursos

### Documentação
- **Leaflet:** https://leafletjs.com/reference.html
- **Tutorial:** https://leafletjs.com/examples.html
- **Plugins:** https://leafletjs.com/plugins.html

### Mapas Gratuitos
- **OpenStreetMap:** https://www.openstreetmap.org/
- **Thunderforest:** https://www.thunderforest.com/ (gratuito com limite)
- **Stamen:** http://maps.stamen.com/ (gratuito)
- **CartoDB:** https://carto.com/basemaps/ (gratuito)

### Comunidade
- **GitHub:** https://github.com/Leaflet/Leaflet
- **Stack Overflow:** Tag `leaflet`
- **Fórum:** https://gis.stackexchange.com/

## 🎯 Exemplos de Uso

### Zoom em Tubarão Específico
```typescript
const focusShark = (shark: RastreamentoTubaroes) => {
  if (mapRef.current) {
    mapRef.current.setView([shark.Lat, shark.Lon], 12)
  }
}
```

### Desenhar Trajetória
```typescript
const trajectory = sharks.map(s => [s.Lat, s.Lon])
const polyline = L.polyline(trajectory, { color: 'blue' }).addTo(map)
```

### Adicionar Área de Interesse
```typescript
const circle = L.circle([-15, -40], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50000 // metros
}).addTo(map)
```

## ✅ Checklist

- [x] Mapa funciona sem token
- [x] Marcadores coloridos
- [x] Popups informativos
- [x] Filtros de comportamento
- [x] Responsivo
- [x] Performance otimizada
- [x] CSS customizado
- [x] TypeScript completo
- [x] Documentado

## 🎉 Pronto!

Teste agora: **http://localhost:5173/rastreamento**

---

**🌟 Mapa 100% grátis, open source e sem limites!**

