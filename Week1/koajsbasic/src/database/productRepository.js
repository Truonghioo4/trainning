import fs from "fs"
import products from "./products.json" with {type: "json"}
import {getLimtProducts, getSortedProducts} from "../utils/algorithm.js";

export function getAll(limit, sort){
    let getProductsParameter = products
    if(limit){
        getProductsParameter = getLimtProducts(limit, getProductsParameter)
    }
    if(sort){
        getProductsParameter = getSortedProducts(sort, getProductsParameter)
    }
    return getProductsParameter
}

export function getOne(id){
    return products.find(p => p.id === parseInt(id))

}

export function add(data){
    const updatedProducts = [
        data, ...products]
    console.log(updatedProducts)
    return fs.writeFileSync("src/database/products.json", JSON.stringify(
        updatedProducts, null, 2), 'utf-8')
}

export function update(id, data){
    if(!getOne(id)){
        console.error("No such id")
        return
    }
    const updatedProducts = products.map(p => {
        if(p.id === parseInt(id)) p = {...p, ...data}
        return p
    })
    return fs.writeFileSync('src/database/products.json', JSON.stringify(
        updatedProducts, null, 2))
}


export function remove(id){
    if(!getOne(id)){
        console.error("No such id")
        return
    }
    const updatedProducts = products.filter(p => p.id !== parseInt(id))
    return fs.writeFileSync('src/database/products.json', JSON.stringify(updatedProducts, null, 2))
}