// Shark behavior translations from Portuguese to English
export const translateSharkBehavior = (comportamento: string): string => {
  const translations: Record<string, string> = {
    'Transitando': 'Transiting',
    'Busca': 'Searching', 
    'Forrageando': 'Foraging',
    'Desconhecido': 'Unknown'
  }
  
  return translations[comportamento] || comportamento
}

// Get behavior color (keeping the same colors)
export const getBehaviorColor = (comportamento: string): string => {
  const colors: Record<string, string> = {
    'Transitando': '#3B82F6',  // Blue
    'Busca': '#F59E0B',        // Orange  
    'Forrageando': '#10B981',  // Green
  }
  return colors[comportamento] || '#6B7280'
}

// Get behavior info with translation
export const getBehaviorInfo = (comportamento: string) => {
  const behaviorMap: Record<string, { 
    label: string, 
    translatedLabel: string, 
    color: string,
    icon: string 
  }> = {
    'Transitando': { 
      label: 'Transitando', 
      translatedLabel: 'Transiting',
      color: '#3B82F6',
      icon: 'Activity'
    },
    'Busca': { 
      label: 'Busca', 
      translatedLabel: 'Searching',
      color: '#F59E0B', 
      icon: 'Waves'
    },
    'Forrageando': { 
      label: 'Forrageando', 
      translatedLabel: 'Foraging',
      color: '#10B981',
      icon: 'Fish'
    }
  }
  
  return behaviorMap[comportamento] || {
    label: comportamento,
    translatedLabel: comportamento,
    color: '#6B7280',
    icon: 'Activity'
  }
}
