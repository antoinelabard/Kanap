import Contact from "./Contact.js"

async function getAllProducts() {
    fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok) {
                return res.json()
            }
        })
        .then(function (value) {
            console.log(value)
        })
        .catch(function (err) {
            console.log(err)
            return {}
        });
}

async function getProductById(id) {
    let url = `http://localhost:3000/api/products/${id}`
    fetch(url)
        .then(function (res) {
            if (res.ok) {
                return res.json()
            }
        })
        .then(function (value) {
            console.log(value)
        })
        .catch(function (err) {
            console.log(err)
            return {}
        });
}

async function order(contact, products) {
    let body = {
        contact,
        products
    }

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

/**
 * The returned object has the following form:
 * 
 * [
 *      {"id": string, "color": string, "quantity": number},
 *      ...
 * ]
 * 
 * @returns a JSON object of all the products in the cart
 */
function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"))
    if (!cart) {
        cart = []
    }
    return cart
}

function addToCart(id, color, quantity) {
    let cart = getCart()
    let productAdded = false
    for (let i = 0; i < cart.length; ++i) {
        if (cart[i].id === id && cart[i].color === color) {
            cart[i].quantity = quantity
            productAdded = true
            break
        }
    }
    if (!productAdded) {
        cart.push({
            "id": id,
            "color": color,
            "quantity": quantity

        })
    }
    localStorage.setItem("cart", JSON.stringify(cart))
}
