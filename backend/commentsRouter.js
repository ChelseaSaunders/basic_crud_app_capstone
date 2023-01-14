const express = require("express");
const Comment = require('./commentModel');
const commentsRouter = express();
const cors = require("cors");
const { response } = require("express");

require("dotenv").config({ path: "./config.env "});
const PORT = process.env.PORT || 5000;

commentsRouter.use(cors());
commentsRouter.use(express.json());

commentsRouter.get('/', (request, response) => {
  Comment.find({}).then(comments => {
    response.json(comments);
  });
});

commentsRouter.get('/:id', (request, response) => {
  Comment.findById(request.params.id)
    .then(comment => {
      if (comment) {
        response.json(note);
      } else {
        console.log("Coment not found.");
        alert("Error: comment not found.");
        response.status(404).end();
      }
    });
});

commentsRouter.post('/', (request, response) => {
  const body = request.body;

  const comment = new Comment({
    content: body.content,
  });

  comment.save()
    .then(savedComment => {
      response.json(savedComment);
    })
    .catch((error) => {
      console.log("unable to add commment", error);
      alert("Error: comment not added.")
    });
})

commentsRouter.delete('/:id', (reuest, response) => {
  Comment.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log("Error: comment not deleted.", error);
      alert("Error: comment not added.");
    });
})

commentsRouter.put('/:id', (request, response) => {
  const body = request.body;

  const comment = {
    content: body.content,
  };

  Comment.findByIdAndUpdate(request.params.id, comment)
    .then(updatedComment => {
      response.json(updatedComment);
    })
    .catch((error) => {
      console.log("Error: could not update comment.", error);
      alert("Error: comment not updated.");
    });
});

module.exports = commentsRouter;