import Repository from "./Repository.js"

const repository = new Repository()

let imageHTML = document.getElementsByClassName("item__img")[0]
let titleHTML = document.getElementById("title")
let descriptionHTML = document.getElementById("description")
let colorsHTML = document.getElementById("colors")
let pageTitleHTML = document.getElementsByTagName("title")[0]

repository
    .getProductById(new URL(window.location.href).searchParams.get("id"))
    .then((product) => {
        // add the cover image
        imageHTML.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
        titleHTML.textContent = product.name
        descriptionHTML.textContent = product.description
        pageTitleHTML.textContent = product.name

        // add the color options
        let colorOptions = ""
        for (let i in product.colors) {
            colorOptions += `
            <option value="${product.colors[i]}">${product.colors[i]}</option>`
        }
        colorsHTML.innerHTML += colorOptions

        // add the event listener to add the product to the cart
        document.getElementById("addToCart").addEventListener("click", (event) => {
            let color = document.getElementById("colors").value
            if (!color) {
                alert("Veuillez choisir la couleur de votre article.")
                return
            }

            let quantity = Number(document.getElementById("quantity").value)
            let oldCartItem = repository.getCart().filter((item) => {
                return item.id === product._id && item.color === color
            })
            if (oldCartItem.length != 0) {
                quantity += Number(oldCartItem[0].quantity)
            }
            if (quantity < repository.getMinOrderQuantity() ||
                quantity > repository.getMaxOrderQuantity()) {
                alert(`Le nombre d'articles doit être compris entre ${repository.getMinOrderQuantity()} et ${repository.getMaxOrderQuantity()}.`)
                return
            }

            repository.addToCart(product._id, color, quantity)
            alert("Le produit a été ajouté au panier !")
        })
    })
