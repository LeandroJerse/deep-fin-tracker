import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  Server,
  Loader2,
  AlertCircle,
  Network,
  Globe,
  Database
} from 'lucide-react'
import { ApiTestService, ApiHealthStatus } from '@/services/apiTestService'
import { API_CONFIG } from '@/config/api'

const ApiTestPage = () => {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<any>(null)

  const runTests = async () => {
    setTesting(true)
    try {
      const testResults = await ApiTestService.runAllTests()
      setResults(testResults)
    } catch (error) {
      console.error('Erro ao executar testes:', error)
    } finally {
      setTesting(false)
    }
  }

  const runSingleTest = async (testName: string, testFn: () => Promise<any>) => {
    setTesting(true)
    try {
      const result = await testFn()
      setResults((prev: any) => ({
        ...prev,
        timestamp: new Date().toISOString(),
        tests: {
          ...prev?.tests,
          [testName]: result
        }
      }))
    } catch (error) {
      console.error(`Erro no teste ${testName}:`, error)
    } finally {
      setTesting(false)
    }
  }

  const StatusBadge = ({ isHealthy }: { isHealthy: boolean }) => (
    <Badge variant={isHealthy ? "default" : "destructive"} className="ml-2">
      {isHealthy ? (
        <>
          <CheckCircle2 className="h-3 w-3 mr-1" />
          OK
        </>
      ) : (
        <>
          <XCircle className="h-3 w-3 mr-1" />
          FALHOU
        </>
      )}
    </Badge>
  )

  const TestResultCard = ({ 
    title, 
    result, 
    icon: Icon,
    testFn 
  }: { 
    title: string
    result?: ApiHealthStatus
    icon: any
    testFn?: () => Promise<any>
  }) => (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${result?.isHealthy ? 'bg-green-100' : 'bg-red-100'}`}>
            <Icon className={`h-5 w-5 ${result?.isHealthy ? 'text-green-600' : 'text-red-600'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            {result && <StatusBadge isHealthy={result.isHealthy} />}
          </div>
        </div>
        {testFn && (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => runSingleTest(title, testFn)}
            disabled={testing}
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        )}
      </div>

      {result && (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-1 border-b">
            <span className="text-slate-600">Endpoint:</span>
            <code className="text-xs bg-slate-100 px-2 py-1 rounded">
              {result.endpoint}
            </code>
          </div>
          
          <div className="flex justify-between py-1 border-b">
            <span className="text-slate-600">Tempo de Resposta:</span>
            <span className="font-mono">{result.responseTime}ms</span>
          </div>
          
          {result.statusCode && (
            <div className="flex justify-between py-1 border-b">
              <span className="text-slate-600">Status Code:</span>
              <Badge variant={result.statusCode === 200 ? "default" : "destructive"}>
                {result.statusCode}
              </Badge>
            </div>
          )}
          
          {result.error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription className="text-xs mt-1">
                {result.error}
              </AlertDescription>
            </Alert>
          )}
          
          {result.data && (
            <details className="mt-2">
              <summary className="cursor-pointer text-slate-600 hover:text-slate-900">
                Ver resposta
              </summary>
              <pre className="mt-2 p-2 bg-slate-50 rounded text-xs overflow-auto max-h-32">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}

      {!result && (
        <p className="text-sm text-slate-500">Clique em "Executar Todos os Testes" para testar</p>
      )}
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-6 bg-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Diagnóstico de API
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Teste a conectividade e os endpoints da API
                </p>
              </div>
            </div>
            
            <Button
              onClick={runTests}
              disabled={testing}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {testing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testando...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Executar Todos os Testes
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Configuração Atual */}
        <Card className="p-6 bg-white shadow-lg">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Server className="h-5 w-5" />
            Configuração Atual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-slate-600">Base URL:</span>
              <code className="block mt-1 p-2 bg-slate-100 rounded text-sm">
                {API_CONFIG.BASE_URL}
              </code>
            </div>
            <div>
              <span className="text-sm text-slate-600">Ambiente:</span>
              <Badge className="ml-2">{import.meta.env.MODE}</Badge>
            </div>
            <div>
              <span className="text-sm text-slate-600">Timeout:</span>
              <span className="block mt-1 font-mono">{API_CONFIG.TIMEOUT}ms</span>
            </div>
            <div>
              <span className="text-sm text-slate-600">Última Execução:</span>
              <span className="block mt-1 text-sm">
                {results?.timestamp 
                  ? new Date(results.timestamp).toLocaleString('pt-BR')
                  : 'Nunca'
                }
              </span>
            </div>
          </div>
        </Card>

        {/* Resultados dos Testes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TestResultCard
            title="Conectividade Básica"
            result={results?.tests?.connectivity}
            icon={Network}
            testFn={ApiTestService.testBasicConnectivity}
          />
          
          <TestResultCard
            title="Endpoint Info (/api/Info/v1)"
            result={results?.tests?.infoEndpoint}
            icon={Globe}
            testFn={ApiTestService.testInfoEndpoint}
          />
          
          <TestResultCard
            title="Lista de Tubarões"
            result={results?.tests?.sharkTracking}
            icon={Database}
            testFn={ApiTestService.testSharkTrackingEndpoint}
          />
          
          <TestResultCard
            title="Últimas Posições"
            result={results?.tests?.latestPosition}
            icon={Activity}
            testFn={ApiTestService.testLatestPositionEndpoint}
          />
        </div>

        {/* Diagnóstico Geral */}
        {results && (
          <Card className="p-6 bg-white shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Diagnóstico Geral
            </h2>
            
            {Object.values(results.tests).every((test: any) => test.isHealthy) ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-900">Tudo Funcionando!</AlertTitle>
                <AlertDescription className="text-green-800">
                  Todos os endpoints estão respondendo corretamente. A API está saudável.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Problemas Detectados</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {!results.tests.connectivity?.isHealthy && (
                      <li>Problema de conectividade com o servidor</li>
                    )}
                    {!results.tests.infoEndpoint?.isHealthy && (
                      <li>Endpoint /api/Info/v1 não está acessível</li>
                    )}
                    {!results.tests.sharkTracking?.isHealthy && (
                      <li>Endpoint de rastreamento de tubarões com erro</li>
                    )}
                    {!results.tests.latestPosition?.isHealthy && (
                      <li>Endpoint de últimas posições com erro</li>
                    )}
                  </ul>
                  
                  <div className="mt-4 p-3 bg-white rounded border border-red-200">
                    <p className="font-semibold text-sm mb-2">Possíveis Soluções:</p>
                    <ul className="text-sm space-y-1">
                      <li>✓ Verifique se o backend está rodando</li>
                      <li>✓ Confirme a URL base em src/config/api.ts</li>
                      <li>✓ Configure CORS no backend (ver CONFIGURAR_CORS_BACKEND.md)</li>
                      <li>✓ Verifique o console do navegador (F12) para mais detalhes</li>
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}

export default ApiTestPage

