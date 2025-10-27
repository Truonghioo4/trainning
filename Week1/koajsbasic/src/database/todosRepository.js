import fs from "fs"
import todos from './todos.json' with { type: 'json' }
import {getLimtProducts, getSortedProducts} from "../utils/algorithm.js";
// console.log(todos);
export function getAll(){
    return todos
}

export function getOne(id){
    return todos.find(t => t.id === parseInt(id))
}

export function add(data){
    const addedTodos = [
        data, ...todos]
    // console.log(addedTodos)
    fs.writeFileSync("src/database/todos.json", JSON.stringify(
        addedTodos , null, 2), 'utf-8')
    return data
}

export function update(id, data){
    if(!getOne(id)){
        console.error("No such id")
        return
    }
    const updatedTodos = todos.map(t => {
        if(t.id === parseInt(id)) t = {...t, ...data}
        return t
    })
    return fs.writeFileSync('src/database/todos.json', JSON.stringify(
        updatedTodos, null, 2))
}

export function remove(id){
    if(!getOne(id)){
        console.error("No such id")
        return
    }
    const removedTodos = todos.filter(t => t.id !== parseInt(id))
    return fs.writeFileSync('src/database/todos.json',
        JSON.stringify(removedTodos, null, 2))
}