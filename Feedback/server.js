const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let feedbacks = [];
let nextId = 1;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function layout(title, body) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="container">
    <nav>
      <a href="/">Enviar Feedback</a>
      <a href="/feedbacks/lista">Ver Feedbacks</a>
    </nav>
    ${body}
  </div>
</body>
</html>`;
}

app.post('/feedbacks/enviar', (req, res) => {
  const { nome, comentario } = req.body;
  if (nome && comentario) {
    feedbacks.push({ id: nextId++, nome: nome.trim(), comentario: comentario.trim() });
  }
  res.redirect('/feedbacks/lista');
});

app.get('/feedbacks/lista', (req, res) => {
  const itens = feedbacks.length === 0
    ? '<div class="empty">Nenhum feedback enviado ainda.</div>'
    : feedbacks.map(fb => `
        <div class="feedback-item">
          <div>
            <div class="feedback-author">${escapeHtml(fb.nome)}</div>
            <div class="feedback-comment">${escapeHtml(fb.comentario)}</div>
          </div>
          <form action="/feedbacks/remover" method="POST">
            <input type="hidden" name="id" value="${fb.id}" />
            <button type="submit" class="btn-danger">Remover</button>
          </form>
        </div>
      `).join('');

  res.send(layout('Lista de Feedbacks', `
    <h1>Feedbacks</h1>
    <p class="feedback-count">${feedbacks.length} feedback(s) enviado(s)</p>
    ${itens}
  `));
});

app.post('/feedbacks/remover', (req, res) => {
  const id = parseInt(req.body.id, 10);
  feedbacks = feedbacks.filter(fb => fb.id !== id);
  res.redirect('/feedbacks/lista');
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
