import { useState, useEffect } from 'react';

import Title from './components/Title'
import Form from './components/Form'
import Content from './components/Content'
import Footer from './components/Footer'

import './App.css'
import commentService from './commentsService'

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

  const updateComment = (id, updatedComment) => {
    commentService
      .update(id, updatedComment)
      .then((returnedComment) => {
        console.log(returnedComment);
        setComments(comments.map(c => c.id === id ? returnedComment : c))
      })
      .catch(error => console.log("comment not updated", error));
  }

  const removeComment = async (id) => {
    await commentService.remove(id)
    let updatedComments = comments.slice().filter(el => el.id !== id);
    console.log(comments, updatedComments);
    setComments(updatedComments);
  }

  return (
    <div>
      <Title />
      <Form handleAdd={addComment} />
      <Content
        comments={comments}
        handleUpdate={updateComment}
        handleRemove={removeComment}
      />
      <Footer />
    </div>
  );
}

export default App;
