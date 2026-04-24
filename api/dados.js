export default function handler(req, res) {
  const { id } = req.query;
  const externalId = id || '87370';

  const links = {
    rbx: `https://www.xsl.com.br/app/wlan/web/resumo?id=${externalId}`,
    viabilidade: `https://www.xsl.com.br/app/wlan/admin/viabilidade?id=${externalId}`,
    pacotes: `https://www.xsl.com.br/app/wlan/admin/pacotes?id=${externalId}`
  };

  const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <style>
            body { margin: 0; padding: 10px; font-family: sans-serif; display: flex; gap: 10px; justify-content: center; background: white; }
            .card { 
                background: white; border: 1px solid #ddd; border-radius: 8px; 
                padding: 12px; text-align: center; text-decoration: none; color: #333;
                min-width: 110px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                transition: border-color 0.2s;
            }
            .card:hover { border-color: #aa3bff; }
            .card h2 { margin: 0; font-size: 14px; }
            .card span { display: block; margin-top: 5px; font-size: 10px; font-weight: bold; color: #aa3bff; }
        </style>
    </head>
    <body>
        <a href="${links.rbx}" target="_blank" class="card"><h2>RBX</h2><span>Acessar</span></a>
        <a href="${links.viabilidade}" target="_blank" class="card"><h2>Viabilidade</h2><span>Abrir</span></a>
        <a href="${links.pacotes}" target="_blank" class="card"><h2>Pacotes</h2><span>Ver</span></a>
    </body>
    </html>
  `;

  // REMOVE BLOQUEIOS E LIBERA IFRAME
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Security-Policy', "frame-ancestors *;");
  
  // Força a remoção do cabeçalho que causa o erro "Este conteúdo está bloqueado"
  res.setHeader('X-Frame-Options', 'ALLOWALL'); 

  return res.status(200).send(html);
}
