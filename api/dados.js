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
            body { margin: 0; padding: 5px; font-family: sans-serif; display: flex; gap: 8px; justify-content: center; background: white; }
            .card { 
                background: white; border: 1px solid #ddd; border-radius: 6px; 
                padding: 10px; text-align: center; text-decoration: none; color: #333;
                min-width: 100px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .card h2 { margin: 0; font-size: 13px; }
            .card span { display: block; margin-top: 4px; font-size: 9px; font-weight: bold; color: #aa3bff; }
        </style>
    </head>
    <body>
        <a href="${links.rbx}" target="_blank" class="card"><h2>RBX</h2><span>Acessar</span></a>
        <a href="${links.viabilidade}" target="_blank" class="card"><h2>Viabilidade</h2><span>Abrir</span></a>
        <a href="${links.pacotes}" target="_blank" class="card"><h2>Pacotes</h2><span>Ver</span></a>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(html);
}
