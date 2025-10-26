import Router from "koa-router";
import * as productHandler from "../handlers/products/productHandler.js"
import productReqMiddleware from "../middlewares/productReqMiddleware.js"
const router = new Router({
    prefix: '/api/products'
});

router.get('/',  productHandler.getProducts)
router.get('/:id', productHandler.getProduct)
router.post('/', productReqMiddleware, productHandler.save)
router.put('/:id', productHandler.updateProduct)
router.delete('/:id', productHandler.removeProduct)

export default router;