export default function handler(req, res) {
  const { id } = req.query;
  const externalId = id || '87370';

  // Configuração dos links baseada no ID recebido
  const links = {
    rbx: `https://www.xsl.com.br/app/wlan/web/resumo?id=${externalId}`,
    viabilidade: `https://www.xsl.com.br/app/wlan/admin/viabilidade?id=${externalId}`,
    pacotes: `https://www.xsl.com.br/app/wlan/admin/pacotes?id=${externalId}`
  };

  // HTML e CSS integrados para resposta rápida do CRM
  const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { 
                margin: 0; padding: 10px; 
                font-family: system-ui, -apple-system, sans-serif; 
                background-color: transparent; 
                display: flex; justify-content: center; align-items: center; 
                min-height: 280px;
            }
            .grid { 
                display: flex; flex-wrap: wrap; gap: 12px; 
                justify-content: center; width: 100%; max-width: 800px;
            }
            .card { 
                background: white; border: 1px solid #e5e4e7; border-radius: 10px; 
                padding: 15px; flex: 1 1 180px; max-width: 220px; 
                text-align: center; text-decoration: none; color: #08060d;
                transition: transform 0.2s, border-color 0.2s;
                box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            }
            .card:hover { 
                transform: translateY(-3px); border-color: #aa3bff; 
                box-shadow: 0 5px 15px rgba(170, 59, 255, 0.1);
            }
            .card h2 { margin: 0; font-size: 16px; color: #08060d; }
            .card span { 
                display: block; margin-top: 8px; font-size: 12px; 
                font-weight: bold; color: #aa3bff; text-transform: uppercase; 
            }
        </style>
    </head>
    <body>
        <div class="grid">
            <a href="${links.rbx}" target="_blank" class="card">
                <h2>RBX</h2>
                <span>Acessar →</span>
            </a>
            <a href="${links.viabilidade}" target="_blank" class="card">
                <h2>Nova Contratação</h2>
                <span>Abrir →</span>
            </a>
            <a href="${links.pacotes}" target="_blank" class="card">
                <h2>Pacotes</h2>
                <span>Ver Planos →</span>
            </a>
        </div>
    </body>
    </html>
  `;

  // Define o tipo de conteúdo como HTML
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  return res.status(200).send(html);
}
