import { useState, useEffect } from 'react'
import './App.css'

interface CardItem {
  id: string;
  title: string;
  url: string;
  label: string;
  description: string;
  external?: boolean;
}

function App() {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [externalId, setExternalId] = useState('87370'); // Valor padrão

  // Captura o ID da URL ao carregar a página
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    if (idParam) {
      setExternalId(idParam);
    }
  }, []);

  // Lista de cards dinâmica baseada no ID recebido
  const CARDS: CardItem[] = [
    {
      id: 'painel',
      title: 'RBX',
      url: `https://www.xsl.com.br/app/wlan/web/resumo?id=${externalId}`,
      label: 'PC',
      description: ''
    },
    {
      id: 'nova-contratacao',
      title: 'Nova Contratação',
      url: `https://www.xsl.com.br/app/wlan/admin/viabilidade?id=${externalId}`,
      label: 'AP',
      description: '',
    },
    {
      id: 'pacotes',
      title: 'Pacotes',
      url: `https://www.xsl.com.br/app/wlan/admin/pacotes?id=${externalId}`,
      label: 'WF',
      description: '',
    }
  ];

  const handleCardClick = (card: CardItem) => {
    if (card.external) {
      window.open(card.url, '_blank');
    } else {
      setIsLoading(true);
      setActiveUrl(card.url);
    }
  };

  const handleBack = () => {
    setActiveUrl(null);
    setIsLoading(false);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (activeUrl) {
    return (
      <div className="iframe-view">
        <header className="iframe-nav">
          <button className="nav-back" onClick={handleBack}>
            ← Voltar
          </button>
          <div className="nav-info">
            <span className="nav-url">ID: {externalId}</span>
          </div>
        </header>
        
        <div className="iframe-wrapper">
          {isLoading && (
            <div className="loader-container">
              <div className="spinner"></div>
              <p>Carregando...</p>
            </div>
          )}
          <iframe 
            src={activeUrl} 
            title="Interface Externa"
            className={`main-iframe ${isLoading ? 'hidden' : 'visible'}`}
            onLoad={handleIframeLoad}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <main className="services-grid">
        {CARDS.map((card) => (
          <div key={card.id} className="service-card" onClick={() => handleCardClick(card)}>
            <div className="service-info">
              <h2>{card.title}</h2>
              {card.description && <p>{card.description}</p>}
            </div>
            <div className="service-footer">
              <span className="action-text">
                {card.external ? 'Abrir ↗' : 'Acessar →'}
              </span>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default App
