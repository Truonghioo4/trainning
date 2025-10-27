import Todo from "./Todo";

const Todos = ({ todos, setTodos }) => {
	const removeTodo = async (id) => {
		try {
			const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({ id })
			}).then((res) => res.json());
			if (res.success) {
				const newTodos = todos.filter((todo) => todo.id !== parseInt(id));
				setTodos(newTodos);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const completeTodo = async (todo) => {
		try {
			const res = await fetch(`http://localhost:5000/api/todos/${todo.id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({ completed: true })
			}).then((res) => res.json());
			if (res.success) {
				setTodos((prev) => {
					return prev.map((t) => {
						if (t.id === parseInt(todo.id)) return { ...t, completed: true };
            return t
					});
				});
			}
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<div className="todos">
			{todos.map((todo, index) => (
				<Todo
					todo={todo}
					key={index}
					removeTodo={removeTodo}
					completeTodo={completeTodo}
				/>
			))}
		</div>
	);
};

export default Todos;
