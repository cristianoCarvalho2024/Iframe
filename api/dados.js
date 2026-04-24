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
            body { margin: 0; padding: 10px; font-family: sans-serif; display: flex; gap: 10px; justify-content: center; background: #f9f9f9; }
            .card { 
                background: white; border: 1px solid #ddd; border-radius: 8px; 
                padding: 12px; text-align: center; text-decoration: none; color: #333;
                min-width: 120px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

  // CABEÇALHOS CRÍTICOS PARA O CRM RENDERIZAR
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Força a liberação de frame para este domínio específico do CRM
  res.setHeader('Content-Security-Policy', "frame-ancestors *;");
  
  return res.status(200).send(html);
}
