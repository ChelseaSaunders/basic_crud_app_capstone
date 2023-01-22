import { useState, useEffect } from 'react';

import Title from './components/Title'
import Form from './components/Form'
import Content from './components/Content'
import Footer from './components/Footer'

import './App.css'
import commentService from './services/commentsService'

const App = () => {
  const [comments, setComments] = useState([]);
  const [pgComments, setPgComments] = useState([]);

  useEffect(() => {
    commentService
      .getAll()
      .then(comments => {
        setComments(comments);
      });
  }, []);

  useEffect(() => {
    commentService
      .getAllPostgres()
      .then(comments => {
        setPgComments(comments);
      });
  }, []);

  const addComment = (comment) => {
    commentService
      .create(comment)
      .then(returnedComment => {
        setComments(comments.concat(returnedComment));
      });
  };

  const addCommentPg = async (comment) => {
    await commentService.createPostgres(comment);
    commentService
      .getAllPostgres()
      .then(comments => {
        setPgComments(comments);
      });
  };

  const updateComment = async (id, updatedComment) => {
    await commentService.update(id, updatedComment);

    updatedComment.id = id;

    const updatedComments = pgComments.map((comment) => {
      if (comment.id === id) comment = updatedComment;
      return comment;
    });

    setComments(updatedComments);
    const updateDivs = Array.prototype.slice.call(document.querySelectorAll('.update-form'));
    updateDivs.forEach(el => el.hidden = true);
  };

  const updateCommentPg = (id, updatedComment) => {
    commentService.updatePostgres(id, updatedComment);

    const updatedComments = pgComments.map((comment) => {
      if (comment.id === parseInt(id, 10)) comment.content = updatedComment.content;
      return comment;
    });

    setPgComments(updatedComments);

    const updateDivs = Array.prototype.slice.call(document.querySelectorAll('.update-form'));
    updateDivs.forEach(el => el.hidden = true);
  };

  const removeComment = async (id) => {
    await commentService.remove(id)
    const updatedComments = comments.filter(el => el.id !== id);
    setComments(updatedComments);
  };

  const removeCommentPg = async (id) => {
    await commentService.removePostgres(id)
    const updatedComments = pgComments.filter(el => el.id !== parseInt(id, 10));
    setPgComments(updatedComments);
  };

  return (
    <div>
      <Title />
      <Form
        dbName="MongoDB"
        handleAdd={addComment}
      />
      <Content
        title="MongoDB Comments"
        comments={comments}
        handleUpdate={updateComment}
        handleRemove={removeComment}
      />
      <Form
        dbName="Postgres"
        handleAdd={addCommentPg}
      />
      <Content
        title="Postgres Comments"
        comments={pgComments}
        handleUpdate={updateCommentPg}
        handleRemove={removeCommentPg}
      />
      <Footer />
    </div>
  );
}

export default App;