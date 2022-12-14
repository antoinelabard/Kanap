import Contact from "./Contact.js"

/**
 * Repository: provide all the data that the applicaiton needs and handle
 * the API call and responseq decoding.
 */
export default class Repository {

    getMaxOrderQuantity() {
        return 100
    }

    getMinOrderQuantity() {
        return 1
    }

    async getAllProducts() {
        return await fetch("http://localhost:3000/api/products")
            .then(function (res) {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(function (value) {
                return value
            })
            .catch(function (err) {
                console.log(err)
                return {}
            })
    }

    async getProductById(id) {
        let url = `http://localhost:3000/api/products/${id}`
        return await fetch(url)
            .then(function (res) {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(function (value) {
                return value
            })
            .catch(function (err) {
                console.log(err)
                return {}
            })
    }

    /**
     * order: send an order request to the api, with the personal information of the
     * customer and the list of the items he wants to purchase.
     * @param {Contact} contact 
     * @param {Array} products 
     * @returns {string} orderId: the order id given back by the API.
     */
    async order(contact, products) {
        let body = {
            contact,
            products
        }

        return await fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(function (res) {
            if (res.ok) {
                return res.json()
            }
        })
        .then(function (value) {
            return value.orderId
        })
        .catch(function (err) {
            console.log(err)
            return {}
        })
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
    getCart() {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            cart = []
        }
        return cart.map((item) => {
            item.quantity = Number(item.quantity)
            return item
        })
    }

    /**
     * addToCart: add a product to the user's cart, stored locally in the localStorage.
     * 
     * @param {string} id 
     * @param {string} color 
     * @param {number} quantity 
     */
    addToCart(id, color, quantity) {
        let cart = this.getCart()
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

    /**
     * removeFromCart: remove from the cart stored in the localStorage the entry marching the id and the color.
     * @param {string} id 
     * @param {string} color 
     */
    removeFromCart(id, color) {
        let cart = this.getCart()
        for (let i = 0; i < cart.length; ++i) {
            if (cart[i].id === id && cart[i].color === color) {
                cart.splice(i, 1)
                break
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}
