const commentsRouter = require('express').Router();
const pg = require('pg');
const Comment = require('../models/commentModel');
const config = {
  user: 'chelsea',
  database: 'comments',
  password: 'password',
  port: 5432,
  host: 'localhost',
};

const pool = new pg.Pool(config);

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({});
  response.json(comments);
});

commentsRouter.post('/', async (request, response) => {
  const body = request.body;
  const comment = new Comment({
    content: body.content,
  });

  const savedComment = await comment.save();
  if (savedComment) {
      response.json(savedComment);
    } else {
      console.log("unable to add commment");
    }
});

commentsRouter.delete('/:id', async (request, response) => {
  await Comment.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

commentsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const comment = {
    content: body.content,
  };

  await Comment.findByIdAndUpdate(request.params.id, comment);
});

commentsRouter.get('/postgres', (request, response) => {
  pool.query("SELECT * FROM comments ORDER BY id", (error, results) => {
    if (error) {
      console.log(pool);
      throw error;
    }
    response.status(200).json(JSON.stringify(results.rows));
  });
});

commentsRouter.post('/postgres/', (request, response) => {
  const comment = request.body.content;
  pool.query("INSERT INTO comments (content) VALUES ($1)", [String(comment)]);
  response.status(201).json();
});

commentsRouter.put('/postgres/:id', (request, response) => {
  const id = request.params.id;
  const comment = request.body.content;

  pool.query("UPDATE comments SET content = $1 WHERE id = $2", [comment, id]);
  response.status(201).json()
});

commentsRouter.delete('/postgres/:id', (request, response) => {
  const id = request.params.id;

  pool.query(`DELETE FROM comments WHERE id = '${id}'`,
  error => {
    if (error) {
      console.log(error);
      response.status(500).json("Internal server error");
    } else {
      response.status(201).json();
    }
  });
});

module.exports = commentsRouter;