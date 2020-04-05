import express from 'express';
import nunjucks from 'nunjucks';
import methodOverride from 'method-override';
import db from './db';

const server = express();

server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }));

nunjucks.configure('views', {
  express: server,
  noCache: true,
});

server.use(methodOverride('_method'));

server.delete('/:id', (req, res) => {
  const query = `DELETE FROM ideas WHERE id = ?;`;

  const { id } = req.params;

  db.run(query, [id], (err) => {
    if (err) return res.send('Erro no banco de dados!');

    return res.redirect('/ideias');
  });
});

server.get('/', (req, res) => {
  db.all(`SELECT * FROM ideas`, (err, rows) => {
    if (err) return res.send('Erro no banco de dados!');

    const reversedIdeas = [...rows].reverse();

    const lastIdeas = [];
    reversedIdeas.forEach((idea) => {
      if (lastIdeas.length < 2) lastIdeas.push(idea);
    });

    return res.render('index.html', { ideas: lastIdeas });
  });
});

server.get('/ideias', (req, res) => {
  db.all(`SELECT * FROM ideas`, (err, rows) => {
    if (err) return res.send('Erro no banco de dados!');

    const reversedIdeas = [...rows].reverse();
    return res.render('ideias.html', { ideas: reversedIdeas });
  });
});

server.post('/', (req, res) => {
  const query = `
    INSERT INTO ideas (
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
  `;

  const data = req.body;

  const values = [
    data.image,
    data.title,
    data.category,
    data.description,
    data.link,
  ];

  db.run(query, values, (err) => {
    if (err) return res.send('Erro no banco de dados!');

    return res.redirect('/ideias');
  });
});

server.listen(3333);
