import Repository from "./Repository.js"

const repository = new Repository()

let imageHTML = document.getElementsByClassName("item__img")[0]
let titleHTML = document.getElementById("title")
let descriptionHTML = document.getElementById("description")
let colorsHTML = document.getElementById("colors")

repository
    .getProductById(new URL(window.location.href).searchParams.get("id"))
    .then((product) => {
        imageHTML.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
        titleHTML.textContent = product.name
        descriptionHTML.textContent = product.description

        let colorOptions = ""
        for (let i in product.colors) {
            colorOptions += `
            <option value="${product.colors[i]}">${product.colors[i]}</option>`
        }
        colorsHTML.innerHTML += colorOptions
    })