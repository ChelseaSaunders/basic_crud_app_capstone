import React from 'react';

const Content  = ({ comments, handleDelete, handleEdit }) => {
  return (
    <div>
      <h2>Comments:</h2>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.id} id={comment.id}>
              {comment.content}
              <button class="delete" onClick={handleDelete}>Delete Note</button>
              <button class="edit" onClick={handleEdit}>Edit Note</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Content;