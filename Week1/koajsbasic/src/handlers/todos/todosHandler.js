import * as todosRepository from "../../database/todosRepository.js"
export async function getTodos(ctx){
    try {
        const {search} = ctx.request.query
        return ctx.body = {
            data: todosRepository.getAll(search)
        }
    }
    catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

export async function getTodo(ctx) {
    try {
        const {id} = ctx.params
        let currentTodo = todosRepository.getOne(id)
        // console.log(currentProduct)
        if(!currentTodo){
            throw new Error('Todo Not Found with that id!')
        }
        return ctx.body = { data: currentTodo }

    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

export async function addTodo(ctx){
    try {
        const todoData = ctx.request.body
        const addedTodo = await todosRepository.add(todoData)

        ctx.status = 201;
        return ctx.body = { success: true, message: "Added successfully.", data: addedTodo }
    }
    catch (e) {
        ctx.status = 400;   
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

export async function updateTodo(ctx){
    try {
        const {id} = ctx.params
        const todoData = ctx.request.body
        console.log(todoData);
        
        todosRepository.update(id, todoData)
        ctx.status = 201;
        return ctx.body = { success: true, message: "Updated successfully." }
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

export async function removeTodo(ctx){
    try {
        const {id} = ctx.params
        todosRepository.remove(id)
        ctx.status = 201;
        return ctx.body = { success: true, message: "Product deleted successfully." }
    } catch (e){
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}