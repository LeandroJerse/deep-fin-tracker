import { Waves, Activity, MapPin } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary via-primary to-secondary">
      {/* Animated waves background */}
      <div className="absolute inset-0 opacity-10">
        <Waves className="absolute top-20 left-10 w-32 h-32 animate-wave" />
        <Waves className="absolute bottom-40 right-20 w-24 h-24 animate-float" />
        <Waves className="absolute top-1/2 left-1/4 w-20 h-20 animate-wave" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
            FinStream
            <span className="block text-accent mt-2">NASA Challenge</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Identificando hotspots de forrageamento de tubarões usando dados de satélites da NASA (SWOT e PACE). 
            Modelo matemático para prever habitats de alimentação e quantificar ligações ecológicas.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <Activity className="w-5 h-5 text-accent" />
              <span className="text-primary-foreground font-medium">Dados SWOT</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-primary-foreground font-medium">Dados PACE</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <Waves className="w-5 h-5 text-accent" />
              <span className="text-primary-foreground font-medium">Hotspots</span>
            </div>
          </div>

          <button
            onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Explorar Hotspots de Forrageamento
          </button>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="hsl(var(--background))"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
