import Repository from "./Repository.js"

const repository = new Repository()
let items = document.getElementById('items')

repository.getAllProducts().then(function (products) {
    for (let i in products) {
        let product = products[i]
        console.log(product)
        items.innerHTML += `
        <a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>`
    }
})
