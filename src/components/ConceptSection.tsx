import { Satellite, Brain, Zap, Database } from 'lucide-react';

const ConceptSection = () => {
  const concepts = [
    {
      icon: Satellite,
      title: 'Tag Inteligente Conceitual',
      description: 'Proposta de um novo tipo de tag que mede não apenas localização, mas também o que os tubarões estão comendo, transmitindo dados em tempo real.',
      features: [
        'Sensores de composição química da água',
        'Detecção de presas consumidas',
        'Transmissão via satélite em tempo real',
        'Bateria de longa duração'
      ]
    },
    {
      icon: Brain,
      title: 'Modelo de Comportamento',
      description: 'Framework matemático que considera múltiplos passos tróficos entre fitoplâncton (PACE) e tubarões, incluindo variáveis como temperatura e profundidade.',
      features: [
        'Análise de cadeia alimentar',
        'Fatores oceanográficos',
        'Padrões de migração',
        'Comportamento de forrageamento'
      ]
    },
    {
      icon: Zap,
      title: 'Previsão em Tempo Real',
      description: 'Sistema que combina dados de satélites SWOT e PACE com modelos de IA para prever hotspots de forrageamento e comportamento de tubarões.',
      features: [
        'Dados SWOT para redemoinhos',
        'Dados PACE para fitoplâncton',
        'Algoritmos de machine learning',
        'Alertas preditivos'
      ]
    }
  ];

  return (
    <section id="concept" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Conceito Inovador: Tag Inteligente
          </h2>
          <p className="text-lg text-muted-foreground">
            Proposta de um novo conceito de tag que vai além do rastreamento tradicional, 
            medindo também a dieta dos tubarões e transmitindo dados em tempo real para 
            desenvolvimento de modelos preditivos.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {concepts.map((concept, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <concept.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{concept.title}</h3>
              <p className="text-muted-foreground mb-6">{concept.description}</p>
              <ul className="space-y-2">
                {concept.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-xs">✓</span>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">
                Por Que Esta Abordagem é Revolucionária?
              </h3>
              <p className="text-muted-foreground mb-6">
                Tradicionalmente, tags de tubarões apenas rastreiam localização. Nossa proposta 
                inovadora mede também a dieta, criando um perfil completo do comportamento 
                alimentar em tempo real.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Database className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Dados Multidimensionais</h4>
                    <p className="text-sm text-muted-foreground">Localização + dieta + condições ambientais</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Zap className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Transmissão em Tempo Real</h4>
                    <p className="text-sm text-muted-foreground">Dados instantâneos para modelos preditivos</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Brain className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">IA Preditiva</h4>
                    <p className="text-sm text-muted-foreground">Modelos que aprendem e melhoram continuamente</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🏷️</div>
                <h4 className="text-xl font-bold text-foreground mb-2">Tag do Futuro</h4>
                <p className="text-muted-foreground">
                  Medindo localização, dieta e comportamento em tempo real
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
