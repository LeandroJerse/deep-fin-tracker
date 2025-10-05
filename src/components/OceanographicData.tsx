import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Satellite, Waves, Thermometer, Fish } from 'lucide-react';

const OceanographicData = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-01');

  // Mock data for SWOT (Surface Water Ocean Topography)
  const swotData = {
    eddies: [
      { id: 1, lat: -23.5, lon: -45.2, intensity: 0.8, type: 'Cyclonic', radius: 15 },
      { id: 2, lat: -24.1, lon: -44.8, intensity: 0.6, type: 'Anticyclonic', radius: 12 },
      { id: 3, lat: -23.8, lon: -45.5, intensity: 0.9, type: 'Cyclonic', radius: 18 },
    ],
    ssh: 0.15, // Sea Surface Height anomaly
    temperature: 24.5,
    salinity: 35.2
  };

  // Mock data for PACE (Plankton, Aerosol, Cloud, Ecosystem)
  const paceData = {
    chlorophyll: [
      { lat: -23.5, lon: -45.2, concentration: 0.8, depth: 10 },
      { lat: -24.1, lon: -44.8, concentration: 1.2, depth: 15 },
      { lat: -23.8, lon: -45.5, concentration: 0.6, depth: 8 },
    ],
    phytoplankton: 'Diatoms',
    biomass: 2.3,
    productivity: 'High'
  };

  const foragingHotspots = [
    { lat: -23.5, lon: -45.2, probability: 0.85, factors: ['Eddy', 'High Chlorophyll'] },
    { lat: -24.1, lon: -44.8, probability: 0.72, factors: ['Temperature', 'Productivity'] },
    { lat: -23.8, lon: -45.5, probability: 0.91, factors: ['Eddy', 'Chlorophyll', 'SSH'] },
  ];

  return (
    <section id="oceanographic" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Dados Oceanográficos da NASA
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Integração de dados das missões SWOT e PACE para análise de hotspots de forrageamento
            </p>
          </div>

          <Tabs defaultValue="swot" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="swot" className="flex items-center gap-2">
                <Satellite className="w-4 h-4" />
                SWOT
              </TabsTrigger>
              <TabsTrigger value="pace" className="flex items-center gap-2">
                <Fish className="w-4 h-4" />
                PACE
              </TabsTrigger>
              <TabsTrigger value="hotspots" className="flex items-center gap-2">
                <Waves className="w-4 h-4" />
                Hotspots
              </TabsTrigger>
            </TabsList>

            <TabsContent value="swot" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Satellite className="w-5 h-5 text-accent" />
                      Redemoinhos Oceânicos Detectados
                    </CardTitle>
                    <CardDescription>
                      Dados de topografia da superfície oceânica - {selectedDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {swotData.eddies.map((eddy) => (
                        <div key={eddy.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">Redemoinho #{eddy.id}</h4>
                            <Badge variant={eddy.type === 'Cyclonic' ? 'default' : 'secondary'}>
                              {eddy.type}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Localização:</span>
                              <p>{eddy.lat}°, {eddy.lon}°</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Intensidade:</span>
                              <p>{(eddy.intensity * 100).toFixed(0)}%</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Raio:</span>
                              <p>{eddy.radius} km</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Relevância:</span>
                              <p>{eddy.intensity > 0.7 ? 'Alta' : 'Média'}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-accent" />
                      Parâmetros Oceanográficos
                    </CardTitle>
                    <CardDescription>
                      Condições da superfície oceânica
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-semibold">Altura da Superfície do Mar</h4>
                          <p className="text-sm text-muted-foreground">Anomalia SSH</p>
                        </div>
                        <div className="text-2xl font-bold text-accent">
                          +{swotData.ssh}m
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-semibold">Temperatura</h4>
                          <p className="text-sm text-muted-foreground">Superfície</p>
                        </div>
                        <div className="text-2xl font-bold text-accent">
                          {swotData.temperature}°C
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-semibold">Salinidade</h4>
                          <p className="text-sm text-muted-foreground">PSU</p>
                        </div>
                        <div className="text-2xl font-bold text-accent">
                          {swotData.salinity}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pace" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Fish className="w-5 h-5 text-accent" />
                      Concentração de Clorofila
                    </CardTitle>
                    <CardDescription>
                      Dados de fitoplâncton e produtividade - {selectedDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {paceData.chlorophyll.map((chl, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">Ponto #{index + 1}</h4>
                            <Badge variant={chl.concentration > 1.0 ? 'default' : 'secondary'}>
                              {chl.concentration > 1.0 ? 'Alta' : 'Média'}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Localização:</span>
                              <p>{chl.lat}°, {chl.lon}°</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Concentração:</span>
                              <p>{chl.concentration} mg/m³</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Profundidade:</span>
                              <p>{chl.depth} m</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Produtividade:</span>
                              <p>{chl.concentration > 1.0 ? 'Alta' : 'Média'}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Waves className="w-5 h-5 text-accent" />
                      Comunidade Fitoplanctônica
                    </CardTitle>
                    <CardDescription>
                      Análise da base da cadeia alimentar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-semibold">Espécie Dominante</h4>
                          <p className="text-sm text-muted-foreground">Fitoplâncton</p>
                        </div>
                        <div className="text-lg font-bold text-accent">
                          {paceData.phytoplankton}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-semibold">Biomassa</h4>
                          <p className="text-sm text-muted-foreground">mg/m³</p>
                        </div>
                        <div className="text-2xl font-bold text-accent">
                          {paceData.biomass}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-semibold">Produtividade</h4>
                          <p className="text-sm text-muted-foreground">Nível</p>
                        </div>
                        <div className="text-lg font-bold text-accent">
                          {paceData.productivity}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="hotspots" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="w-5 h-5 text-accent" />
                    Hotspots de Forrageamento Identificados
                  </CardTitle>
                  <CardDescription>
                    Modelo matemático integrando dados SWOT e PACE - {selectedDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {foragingHotspots.map((hotspot, index) => (
                      <div key={index} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold text-lg">Hotspot #{index + 1}</h4>
                          <Badge 
                            variant={hotspot.probability > 0.8 ? 'default' : 'secondary'}
                            className="text-sm"
                          >
                            {(hotspot.probability * 100).toFixed(0)}% probabilidade
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-muted-foreground text-sm">Localização:</span>
                            <p className="font-mono">{hotspot.lat}°, {hotspot.lon}°</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground text-sm">Fatores identificados:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {hotspot.factors.map((factor, factorIndex) => (
                                <Badge key={factorIndex} variant="outline" className="text-xs">
                                  {factor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="pt-2">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-accent h-2 rounded-full transition-all duration-300"
                                style={{ width: `${hotspot.probability * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Confiança do modelo
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default OceanographicData;
