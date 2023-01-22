import React, { useState } from 'react';
const Content  = ({ title, comments, handleRemove, handleUpdate }) => {
  const [updatedComment, setUpdatedComment] = useState("");

  const remove = (event) => {
    event.preventDefault();
    const id = event.target.id.split('delete').pop();
    handleRemove(id);
  };

  const handleCommentChange = (event) => {
    setUpdatedComment(event.target.value);
  };

  const update = (event) => {
    event.preventDefault();
    const id = event.target.id.split('update-form').pop();
    handleUpdate(id, { content: updatedComment });
    setUpdatedComment('');
  };

  const toggleUpdate = (id) => {
    const updateDivs = Array.prototype.slice.call(document.querySelectorAll('.update-form'));
    updateDivs.forEach(el => el.hidden = true);
    const currentUpdateDiv = document.querySelector(`#update-form${id}`)
    currentUpdateDiv.hidden = false;
  };

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.id} id={comment.id}>
              {comment.content}
              <button
                id={"delete" + comment.id}
                className="delete"
                onClick={remove}
              >
              Delete Comment
              </button>
              <button
                onClick={() => toggleUpdate(comment.id)}
              >
              Show Update Form
              </button>
              <form
                id={"update-form" + comment.id}
                className="update-form"
                hidden={true}
                onSubmit={update}
              >
                <input
                  name="update"
                  placeholder={comment.content}
                  value={updatedComment}
                  required={true}
                  minLength={3}
                  onChange={handleCommentChange}
                />
                <button
                  id={"update" + comment.id}
                  className="update"
                >
                Update Comment
                </button>
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Content;
