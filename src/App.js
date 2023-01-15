import { useState, useEffect } from 'react';

import Title from './components/Title'
import Form from './components/Form'
import Content from './components/Content'
import Footer from './components/Footer'

import './App.css'
import commentService from './services/commentsService'

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    commentService
      .getAll()
      .then(comments => {
        setComments(comments);
      });
  }, []);

  const addComment = (comment) => {
    commentService
      .create(comment)
      .then(returnedComment => {
        setComments(comments.concat(returnedComment));
      });
  }

  const updateComment =  (id, updatedComment) => {
    commentService.update(id, updatedComment);

    updatedComment.id = id;

    const updatedComments = comments.map((comment) => {
      if (comment.id === id) comment = updatedComment;
      return comment;
    });
    setComments(updatedComments);
    const updateDivs = Array.prototype.slice.call(document.querySelectorAll('.update-form'));
    updateDivs.forEach(el => el.hidden = true);
  }

  const removeComment = async (id) => {
    await commentService.remove(id)
    const updatedComments = comments.filter(el => el.id !== id);
    setComments(updatedComments);
  }

  return (
    <div>
      <Title />
      <Form
        dbName="MongoDB"
        handleAdd={addComment}
      />
      <Content
        title="MongoDB Commentss"
        comments={comments}
        handleUpdate={updateComment}
        handleRemove={removeComment}
      />
      <Footer />
    </div>
  );
}

export default App;
