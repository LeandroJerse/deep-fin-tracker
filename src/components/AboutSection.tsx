import { Heart, Leaf, Fish, Shield } from 'lucide-react';

const AboutSection = () => {
  const reasons = [
    {
      icon: Leaf,
      title: 'Equilíbrio Ecológico',
      description: 'Tubarões mantêm populações de espécies marinhas sob controle, preservando recifes de coral e ecossistemas costeiros saudáveis.',
    },
    {
      icon: Fish,
      title: 'Topo da Cadeia Alimentar',
      description: 'Como predadores apex, tubarões regulam a cadeia alimentar marinha, garantindo a biodiversidade oceânica.',
    },
    {
      icon: Heart,
      title: 'Saúde dos Oceanos',
      description: 'A presença de tubarões indica oceanos saudáveis. Eles removem animais doentes, mantendo populações fortes.',
    },
    {
      icon: Shield,
      title: 'Proteção Costeira',
      description: 'Tubarões protegem recifes e pradarias marinhas que servem como barreiras naturais contra tempestades.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Por Que os Tubarões São Essenciais?
          </h2>
          <p className="text-lg text-muted-foreground">
            Tubarões existem há mais de 400 milhões de anos e são fundamentais para a saúde dos oceanos. 
            Sua conservação é crucial para o equilíbrio do ecossistema marinho global.
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
                A Importância da Previsão
              </h3>
              <p className="text-muted-foreground mb-4">
                Prever a localização e comportamento de tubarões é crucial para:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground">Reduzir conflitos entre humanos e tubarões</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground">Proteger áreas de reprodução e alimentação</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground">Orientar políticas de conservação baseadas em dados</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground">Entender mudanças climáticas e seus impactos</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-card rounded-xl p-6 shadow-xl border border-border">
                <div className="text-5xl font-bold text-accent mb-2">400M+</div>
                <div className="text-muted-foreground">Anos de evolução</div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-xl border border-border mt-4">
                <div className="text-5xl font-bold text-accent mb-2">500+</div>
                <div className="text-muted-foreground">Espécies de tubarões</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
