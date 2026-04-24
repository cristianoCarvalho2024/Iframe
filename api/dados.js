export default function handler(req, res) {
  const { id } = req.query;

  // Dados Mockados para o seu CRM ler e exibir na tela
  const MOCK_DATA = {
    "87370": {
      "Cliente": "CRISTIANO SOUSA DE CARVALHO",
      "Status": "Online",
      "Plano": "100MB FUNCIONARIO CORTESIA",
      "Financeiro": "Vigente",
      "Conexão": "Estável"
    },
    "4480": {
      "Cliente": "CLIENTE TESTE 4480",
      "Status": "Desconectado",
      "Plano": "FIBRA 200MB",
      "Financeiro": "Atrasado",
      "Conexão": "Sem Sinal"
    }
  };

  const data = MOCK_DATA[id] || { 
    "Aviso": "ID não encontrado no sistema externo",
    "ID_Consultado": id 
  };

  // Define cabeçalhos para evitar qualquer bloqueio de cache ou CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  return res.status(200).json(data);
}
