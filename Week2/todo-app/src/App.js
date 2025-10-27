import './App.css';
import TodoForm from "./components/TodoForm";
import Todos from './components/Todos';
import useFetchTodos from './hooks/useFetchTodos';

function App() {
  const { todos, setTodos } = useFetchTodos()
  return (
    <div className="app">
      <div className="title">Todo App</div>
      <div className="todo-list">
        <TodoForm todos={todos} setTodos={setTodos}/>
        <Todos todos={todos} setTodos={setTodos}/>
      </div>
    </div>
  );
}

export default App;
