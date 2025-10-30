import fs from "fs"
import { generateAutoIncreaseId } from "../utils/algorithm.js"
export function getAll(search){
    let todos = JSON.parse(fs.readFileSync('src/database/todos.json', 'utf8'))
    if(!search) return todos
    return todos.filter(t => t.title.toLowerCase().includes(search))
}

export function getOne(id){
    let todos = getAll()
    return todos.find(t => t.id === parseInt(id))
}

export function add(data){
    let todos = getAll()
    data = {id: generateAutoIncreaseId(todos), ...data}
    const addedTodos = [
        data, ...todos]
    fs.writeFileSync("src/database/todos.json", JSON.stringify(
        addedTodos , null, 2), 'utf-8')
    return data
}

export function update(id, data){
    let todos = getAll()
    if(!getOne(id)){
        console.error("No such id")
        throw new Error("No such id")
    }
    console.log(data);
    
    const updatedTodos = todos.map(t => {
        if(t.id === parseInt(id)){
            t = {...t, ...data}
        }
        return t
    })
    fs.writeFileSync('src/database/todos.json', JSON.stringify(
    updatedTodos, null, 2))
}

export function remove(id){
    let todos = getAll()
    if(!getOne(id)){
        console.error("No such id")
        return
    }
    const removedTodos = todos.filter(t => t.id !== parseInt(id))
    return fs.writeFileSync('src/database/todos.json',
        JSON.stringify(removedTodos, null, 2))
}