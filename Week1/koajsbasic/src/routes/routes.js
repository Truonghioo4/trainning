import Router from 'koa-router';
import productRoutes from "./productRoutes.js";
import todoRoutes from "./todoRoutes.js";
const router = new Router({
    prefix: '/api'
});
router.use(productRoutes.routes(), productRoutes.allowedMethods())
router.use(todoRoutes.routes(), todoRoutes.allowedMethods())

export default router;