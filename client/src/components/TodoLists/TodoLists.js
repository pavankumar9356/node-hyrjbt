import React from 'react';

const TodoLists = ({ data, handleEdit, handleDelete }) => {
  const { _id, title, description } = data;

  return (
    <li key={_id}>
      <div className="title-description">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="todo-btn-container">
        <button className="todo-btn" name={_id} onClick={handleEdit}>
          edit
        </button>
        <button className="todo-btn" name={_id} onClick={handleDelete}>
          delete
        </button>
      </div>
    </li>
  );
};

export default TodoLists;
