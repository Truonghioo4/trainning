export async function fetTodosAPI(){
  return await fetch('http://localhost:5000/api/todos')
    .then(res => res.json)
    .then(res => res.data)
}

export async function addTodoAPI(data){
  return await fetch('http://localhost:5000/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id": data.id,
      "title": data.title
    }),
  })
}

export async function updateTodoAPI(data){
  return await fetch('http://localhost:5000/api/todos', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id": data?.id,
      "title": data?.title,
      "completed": data?.completed
    }),
  })
}

export async function removeTodoAPI(id){
  return await fetch(`http://localhost:5000/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

