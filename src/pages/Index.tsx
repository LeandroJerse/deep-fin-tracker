import { Activity, Waves, Thermometer, TrendingUp, MapPin, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ImpactSection from '@/components/ImpactSection';
import ConceptSection from '@/components/ConceptSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />

      {/* Seção de Acesso ao Mapa de Rastreamento Real */}
      <section id="tracking" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Shark Tracking
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Visualize real shark monitoring data with oceanographic information from the API
              </p>
            </div>
            
            {/* Card de Acesso ao Mapa Real */}
            <div className="max-w-4xl mx-auto">
              <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 border-none shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-[1.02]">
                {/* Padrão decorativo de fundo */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>
                
                <div className="relative p-8 md:p-10">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Ícone destacado */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/30">
                          <MapPin className="h-12 w-12 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Real-Time Interactive Map
                      </h3>
                      <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                        Explore the map with real API data, visualize shark positions, temperature, behavior and updated oceanographic information
                      </p>
                    </div>
                    
                    {/* Botão */}
                    <div className="flex-shrink-0">
                      <Button
                        onClick={() => navigate('/tracking')}
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                      >
                        View Map
                        <Waves className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Badges de recursos */}
                  <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                    <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30">
                      <Activity className="h-3 w-3" />
                      Real API Data
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30">
                      <Thermometer className="h-3 w-3" />
                      Ocean Temperature
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30">
                      <TrendingUp className="h-3 w-3" />
                      Behavior Analysis
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <ConceptSection />
      <ImpactSection />
      <Footer />
    </div>
  );
};

export default Index;
