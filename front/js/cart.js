import Repository from "./Repository.js"

const repository = new Repository()

let itemsSectionHTML = document.getElementById('cart__items')
let totalQuantityHTML = document.getElementById("totalQuantity")
let totalPriceHTML = document.getElementById("totalPrice")

let cartItems = repository.getCart()
let products = {}

let totalQuantity = 0
let totalPrice = 0

function addItemCardToDom(cartItem) {
  let product = products[cartItem.id]
  let itemHTML = document.createElement("item")
  itemHTML.innerHTML = `
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
  itemHTML.getElementsByClassName("deleteItem")[0]
    .addEventListener("click", () => {
      console.log(cartItem.color)
      repository.removeFromCart(cartItem.id, cartItem.color)
      itemsSectionHTML.removeChild(itemHTML)
    })
  itemHTML.getElementsByClassName("itemQuantity")[0]
    .addEventListener("change", (value) => {
      let newQuantity = Number(event.target.value)
      if (quantity < repository.getMinOrderQuantity() ||
        quantity > repository.getMaxOrderQuantity()) {
        alert(`Le nombre d'articles doit être compris entre ${repository.getMinOrderQuantity()} et ${repository.getMaxOrderQuantity()}.`)
        event.target.value = repository.getMaxOrderQuantity()
      } else {
        repository.addToCart(cartItem.id, cartItem.color, newQuantity)
      }
    })
  itemsSectionHTML.appendChild(itemHTML)
}

function updateTotals() {
  totalQuantity = cartItems.reduce((acc, item) => {
    return acc + item.quantity
  })
  totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.price
  })
  totalQuantityHTML.textContent = totalQuantity
  totalPriceHTML.textContent = totalPrice
}

async function loadProductsData() {
  for (let i in cartItems) {
    let cartItem = cartItems[i]
    await repository
      .getProductById(cartItem.id)
      .then((product) => {
        products[product._id] = product
        addItemCardToDom(cartItem)
        updateTotals()
      })
  }
}

loadProductsData()