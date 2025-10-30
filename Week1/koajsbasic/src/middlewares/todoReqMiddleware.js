import yup from "yup"

export default async function todoReqMiddleware(ctx, next){
    try {
        const postData = ctx.request.body
        const todoSchema = yup.object().shape({
            title: yup.string().required(),
            completed: yup.boolean().default(false),
            createdAt: yup.date().default(() => new Date())
        })
        ctx.request.body = await todoSchema.validate(postData)
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
