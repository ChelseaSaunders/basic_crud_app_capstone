import { useState } from 'react';

let comments = [];

const Form = () => {
  const [comment, setComment] = useState("");

  const addComment = (event) => {
    event.preventDefault();
    comments.push(comment);
    console.log(comment, comments)
    setComment("")
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    console.log(comment);
  };

  return (
    <form onSubmit={addComment}>
      <label htmlFor="comment">Add a comment here:</label>
      <input
        id="comment"
        name="comment"
        placeholder="Cool website!"
        value={comment}
        onChange={handleCommentChange}
      />
      <button type="submit">Save Comment!</button>
    </form>
  );
};

export default Form;