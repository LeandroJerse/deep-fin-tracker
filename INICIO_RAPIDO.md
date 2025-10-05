# 🚀 Início Rápido - Mapa de Rastreamento de Tubarões

## ⚡ 2 Passos para Ver o Mapa Funcionando

### 1️⃣ Inicie o Servidor
```bash
npm run dev
# ou
bun dev
```

### 2️⃣ Acesse a Página
Abra no navegador:
```
http://localhost:5173/rastreamento
```

**Pronto! 🎉** O mapa carregará automaticamente com os dados dos tubarões!

> ✅ **Sem token, sem configuração, 100% gratuito!**  
> Agora usamos **Leaflet + OpenStreetMap** ao invés de Mapbox

---

## 📍 Navegação

### Pela Home Page
1. Acesse: `http://localhost:5173/`
2. Clique no botão **"Ver Mapa Interativo"** na seção azul
3. Você será levado para a página do mapa

### Diretamente
Acesse: `http://localhost:5173/rastreamento`

---

## 🎮 Como Usar o Mapa

### Controles Disponíveis

**Painel Esquerdo (Controles):**
- 🔍 **+** - Ampliar zoom
- 🔍 **-** - Reduzir zoom  
- ⊡ **Reset** - Voltar à visualização inicial
- 🎨 **Filtros** - Filtrar por comportamento (Transitando/Busca/Forrageando)
- 📊 **Estatísticas** - Ver total de tubarões

**Painel Superior Direito:**
- 🔄 **Atualizar** - Buscar novos dados da API

**No Mapa:**
- 🖱️ **Arrastar** - Mover o mapa
- 🖱️ **Scroll** - Zoom in/out
- 🖱️ **Clicar no marcador** - Ver informações detalhadas do tubarão

### Cores dos Marcadores

- 🔵 **Azul** = Transitando
- 🟠 **Laranja** = Busca
- 🟢 **Verde** = Forrageando

---

## 💻 Usando no Código

### Exemplo Simples
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

### Exemplo com Todas as Opções
```tsx
import SharkMapContainer from '@/components/map/SharkMapContainer'

function MinhaPage() {
  return (
    <div className="h-screen">
      <SharkMapContainer
        autoRefresh={true}              // Atualiza automaticamente
        refreshInterval={30000}          // A cada 30 segundos
        onSharkSelect={(shark) => {      // Callback ao clicar
          console.log('Selecionado:', shark)
        }}
      />
    </div>
  )
}
```

---

## 🔧 Solução de Problemas Comuns

### ❌ Problema: Mapa não carrega
**Solução:** Verifique se o token do Mapbox é válido

### ❌ Problema: Sem dados de tubarões
**Solução:** Verifique se a API está rodando e respondendo

### ❌ Problema: Erro de CORS
**Solução:** Configure o CORS no backend

### ❌ Problema: Marcadores não aparecem
**Solução:** Verifique se os dados têm `Lat` e `Lon` válidos

---

## 📚 Documentação Completa

Para mais detalhes, consulte:
- 📖 **Guia Completo:** `GUIA_MAPA_TUBAROES.md`
- 📋 **Resumo Técnico:** `RESUMO_IMPLEMENTACAO.md`
- 🔧 **Docs dos Componentes:** `src/components/map/README.md`

---

## 🆘 Precisa de Ajuda?

1. Leia o `GUIA_MAPA_TUBAROES.md`
2. Verifique a seção de Troubleshooting
3. Consulte a documentação dos componentes

---

**Desenvolvido com 🦈 para você!**

