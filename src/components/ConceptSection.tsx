import { Satellite, Brain, Zap, Database, Maximize2, X } from 'lucide-react';
import { useState } from 'react';

const ConceptSection = () => {
  const [expandedMedia, setExpandedMedia] = useState<{type: 'image' | 'video', src: string, title: string} | null>(null);
  
  const concepts = [
    {
      icon: Satellite,
      title: 'Conceptual Smart Tag',
      description: 'Proposal for a new type of tag that measures not only location, but also what sharks are eating, transmitting data in real time.',
      features: [
        'Water chemical composition sensors',
        'Consumed prey detection',
        'Real-time satellite transmission',
        'Long-lasting battery'
      ]
    },
    {
      icon: Brain,
      title: 'Behavior Model',
      description: 'Mathematical framework that considers multiple trophic steps between phytoplankton (PACE) and sharks, including variables such as temperature and depth.',
      features: [
        'Food chain analysis',
        'Oceanographic factors',
        'Migration patterns',
        'Foraging behavior'
      ]
    },
    {
      icon: Zap,
      title: 'Real-Time Prediction',
      description: 'System that combines SWOT and PACE satellite data with AI models to predict foraging hotspots and shark behavior.',
      features: [
        'SWOT data for eddies',
        'PACE data for phytoplankton',
        'Machine learning algorithms',
        'Predictive alerts'
      ]
    }
  ];

  return (
    <>
    <section id="concept" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Innovative Concept: Smart Tag
          </h2>
          <p className="text-lg text-muted-foreground">
            Proposal for a new tag concept that goes beyond traditional tracking, 
            also measuring shark diet and transmitting real-time data for 
            predictive model development.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {concepts.map((concept, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <concept.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{concept.title}</h3>
              <p className="text-muted-foreground mb-6">{concept.description}</p>
              <ul className="space-y-2">
                {concept.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-xs">✓</span>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">
                Why Is This Approach Revolutionary?
              </h3>
              <p className="text-muted-foreground mb-6">
                Traditionally, shark tags only track location. Our innovative 
                proposal also measures diet, creating a complete profile of 
                feeding behavior in real time.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Database className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Multidimensional Data</h4>
                    <p className="text-sm text-muted-foreground">Location + diet + environmental conditions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Zap className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Real-Time Transmission</h4>
                    <p className="text-sm text-muted-foreground">Instant data for predictive models</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Brain className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Predictive AI</h4>
                    <p className="text-sm text-muted-foreground">Models that learn and continuously improve</p>
                  </div>
                </div>
              </div>
            </div>
              <div className="relative flex items-center justify-center">
                <div className="space-y-4 max-w-md w-full">
                  {/* Título da Galeria */}
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-foreground mb-1 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Our Developed Tag
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Real prototype created by the team
                    </p>
                  </div>

                  {/* Galeria Criativa da Tag */}
                  <div className="space-y-6">
                    {/* Linha das 3 Fotos */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Imagem 1 - Tag Montada */}
                      <div className="relative group overflow-hidden rounded-xl shadow-xl border-3 border-white/30 hover:border-blue-400/70 transition-all duration-500">
                        <img 
                          src="/tag.jpeg" 
                          alt="Complete mounted tag" 
                          className="w-full h-48 object-contain bg-gradient-to-br from-slate-50 to-blue-50 transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="bg-blue-600/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                              <p className="text-white text-xs font-bold">
                                🏷️ Mounted Tag
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* Botão de Expandir */}
                        <button
                          onClick={() => setExpandedMedia({type: 'image', src: '/tag.jpeg', title: 'Mounted Tag - Complete View'})}
                          className="absolute top-3 right-3 bg-blue-600/90 hover:bg-blue-600 text-white p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                          aria-label="Expand image"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Imagem 2 - Explodida */}
                      <div className="relative group overflow-hidden rounded-xl shadow-xl border-3 border-white/30 hover:border-cyan-400/70 transition-all duration-500">
                        <img 
                          src="/tag2.jpeg" 
                          alt="Tag exploded view" 
                          className="w-full h-48 object-contain bg-gradient-to-br from-slate-50 to-cyan-50 transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="bg-cyan-600/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                              <p className="text-white text-xs font-bold">
                                🔧 Exploded View
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* Botão de Expandir */}
                        <button
                          onClick={() => setExpandedMedia({type: 'image', src: '/tag2.jpeg', title: 'Tag Exploded View - Separated Components'})}
                          className="absolute top-3 right-3 bg-cyan-600/90 hover:bg-cyan-600 text-white p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                          aria-label="Expand image"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Imagem 3 - Lateral */}
                      <div className="relative group overflow-hidden rounded-xl shadow-xl border-3 border-white/30 hover:border-green-400/70 transition-all duration-500">
                        <img 
                          src="/tag3.jpeg" 
                          alt="Tag side view" 
                          className="w-full h-48 object-contain bg-gradient-to-br from-slate-50 to-green-50 transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="bg-green-600/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                              <p className="text-white text-xs font-bold">
                                📐 Side View
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* Botão de Expandir */}
                        <button
                          onClick={() => setExpandedMedia({type: 'image', src: '/tag3.jpeg', title: 'Tag Side View - Detailed Profile'})}
                          className="absolute top-3 right-3 bg-green-600/90 hover:bg-green-600 text-white p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                          aria-label="Expand image"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Linha do Vídeo Grande - Auto Play como GIF */}
                    <div className="relative group overflow-hidden rounded-2xl shadow-2xl border-4 transition-all duration-500 bg-black">
                      <video 
                        className="w-full h-64 object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src="/video_tag_slowmo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {/* Botão de Expandir Vídeo */}
                      <button
                        onClick={() => setExpandedMedia({type: 'video', src: '/video_tag_slowmo.mp4', title: '3D Tag Demonstration - Slow Motion Video'})}
                        className="absolute top-4 right-4 bg-purple-600/90 hover:bg-purple-600 text-white p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                        aria-label="Expand video"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Badge de Destaque */}
                  <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                      ⚡ Functional Prototype
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                      🔬 Developed by Team
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Expansão */}
      {expandedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-6xl max-h-[90vh] w-full mx-4">
            {/* Botão de Fechar */}
            <button
              onClick={() => setExpandedMedia(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Conteúdo do Modal */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Título */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <h3 className="text-xl font-bold text-center">
                  {expandedMedia.title}
                </h3>
              </div>
              
              {/* Mídia Expandida */}
              <div className="p-4 bg-gray-50">
                {expandedMedia.type === 'image' ? (
                  <img 
                    src={expandedMedia.src} 
                    alt={expandedMedia.title}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg"
                  />
                ) : (
                  <video 
                    src={expandedMedia.src}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg"
                    controls
                    autoPlay
                    loop
                    muted
                  >
                    Seu navegador não suporta a tag de vídeo.
                  </video>
                )}
              </div>
              
              {/* Rodapé com informações */}
              <div className="bg-gray-100 p-4 text-center">
                <p className="text-sm text-gray-600">
                  {expandedMedia.type === 'image' ? '📸 High resolution image' : '🎥 High quality video'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Click outside the area or on X to close
                </p>
              </div>
            </div>
          </div>
          
          {/* Overlay para fechar clicando fora */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={() => setExpandedMedia(null)}
          />
        </div>
      )}
    </>
  );
};

export default ConceptSection;