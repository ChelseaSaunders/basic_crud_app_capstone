import React from 'react';
const Content  = ({ comments, handleRemove, handleUpdate }) => {
  const remove = (event) => {
    event.preventDefault();
    const id = event.target.parentElement.id
    handleRemove(id);
  }

  const update = (event) => {
    event.preventDefault();
    const id = event.target.parentElement.id;
    handleUpdate(id);
  }

  return (
    <div>
      <h2>Comments:</h2>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.id} id={comment.id}>
              {comment.content}
              <button className="delete" onClick={remove}>Delete Note</button>
              <button className="edit" onClick={update}>Edit Note</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Content;