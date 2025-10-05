import { useState, useEffect } from 'react';
import { Activity, Waves, Thermometer, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ImpactSection from '@/components/ImpactSection';
import Footer from '@/components/Footer';
import SharkMap from '@/components/SharkMap';
import StatsCard from '@/components/StatsCard';
import BehaviorChart from '@/components/BehaviorChart';
import ForagingChart from '@/components/ForagingChart';
import { generateMockSharkData } from '@/utils/mockData';
import { SharkData } from '@/types/shark';
import { Button } from '@/components/ui/button';

const Index = () => {
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
                Dashboard em Tempo Real
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Monitoramento ao vivo de tubarões com telemetria via satélite e previsões por IA
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Button
                  onClick={() => setIsLive(!isLive)}
                  variant={isLive ? "default" : "outline"}
                  className="flex items-center gap-2"
                >
                  <Activity className={`w-4 h-4 ${isLive ? 'animate-pulse' : ''}`} />
                  {isLive ? 'Modo Ao Vivo (Ativo)' : 'Ativar Modo Ao Vivo'}
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
                subtitle={isLive ? 'Atualizando...' : 'Dados simulados'}
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

            {/* Map */}
            <div className="mb-8">
              <div className="bg-card rounded-lg p-6 shadow-md border border-border">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Localização dos Tubarões</h3>
                <div className="h-[500px] rounded-lg overflow-hidden">
                  <SharkMap sharks={sharks} selectedBehavior={selectedBehavior} />
                </div>
                <div className="mt-4 flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                    <span className="text-sm text-muted-foreground">Transitando</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white"></div>
                    <span className="text-sm text-muted-foreground">Busca</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                    <span className="text-sm text-muted-foreground">Forrageando</span>
                  </div>
                </div>
              </div>
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
      <ImpactSection />
      <Footer />
    </div>
  );
};

export default Index;
