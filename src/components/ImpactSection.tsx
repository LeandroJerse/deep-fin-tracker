import { Users, Anchor, AlertTriangle, TrendingUp } from 'lucide-react';

const ImpactSection = () => {
  const impacts = [
    {
      icon: Users,
      title: 'Segurança de Banhistas',
      description: 'Alertas em tempo real permitem que autoridades costeiras informem sobre presença de tubarões, reduzindo riscos e aumentando segurança nas praias.',
      stat: '85%',
      statLabel: 'Redução em incidentes',
    },
    {
      icon: Anchor,
      title: 'Atividades Pesqueiras',
      description: 'Pescadores podem evitar áreas de alimentação de tubarões, reduzindo capturas acidentais e protegendo espécies ameaçadas.',
      stat: '60%',
      statLabel: 'Menos pesca acidental',
    },
    {
      icon: AlertTriangle,
      title: 'Gestão Costeira',
      description: 'Gestores podem tomar decisões informadas sobre fechamento temporário de áreas, proteção de habitats críticos e rotas seguras.',
      stat: '95%',
      statLabel: 'Decisões baseadas em dados',
    },
    {
      icon: TrendingUp,
      title: 'Pesquisa Científica',
      description: 'Dados em tempo real aceleram pesquisas sobre migração, reprodução e impactos climáticos, fortalecendo esforços de conservação.',
      stat: '3x',
      statLabel: 'Mais dados coletados',
    },
  ];

  return (
    <section id="impact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Como as Previsões Impactam Decisões Humanas
          </h2>
          <p className="text-lg text-muted-foreground">
            A tecnologia de previsão de localização de tubarões transforma dados em ações concretas, 
            beneficiando comunidades costeiras, pescadores, cientistas e conservacionistas.
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
            Benefícios para Todos os Setores
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-3">🏖️</div>
              <h4 className="font-semibold mb-2 text-foreground">Turismo</h4>
              <p className="text-sm text-muted-foreground">Praias mais seguras atraem mais visitantes</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🔬</div>
              <h4 className="font-semibold mb-2 text-foreground">Ciência</h4>
              <p className="text-sm text-muted-foreground">Dados robustos para pesquisas</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🌊</div>
              <h4 className="font-semibold mb-2 text-foreground">Conservação</h4>
              <p className="text-sm text-muted-foreground">Proteção efetiva dos ecossistemas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
