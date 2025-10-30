import useFetchTodos from "../hooks/useFetchTodos";
import TodoContext from "./TodoContex";

const TodoContextProvider = ({ children }) => {
	const { todos, setTodos, loading } = useFetchTodos();

	const contextValue = {
		todos: todos,
		setTodos: setTodos,
		loading: loading
	};

	return (
		<TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
	);
};

export default TodoContextProvider;
