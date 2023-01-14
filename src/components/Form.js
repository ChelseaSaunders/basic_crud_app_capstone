import { useState } from 'react';

const Form = ({ handleAdd }) => {
  const [comment, setComment] = useState("");

  const addComment = (event) => {
    event.preventDefault();
    handleAdd({ content: comment });
    setComment('');
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value);
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