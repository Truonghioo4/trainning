import { useEffect, useState } from "react"

export default function useFetchTodos() {
  const [todos, setTodos] = useState([])

  async function loadTodos(){
    try {
      const todoList = await fetch('http://localhost:5000/api/todos')
        .then(res => res.json())
        .then(res => res.data)
      setTodos(todoList)
    } catch (e) { console.error(e) }
  }
  useEffect(() => {
    loadTodos()
  }, [])
  
  return {todos, setTodos}
}
