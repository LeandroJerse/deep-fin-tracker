import { useState, useEffect } from 'react';
import { Activity, Waves, Thermometer, TrendingUp, MapPin, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ImpactSection from '@/components/ImpactSection';
import ConceptSection from '@/components/ConceptSection';
import OceanographicData from '@/components/OceanographicData';
import Footer from '@/components/Footer';
import SharkMap from '@/components/SharkMap';
import StatsCard from '@/components/StatsCard';
import BehaviorChart from '@/components/BehaviorChart';
import ForagingChart from '@/components/ForagingChart';
import { generateMockSharkData } from '@/utils/mockData';
import { SharkData } from '@/types/shark';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const [sharks, setSharks] = useState<SharkData[]>([]);
  const [selectedBehavior, setSelectedBehavior] = useState<number | undefined>(undefined);
  const [isLive, setIsLive] = useState(false);

  // Initialize with mock data
  useEffect(() => {
    setSharks(generateMockSharkData(8));
  }, []);

  // Simulate real-time updates when live mode is on
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setSharks(generateMockSharkData(8));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const avgForaging = sharks.length > 0
    ? (sharks.reduce((sum, s) => sum + s.p_forrageio, 0) / sharks.length * 100).toFixed(0)
    : '0';

  const avgTemp = sharks.length > 0
    ? (sharks.reduce((sum, s) => sum + s.temp_cC, 0) / sharks.length / 100).toFixed(1)
    : '0';

  const activeCount = sharks.filter(s => s.comportamento === 2).length;

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />

      {/* Dashboard Section */}
      <section id="dashboard" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Análise de Hotspots de Forrageamento
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Modelo matemático baseado em dados de satélites SWOT e PACE para identificar áreas de alimentação de tubarões
              </p>
              
              {/* Card de Acesso ao Mapa Real */}
              <div className="mb-8 max-w-4xl mx-auto">
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
                          Rastreamento em Tempo Real
                        </h3>
                        <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                          Explore o mapa interativo com dados reais da API, visualize posições dos tubarões e informações oceanográficas em tempo real
                        </p>
                      </div>
                      
                      {/* Botão */}
                      <div className="flex-shrink-0">
                        <Button
                          onClick={() => navigate('/rastreamento')}
                          size="lg"
                          className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                        >
                          Ver Mapa
                          <Waves className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Badges de recursos */}
                    <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                      <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30">
                        <Activity className="h-3 w-3" />
                        Dados Reais
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30">
                        <Thermometer className="h-3 w-3" />
                        Temperatura
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30">
                        <TrendingUp className="h-3 w-3" />
                        Comportamento
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex justify-center gap-4 flex-wrap">
                <Button
                  onClick={() => setIsLive(!isLive)}
                  variant={isLive ? "default" : "outline"}
                  className="flex items-center gap-2"
                >
                  <Activity className={`w-4 h-4 ${isLive ? 'animate-pulse' : ''}`} />
                  {isLive ? 'Simulação Ativa' : 'Iniciar Simulação'}
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedBehavior(undefined)}
                    variant={selectedBehavior === undefined ? "default" : "outline"}
                    size="sm"
                  >
                    Todos
                  </Button>
                  <Button
                    onClick={() => setSelectedBehavior(0)}
                    variant={selectedBehavior === 0 ? "default" : "outline"}
                    size="sm"
                  >
                    Transitando
                  </Button>
                  <Button
                    onClick={() => setSelectedBehavior(1)}
                    variant={selectedBehavior === 1 ? "default" : "outline"}
                    size="sm"
                  >
                    Busca
                  </Button>
                  <Button
                    onClick={() => setSelectedBehavior(2)}
                    variant={selectedBehavior === 2 ? "default" : "outline"}
                    size="sm"
                  >
                    Forrageando
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Tubarões Monitorados"
                value={sharks.length}
                subtitle={isLive ? 'Simulando...' : 'Dados do modelo'}
                icon={Waves}
                trend={isLive ? 'neutral' : undefined}
              />
              <StatsCard
                title="Forrageando Ativamente"
                value={activeCount}
                subtitle={`${((activeCount / sharks.length) * 100).toFixed(0)}% do total`}
                icon={Activity}
                trend="up"
              />
              <StatsCard
                title="Média de Forrageio"
                value={`${avgForaging}%`}
                subtitle="Probabilidade média"
                icon={TrendingUp}
              />
              <StatsCard
                title="Temperatura Média"
                value={`${avgTemp}°C`}
                subtitle="Água superficial"
                icon={Thermometer}
              />
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-8">
              <BehaviorChart sharks={sharks} />
              <ForagingChart sharks={sharks} />
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <OceanographicData />
      <ConceptSection />
      <ImpactSection />
      <Footer />

      {/* Botão Flutuante de Teste de API */}
      <Button
        onClick={() => navigate('/api-test')}
        className="fixed bottom-6 right-6 rounded-full shadow-2xl h-14 w-14 p-0 bg-slate-800 hover:bg-slate-700 z-50"
        title="Testar API"
      >
        <Settings className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Index;
