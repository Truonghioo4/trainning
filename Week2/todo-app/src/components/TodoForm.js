import {useState} from "react";
import { generateAutoIncreaseId } from "../utils/algorithm";

function TodoForm({todos, setTodos}) {
  const [value, setValue] = useState("")
  const addTodo = async (title) => {
		try {
			const res = await fetch(`http://localhost:5000/api/todos`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					id: generateAutoIncreaseId(todos),
					title: title
				})
			}).then((res) => res.json())

			if (res.success) {
				setTodos((prev) => [res.data, ...prev])
			}
		} catch (e) {
			console.error(e)
		}
	}

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
            type="text"
            className="input"
            value={value}
            onChange={e => setValue(e.target.value)}
        />
        <button type="submit" className="btn-add">Add</button>
      </div>
    </form>
  )
}

export default TodoForm;