import { Github, Mail, Waves } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Waves className="w-6 h-6" />
              <h3 className="text-xl font-bold">SharkTrack AI</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Sistema de monitoramento inteligente de tubarões para conservação marinha e segurança costeira.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Sobre Tubarões
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Impacto
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <a href="mailto:contact@sharktrack.ai" className="flex items-center space-x-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@sharktrack.ai</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2025 SharkTrack AI. Todos os direitos reservados. MVP desenvolvido para demonstração.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
