import yup from "yup"

export default async function productReqMiddleware(ctx, next){
    try {
        const postData = ctx.request.body
        const productSchema = yup.object().shape({
            id: yup.number().positive().integer().required(),
            name: yup.string().required(),
            price: yup.number().positive(),
            description: yup.string(),
            product: yup.string(),
            color: yup.string(),
            image: yup.string().url(),
            createdAt: yup.date().default(() => new Date())
        })

        await productSchema.validate(postData)
        next()
    } catch (e){
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        }
    }
}
