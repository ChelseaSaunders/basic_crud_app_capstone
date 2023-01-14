const commentsRouter = require('express').Router()
const Comment = require('./commentModel')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({});
  response.json(comments);
});

commentsRouter.get('/:id', async (request, response) => {
  const comment = await Comment.findBbyId(request.params.id);

  if (comment) {
    response.json(comment.toJSON());
  } else {
    console.log("Coment not found.");
    response.status(404).end();
  }
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
})

commentsRouter.delete('/:id', async (request, response) => {
  await Comment.findByIdAndRemove(request.params.id)
  response.status(204).end();
});

commentsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const comment = {
    content: body.content,
  };

  const updatedComment = await Comment.findByIdAndUpdate(request.params.id, comment);
  if (updatedComment) {
      response.json(updatedComment);
  } else {
      console.log("Error: could not update comment.");
  }
});

module.exports = commentsRouter;