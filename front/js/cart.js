import Contact from "./Contact.js"
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
  console.log(products)
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
      updateTotals()
    })
  itemHTML.getElementsByClassName("itemQuantity")[0]
    .addEventListener("change", (value) => {
      let newQuantity = Number(event.target.value)
      if (newQuantity < repository.getMinOrderQuantity() ||
        newQuantity > repository.getMaxOrderQuantity()) {
        alert(`Le nombre d'articles doit être compris entre ${repository.getMinOrderQuantity()} et ${repository.getMaxOrderQuantity()}.`)
        event.target.value = repository.getMaxOrderQuantity()
      } else {
        repository.addToCart(cartItem.id, cartItem.color, newQuantity)
      }
      updateTotals()
    })
  itemsSectionHTML.appendChild(itemHTML)
}

function updateTotals() {
  cartItems = repository.getCart()
  totalQuantity = cartItems.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)
  totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.quantity * products[item.id].price
  }, 0)
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

async function order() {
  let firstName = document.getElementById("firstName").value
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
  let lastName = document.getElementById("lastName").value
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
  let address = document.getElementById("address").value
  let addressErrorMsg = document.getElementById("addressErrorMsg")
  let city = document.getElementById("city").value
  let cityErrorMsg = document.getElementById("cityErrorMsg")
  let email = document.getElementById("email").value
  let emailErrorMsg = document.getElementById("emailErrorMsg")

  let nameRegex = new RegExp(/^[a-zA-Z\D ]{1,20}$/i)
  let addressRegex = new RegExp(/^[a-zA-Z ]{1,50}$/i)
  let emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/i)
  console.log(nameRegex.test("antoine"), "true")
  console.log(nameRegex.test("Antoine"), "true")
  console.log(nameRegex.test("ant1oine"), "false")
  console.log(nameRegex.test(""), "false")
  console.log(addressRegex.test("Rte de la Corniche"), "true")
  console.log(addressRegex.test(""), "false")
  console.log(emailRegex.test("antoine@example.com"), "true")
  console.log(emailRegex.test("antoine.l@example.com"), "true")
  console.log(emailRegex.test("antoine"), "false")
  console.log(emailRegex.test(""), "false")

  if (!nameRegex.test(firstName)) {
    firstNameErrorMsg.textContent
      = "Ce champ ne doit contenir qu'entre 1 et 20 lettres."
    return
  }
  if (!nameRegex.test(lastName)) {
    lastNameErrorMsg.textContent
      = "Ce champ ne doit contenir qu'entre 1 et 20 lettres."
    return
  }
  if (!addressRegex.test(address)) {
    addressErrorMsg.textContent = "Ce champ ne doit contenir qu'entre 1 et 50 lettres ou chiffres."
    return
  }
  if (!addressRegex.test(city)) {
    cityErrorMsg.textContent = "Ce champ ne doit contenir qu'entre 1 et 50 lettres ou chiffres."
    return
  }
  if (!emailRegex.test(email)) {
    emailErrorMsg.textContent = "Ce champ ne doit être une adresse email valide (ex : nom@exemple.com)."
    return
  }

  let orderId = await repository.order(
    new Contact(
      firstName,
      lastName,
      address,
      city,
      email
    ),
    cartItems.map((item) => {
      return item.id
    })
  )
  window.open("../html/confirmation.html")
}

await loadProductsData()
updateTotals()

document.getElementById("order").addEventListener("click", (event) => {
  order()
})
