import {
    getAll as getAllProducts,
    getOne as getOneProduct,
    add as addProduct,
    update,
    remove
} from "../../database/productRepository.js"
import {pickFieldsProduct} from "../../utils/algorithm.js";
export async function getProducts(ctx){
    try {
        const {limit, sort} = ctx.request.query
        return ctx.body = {
            data: getAllProducts(limit, sort)
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

export async function getProduct(ctx) {
    try {
        const {id} = ctx.params
        const {fields} = ctx.request.query
        let currentProduct = getOneProduct(id)
        console.log(currentProduct)
        if(fields && fields.length > 0){
            currentProduct = pickFieldsProduct(fields, currentProduct)

        }
        if(currentProduct){
            return ctx.body = { data: currentProduct }
        }
        throw new Error('Product Not Found with that id!')
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

export async function save(ctx){
    try {
        const productData = ctx.request.body
        addProduct(productData)
        ctx.status = 201;
        return ctx.body = { success: true, message: "Added successfully." }
    }
    catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

export async function updateProduct(ctx){
    try {
        const {id} = ctx.params
        const productData = ctx.request.body
        update(id, productData)
        ctx.status = 201;
        return ctx.body = { success: true, message: "Updated successfully." }
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

export async function removeProduct(ctx){
    try {
        const {id} = ctx.params
        remove(id)
        ctx.status = 201;
        return ctx.body = { success: true, message: "Product deleted successfully." }
    } catch (e){
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}