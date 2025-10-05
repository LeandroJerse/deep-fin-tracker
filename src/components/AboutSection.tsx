import { Heart, Leaf, Fish, Shield } from 'lucide-react';

const AboutSection = () => {
  const reasons = [
    {
      icon: Leaf,
      title: 'Regulação de Presas',
      description: 'Tubarões controlam populações de espécies marinhas, mantendo o equilíbrio ecológico necessário para ecossistemas saudáveis.',
    },
    {
      icon: Fish,
      title: 'Diversidade de Espécies',
      description: 'Como predadores apex, tubarões garantem a biodiversidade oceânica através da regulação da cadeia alimentar.',
    },
    {
      icon: Heart,
      title: 'Indicadores de Saúde',
      description: 'A presença de tubarões indica oceanos saudáveis. Eles removem animais doentes, mantendo populações fortes.',
    },
    {
      icon: Shield,
      title: 'Proteção de Habitats',
      description: 'Identificar hotspots de forrageamento ajuda a proteger áreas críticas de alimentação e reprodução.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Por Que Prever Localização de Tubarões Importa?
          </h2>
          <p className="text-lg text-muted-foreground">
            Tubarões são predadores apex essenciais que regulam populações de presas e mantêm a diversidade de espécies 
            necessária para ecossistemas saudáveis. Identificar onde se alimentam é crucial para proteger habitats importantes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-accent/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <reason.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">
                Dados de Satélites da NASA
              </h3>
              <p className="text-muted-foreground mb-4">
                Utilizamos dados das missões SWOT e PACE para identificar hotspots de forrageamento:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground">SWOT: Detecta redemoinhos oceânicos onde tubarões se alimentam</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground">PACE: Monitora fitoplâncton e comunidades marinhas</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground">Modelo matemático quantifica ligações ecológicas</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground">Previsão de habitats críticos para conservação</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-card rounded-xl p-6 shadow-xl border border-border">
                <div className="text-5xl font-bold text-accent mb-2">SWOT</div>
                <div className="text-muted-foreground">Surface Water Ocean Topography</div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-xl border border-border mt-4">
                <div className="text-5xl font-bold text-accent mb-2">PACE</div>
                <div className="text-muted-foreground">Plankton Aerosol Cloud Ecosystem</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
