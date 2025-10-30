export function pickFieldsProduct(fieldsQuery, data){
    if(!fieldsQuery) return data
    const fields = fieldsQuery.split(',').map(field => field.trim())
    const newProduct = {}
    for(const field of fields){
        if(data.hasOwnProperty(field)){
            newProduct[field] = data[field]
        }
    }
    return newProduct
}

export function getLimtProducts(limit, data){
    if(!limit) return data
    data = data.filter((_, idx) => idx < limit)
    return data
}

export function getSortedProducts(sort, data){
    if(sort === "asc"){
        data = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
    if(sort === "desc"){
        data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    return data
}

export function generateAutoIncreaseId(data){
    const set = new Set()
    data.forEach(item => {
        set.add(item.id)
    })
    let newId=1;
    while (set.has(newId)){ newId++ }
    return newId
}
