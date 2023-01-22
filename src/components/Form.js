import { useState } from 'react';

const Form = ({ dbName, handleAdd }) => {
  const [comment, setComment] = useState("");

  const addComment = (event) => {
    event.preventDefault();
    if (comment.length < 3) {
      alert("Comment too short. Please enter at least 3 charachters!");
      return;
    }
    handleAdd({ content: comment });
    setComment('');
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <form onSubmit={addComment}>
      <label htmlFor="comment">Add a comment to {dbName} here:</label>
      <input
        id="comment"
        name="comment"
        placeholder="Cool website!"
        value={comment}
        required={true}
        minLength={3}
        onChange={handleCommentChange}
      />
      <button type="submit">Save Comment!</button>
    </form>
  );
};

export default Form;