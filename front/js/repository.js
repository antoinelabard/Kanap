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

function getCart() {
    return JSON.parse(localStorage.getItem("cart"))
}
