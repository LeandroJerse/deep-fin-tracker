import { Waves, Menu, X } from 'lucide-react';
import { useState } from 'react';
import sharkLogo from '@/assets/shark-logo.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img src={sharkLogo} alt="FinStream" className="w-10 h-10 rounded-full" />
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">FinStream</h1>
              <p className="text-xs text-primary-foreground/70">NASA Challenge - Shark Tracking</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('dashboard')}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Sobre o Projeto
            </button>
            <button
              onClick={() => scrollToSection('oceanographic')}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Dados NASA
            </button>
            <button
              onClick={() => scrollToSection('concept')}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Conceito
            </button>
            <button
              onClick={() => scrollToSection('impact')}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Impacto
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t border-primary-foreground/10">
            <button
              onClick={() => scrollToSection('dashboard')}
              className="block w-full text-left text-primary-foreground/80 hover:text-primary-foreground py-2"
            >
              Dashboard
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-primary-foreground/80 hover:text-primary-foreground py-2"
            >
              Sobre o Projeto
            </button>
            <button
              onClick={() => scrollToSection('oceanographic')}
              className="block w-full text-left text-primary-foreground/80 hover:text-primary-foreground py-2"
            >
              Dados NASA
            </button>
            <button
              onClick={() => scrollToSection('concept')}
              className="block w-full text-left text-primary-foreground/80 hover:text-primary-foreground py-2"
            >
              Conceito
            </button>
            <button
              onClick={() => scrollToSection('impact')}
              className="block w-full text-left text-primary-foreground/80 hover:text-primary-foreground py-2"
            >
              Impacto
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
