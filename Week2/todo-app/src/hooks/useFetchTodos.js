import { useEffect, useState } from "react"

export default function useFetchTodos() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetched, setFetched] = useState(false)

  async function loadTodos(){
    try {
      setLoading(true)
      const todoList = await fetch('http://localhost:5000/api/todos')
        .then(res => res.json())
        .then(res => res.data)
      setTodos(todoList)
      setFetched(true)
    } catch (e) { console.error(e) }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadTodos()
  }, [])
  
  return { todos, setTodos , loading, fetched}
}
