# FinStream - NASA Challenge

## Visão Geral

FinStream é uma aplicação web desenvolvida para o desafio da NASA que foca na identificação de hotspots de forrageamento de tubarões usando dados de satélites da NASA. O projeto combina dados das missões SWOT (Surface Water and Ocean Topography) e PACE (Plankton, Aerosols, Clouds, and Ecosystems) para criar um modelo matemático que prevê habitats de alimentação de tubarões.

## Contexto do Desafio

### Background
Tubarões são predadores apex importantes que regulam níveis de presas e garantem a diversidade de espécies necessária para ecossistemas saudáveis. Tubarões também enfrentam pressão de pesca sem precedentes, e determinar onde se alimentam e se movem é crucial para proteger habitats importantes de tubarões.

### Objetivos
- Criar um framework matemático para identificar tubarões e prever seus habitats de forrageamento usando dados de satélites da NASA
- Sugerir um novo modelo conceitual de tag que pode medir não apenas onde os tubarões estão, mas também o que estão comendo
- Transmitir dados em tempo real para usuários para permitir o desenvolvimento de modelos preditivos

## Funcionalidades da Aplicação

### 1. Dashboard de Hotspots de Forrageamento
- Visualização em tempo real de hotspots identificados
- Mapa interativo mostrando localizações de tubarões
- Estatísticas de comportamento e forrageamento
- Filtros por tipo de comportamento (transitando, busca, forrageando)

### 2. Dados Oceanográficos da NASA
- **Dados SWOT**: Visualização de redemoinhos oceânicos, altura da superfície do mar, temperatura e salinidade
- **Dados PACE**: Concentração de clorofila, comunidades fitoplanctônicas e produtividade
- **Hotspots Integrados**: Modelo matemático que combina dados SWOT e PACE para identificar áreas de forrageamento

### 3. Conceito de Tag Inteligente
- Proposta de tag que mede localização, dieta e condições ambientais
- Transmissão de dados em tempo real via satélite
- Sensores de composição química da água
- Detecção de presas consumidas

### 4. Seções Educativas
- Explicação da importância dos tubarões como predadores apex
- Como as previsões de localização afetam decisões humanas
- Aplicações do modelo para conservação marinha e gestão pesqueira

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS
- **Componentes**: Radix UI, Lucide React
- **Visualização**: Recharts, Mapbox GL
- **Roteamento**: React Router DOM
- **Estado**: React Hooks, TanStack Query

## Estrutura do Projeto

```
src/
├── components/
│   ├── Header.tsx              # Navegação principal
│   ├── HeroSection.tsx         # Seção hero com introdução
│   ├── AboutSection.tsx        # Sobre o projeto e dados NASA
│   ├── OceanographicData.tsx   # Visualização de dados SWOT/PACE
│   ├── ConceptSection.tsx      # Conceito de tag inteligente
│   ├── ImpactSection.tsx       # Impacto das previsões
│   ├── SharkMap.tsx           # Mapa de hotspots
│   ├── StatsCard.tsx          # Cards de estatísticas
│   ├── BehaviorChart.tsx      # Gráfico de comportamento
│   └── ForagingChart.tsx      # Gráfico de forrageamento
├── pages/
│   └── Index.tsx              # Página principal
├── types/
│   └── shark.ts               # Tipos TypeScript
└── utils/
    └── mockData.ts            # Dados simulados
```

## Como Executar

1. Instalar dependências:
```bash
npm install
```

2. Executar em modo de desenvolvimento:
```bash
npm run dev
```

3. Construir para produção:
```bash
npm run build
```

## Dados Utilizados

### SWOT (Surface Water and Ocean Topography)
- Redemoinhos oceânicos onde tubarões podem escolher viver
- Altura da superfície do mar (SSH)
- Temperatura e salinidade da superfície

### PACE (Plankton, Aerosols, Clouds, and Ecosystems)
- Fitoplâncton (visível nos dados PACE)
- Concentração de clorofila
- Produtividade primária
- Comunidades fitoplanctônicas

## Modelo Matemático

O modelo considera múltiplos passos tróficos entre fitoplâncton e tubarões, incluindo:
- Variáveis que afetam o comportamento dos tubarões
- Quando os tubarões estão na superfície vs. profundidade
- Papel da temperatura
- Consequências ecológicas de suas localizações e comportamentos

## Público-Alvo

A aplicação é direcionada para:
- Estudantes do ensino médio
- Comunidade em geral
- Cientistas e pesquisadores
- Gestores de conservação marinha
- Pescadores e gestores costeiros

## Contribuições para o Desafio

1. **Identificação de Hotspots**: Modelo que identifica áreas de forrageamento usando dados de satélites
2. **Quantificação de Ligações Ecológicas**: Framework matemático que conecta características oceanográficas físicas, comunidades fitoplanctônicas e padrões de movimento de predadores
3. **Conceito Inovador de Tag**: Proposta de tag que mede dieta em tempo real
4. **Educação**: Interface que explica a importância dos tubarões e como as previsões afetam decisões humanas

## Próximos Passos

- Integração com dados reais da NASA
- Implementação do modelo matemático completo
- Desenvolvimento do protótipo da tag inteligente
- Validação com dados de campo
- Expansão para outras espécies marinhas

## Licença

Este projeto foi desenvolvido para o desafio da NASA e está disponível para fins educacionais e de pesquisa.
