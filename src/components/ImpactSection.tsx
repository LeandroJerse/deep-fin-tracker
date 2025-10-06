import { Users, Anchor, AlertTriangle, TrendingUp } from 'lucide-react';

const ImpactSection = () => {
  const impacts = [
    {
      icon: Users,
      title: 'Marine Conservation',
      description: 'Identifying foraging hotspots allows protecting critical feeding areas, ensuring shark species survival.',
      stat: '90%',
      statLabel: 'Protected areas',
    },
    {
      icon: Anchor,
      title: 'Fisheries Management',
      description: 'Fishermen can avoid shark feeding areas, reducing bycatch and protecting threatened species.',
      stat: '70%',
      statLabel: 'Less bycatch',
    },
    {
      icon: AlertTriangle,
      title: 'Public Policies',
      description: 'Scientific data guides conservation policies, marine reserve creation and sustainable fishing regulations.',
      stat: '100%',
      statLabel: 'Data-driven decisions',
    },
    {
      icon: TrendingUp,
      title: 'Environmental Education',
      description: 'Understanding shark behavior educates students and communities about the importance of apex predators in oceans.',
      stat: '5x',
      statLabel: 'More awareness',
    },
  ];

  return (
    <section id="impact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            How Location Predictions Affect Human Decisions
          </h2>
          <p className="text-lg text-muted-foreground">
            Identifying shark foraging hotspots enables informed decisions about marine conservation, 
            coastal safety and ocean ecosystem management.
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
            FinStream Model Applications
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-3">🛰️</div>
              <h4 className="font-semibold mb-2 text-foreground">Satellite Data</h4>
              <p className="text-sm text-muted-foreground">SWOT and PACE provide oceanographic data</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🧮</div>
              <h4 className="font-semibold mb-2 text-foreground">Mathematical Model</h4>
              <p className="text-sm text-muted-foreground">Quantifies ecological connections</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-semibold mb-2 text-foreground">Hotspots</h4>
              <p className="text-sm text-muted-foreground">Identifies foraging areas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
