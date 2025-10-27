const Todo = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div className="todo"
      style={{textDecoration: todo.completed ? "line-through" : ""}}
    >
      <p>{todo.title}</p>
      <div className="bagde">
        <button onClick={() => completeTodo(todo)}>Completed</button>
        <button onClick={() => removeTodo(todo.id)}>x</button>
      </div>
    </div>
    )
};

export default Todo;