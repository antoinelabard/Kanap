import Repository from "./Repository.js"

const repository = new Repository()
let items = document.getElementById('items')
let productsHTML = "" // The string containing all the HTML element describing the products.

repository.getAllProducts().then(function (products) {
    console.log(products)
    for (let i in products) {
        let product = products[i]
        console.log(product)
        productsHTML = productsHTML + `
        <a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>`
    }
    items.innerHTML = productsHTML
})
