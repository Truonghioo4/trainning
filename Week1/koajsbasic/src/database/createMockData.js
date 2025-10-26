import {faker} from "@faker-js/faker";
import fs from "fs"

function createRandomProduct() {
    const products = []
    for(let i = 1; i <= 1000; i++) {
        const product = {
            id: i,
            name: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price({ min: 5, max: 1000, dec: 2 })),
            description: faker.commerce.productDescription(),
            product: faker.commerce.product(),
            color: faker.color.human(),
            createdAt: faker.date.anytime(),
            image: faker.image.url()
        }
        products.push(product)
    }
    return { products: products }
}

fs.writeFileSync("src/database/products.json", JSON.stringify(
    createRandomProduct(), null, 2), 'utf-8')