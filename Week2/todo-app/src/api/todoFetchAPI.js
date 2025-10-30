import { API_ROOT } from "../utils/constants"

export const searchTodoAPI = async (searchQuery) => {
	try {
		const res = await fetch(`${API_ROOT}/api/todos?search=${searchQuery}`)
			.then((res) => res.json())
			.then((res) => res.data)
    return res
	} catch (e) {
    console.error(e)
  }
}

export const addTodoAPI = async (title) => {
	try {
		const res = await fetch(`${API_ROOT}/api/todos`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ title: title })
		}).then((res) => res.json())
		return res
	} catch (e) {
		console.error(e)
	}
}

export const updateTodoAPI = async (id, updateData) => {
	try {
		const res = await fetch(`${API_ROOT}/api/todos/${id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ ...updateData })
		}).then((res) => res.json())
		return res
	} catch (e) {
		console.error(e)
	}
}

export const removeTodoAPI = async (id) => {
	try {
		const res = await fetch(`${API_ROOT}/api/todos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ id })
		}).then((res) => res.json())
		return res
	} catch (e) {
		console.error(e)
	}
}


