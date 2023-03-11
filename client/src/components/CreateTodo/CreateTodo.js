import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateTodo = () => {
  const [data, setData] = useState({ title: '', description: '' });

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('http://localhost:4000/api/todoapp', data)
      .then((res) => {
        setData({ title: '', description: '' });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
        console.log(err.message);
      });
  }

  return (
    <section className="container">
      <Link to="/">
        <button type="button" className="todo-btn todo-btn-back">
          back
        </button>
      </Link>

      <section className="contents">
        <form onSubmit={handleSubmit} className="form-container" noValidate>
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="input"
          />
          <label className="label" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="input"
          />
          <button type="submit" className="todo-btn">
            create todo
          </button>
        </form>
      </section>
    </section>
  );
};

export default CreateTodo;
