import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateTodo from '../UpdateTodo';
import TodoLists from '../TodoLists';

export function DisplayTodo() {
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [update, setUpdate] = useState(false);

  useEffect(
    function () {
      axios
        .get('http://localhost:6000/api/todoapp')
        .then((res) => {
          console.log(res.data);
          setTodo(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    [update]
  );

  function handleEdit(e) {
    setId(e.target.name);
    setOpen(true);
  }

  function handleUpdate() {
    console.log('update:', update, !update);
    setUpdate(!update);
  }

  function handleDelete(e) {
    axios.delete(`http://localhost:4000/api/todoapp/${e.target.name}`);

    setTodo((data) => {
      return data.filter((todo) => todo._id !== e.target.name);
    });
  }

  function handleClose() {
    setId('');
    setOpen(false);
  }

  return (
    <section className="container">
      <Link to="/create-todo" className="button-new">
        <button className="button">New</button>
      </Link>
      <section className="contents">
        <h1>TODO</h1>
        <ul className="list-container">
          {todo.map((data) => (
            <TodoLists
              data={data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </section>
      {open ? (
        <section className="update-container">
          <div className="update-contents">
            <p onClick={handleClose} className="close">
              &times;
            </p>

            <UpdateTodo
              _id={id}
              handleClose={handleClose}
              handleUpdate={handleUpdate}
            />
          </div>
        </section>
      ) : (
        ''
      )}
    </section>
  );
}

export default DisplayTodo;
