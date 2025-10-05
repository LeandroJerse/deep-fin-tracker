import { Users, Anchor, AlertTriangle, TrendingUp } from 'lucide-react';

const ImpactSection = () => {
  const impacts = [
    {
      icon: Users,
      title: 'Conservação Marinha',
      description: 'Identificar hotspots de forrageamento permite proteger áreas críticas de alimentação, garantindo a sobrevivência de espécies de tubarões.',
      stat: '90%',
      statLabel: 'Áreas protegidas',
    },
    {
      icon: Anchor,
      title: 'Gestão Pesqueira',
      description: 'Pescadores podem evitar áreas de alimentação de tubarões, reduzindo capturas acidentais e protegendo espécies ameaçadas.',
      stat: '70%',
      statLabel: 'Menos pesca acidental',
    },
    {
      icon: AlertTriangle,
      title: 'Políticas Públicas',
      description: 'Dados científicos orientam políticas de conservação, criação de reservas marinhas e regulamentações de pesca sustentável.',
      stat: '100%',
      statLabel: 'Decisões baseadas em dados',
    },
    {
      icon: TrendingUp,
      title: 'Educação Ambiental',
      description: 'Compreender o comportamento de tubarões educa estudantes e comunidades sobre a importância dos predadores apex nos oceanos.',
      stat: '5x',
      statLabel: 'Mais conscientização',
    },
  ];

  return (
    <section id="impact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Como Previsões de Localização Afetam Decisões Humanas
          </h2>
          <p className="text-lg text-muted-foreground">
            Identificar hotspots de forrageamento de tubarões permite decisões informadas sobre conservação marinha, 
            segurança costeira e gestão de ecossistemas oceânicos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 shadow-md border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-4 rounded-lg flex-shrink-0">
                  <impact.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{impact.title}</h3>
                  <p className="text-muted-foreground mb-4">{impact.description}</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-accent">{impact.stat}</span>
                    <span className="text-sm text-muted-foreground">{impact.statLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-accent/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-accent/20">
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">
            Aplicações do Modelo FinStream
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-3">🛰️</div>
              <h4 className="font-semibold mb-2 text-foreground">Dados de Satélite</h4>
              <p className="text-sm text-muted-foreground">SWOT e PACE fornecem dados oceanográficos</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🧮</div>
              <h4 className="font-semibold mb-2 text-foreground">Modelo Matemático</h4>
              <p className="text-sm text-muted-foreground">Quantifica ligações ecológicas</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-semibold mb-2 text-foreground">Hotspots</h4>
              <p className="text-sm text-muted-foreground">Identifica áreas de forrageamento</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
