import Repository from "./Repository.js"

const repository = new Repository()

let itemsSectionHTML = document.getElementById('cart__items')
let totalQuantityHTML = document.getElementById("totalQuantity")
let totalPriceHTML = document.getElementById("totalPrice")

let cartItems = repository.getCart()

let totalQuantity = 0
let totalPrice = 0

for (let i in cartItems) {
  let cartItem = cartItems[i]
  await repository
    .getProductById(cartItem.id)
    .then((product) => {
      itemsSectionHTML.innerHTML += `
            <article class="cart__item" data-id="${product._id}" data-color="${cartItem.color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${cartItem.color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
      totalQuantity += cartItem.quantity
      totalPrice += product.price * cartItem.quantity
    })
}

totalQuantityHTML.textContent = totalQuantity
totalPriceHTML.textContent = totalPrice