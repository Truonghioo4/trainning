import Router from "koa-router";
import * as todosHandler from "../handlers/todos/todosHandler.js"
import todoReqMiddleware from "../middlewares/todoReqMiddleware.js"
const router = new Router({
    prefix: '/todos'
});

router.get('/',  todosHandler.getTodos)
router.get('/:id', todosHandler.getTodo)
router.post('/', todoReqMiddleware, todosHandler.addTodo)
router.put('/:id', todosHandler.updateTodo)
router.delete('/:id', todosHandler.removeTodo)

export default router;