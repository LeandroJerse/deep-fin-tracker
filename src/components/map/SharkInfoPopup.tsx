import { RastreamentoTubaroes } from '@/types/rastreamentoTubaroes'

interface SharkInfoPopupProps {
  shark: RastreamentoTubaroes
}

const SharkInfoPopup = ({ shark }: SharkInfoPopupProps) => {
  const comportamentoLabel = {
    'Transitando': { cor: 'bg-blue-500', texto: 'Transitando' },
    'Busca': { cor: 'bg-orange-500', texto: 'Busca' },
    'Forrageando': { cor: 'bg-green-500', texto: 'Forrageando' },
  }

  const comportamento = comportamentoLabel[shark.Comportamento as keyof typeof comportamentoLabel] || {
    cor: 'bg-gray-500',
    texto: shark.Comportamento
  }

  return (
    <div className="p-4 min-w-[250px] bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-slate-900">
          Tubarão #{shark.Id}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs text-white ${comportamento.cor}`}>
          {comportamento.texto}
        </span>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600 font-medium">Coordenadas:</span>
          <span className="text-slate-900">
            {shark.Lat.toFixed(4)}°, {shark.Lon.toFixed(4)}°
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-600 font-medium">Temperatura:</span>
          <span className="text-slate-900">{shark.TempCc.toFixed(1)}°C</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-600 font-medium">P. Forrageio:</span>
          <span className="text-slate-900">{(shark.PForrageio * 100).toFixed(0)}%</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-600 font-medium">Clorofila-a:</span>
          <span className="text-slate-900">{shark.ChlorAAmbiente.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-600 font-medium">SSHA:</span>
          <span className="text-slate-900">{shark.SshaAmbiente.toFixed(2)}</span>
        </div>
        
        <div className="pt-2 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            Última atualização: {new Date(shark.Tempo).toLocaleString('pt-BR')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SharkInfoPopup

