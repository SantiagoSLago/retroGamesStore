
/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Clases ////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

class Discount {
    constructor(id, name, percentage) {
        this.id = id,
            this.name = name,
            this.percentage = percentage;

    }
}

class ShoppingCart {

    constructor() {
        this.products = [],
            this.amount = 0,
            this.discount = {};
    }

}

class Purchase {
    constructor(products, amount, discount) {
        this.id = this.generateId(),
            this.products = products,
            this.amount = amount,
            this.discount = discount;
        this.dateTime = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    }


    generateId() {
        return Math.floor(Math.random() * 10000) + 1;
    }
}


/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Constants /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

const DateTime = luxon.DateTime;
let purchaseList = document.querySelector('.purchase-list')
let discountList = document.querySelector('.discount-list')
let cartAmount = document.querySelector('.cart-amount')
let purchaseBtn = document.querySelector('.buy-btn')
let banner = document.querySelector('.welcome-banner')
let purchaseBannerTitle = document.querySelector('.complete-purchase')
let purchaseDetails = document.querySelector('.purchase-details')
let purchaseFinalList = document.querySelector('.purchase-final-list')
let purchaseFinalDiscount = document.querySelector('.purchase-discount')
let purchaseFinalAmount = document.querySelector('.final-amount')



const user = JSON.parse(localStorage.getItem("user"));


/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Functions /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

///Data Extraction Functions

function shoppingCartProducts(user) {//--> Extrae los prouctos del carrito
    return user != null ? user.shoppingCart.products : null;
}

function shoppingCartAmount(user) {//--> Extrae que el monto del carrito
    return user != null ? user.shoppingCart.amount : null;
}

//Async data extraction functions

async function getAllDiscounts(discountsUrl){//--> Consulta los descuentos en la BD
    let discounts = await fetch(discountsUrl);
    return await discounts.json();
}

// Drawing functions //

function drawCartItems(user) {//--> Dibuja los productos del carrito en la tarjeta de compra
    let products = shoppingCartProducts(user)

    purchaseList.innerHTML = '';

    for (const product of products) {
        purchaseList.innerHTML += `<li>${product.name}</li>`
    }
}

function drawCartAmount(amount) {//--> Dibuja el monto del carrito en el banner de compra
    cartAmount.innerHTML = '';
    cartAmount.innerHTML += `<p>$ ${amount}</p>`
}

function drawPurchaseBanner(user) {//--> Dibuja la compra realizada en el banner de compra
    
    let products = shoppingCartProducts(user)
    
    products.forEach(product => {
        purchaseFinalList.innerHTML += `<li>${product.name}`
    });
    
    purchaseFinalDiscount.innerHTML = `Discount Applied: ${user.shoppingCart.discount.percentage}%`
    purchaseFinalAmount.innerHTML = `Final Amount: $ ${user.shoppingCart.amount}`
    
}

//Async drawing functions

async function drawDiscounts(discountsUrl) {//--> Dibuja los descuentos en la tarjeta de descuentos

let discounts = await getAllDiscounts(discountsUrl);
console.log(discounts)
    discountList.innerHTML = '';

    for (const discount of discounts) {
        discountList.innerHTML += `<div>${discount.name} ${discount.percentage}% <input type="radio"/ id="${discount.name}" value="${discount.percentage}" name="discount" class="discounts"></div>`
    }


    applyDiscount(user,discounts)

}

//Business Logic Functions

function getDiscountAmount(user, percentage) {//--> Calcula y devuelve el monto a descontar basado en el porcentaje y el monto del carrito
    let amount = shoppingCartAmount(user)
    let newAmount = 0;
    let discount = (amount * percentage) / 100;
    newAmount = amount - discount;
    return newAmount
}

function applyDiscount(user,discounts) {//--> Aplica el descuento seleccionado al monto del carrito y ordena que se lo muestre por pantalla
    let discountsInputs = document.querySelectorAll('.discounts');
    let amount = shoppingCartAmount(user)
    let percentage = 0;


    discountsInputs.forEach(button => {

        button.addEventListener('click', (e) => {
            percentage = parseInt(e.target.value)

            discounts.forEach(discount => {
                if (percentage === discount.percentage) {
                    user.shoppingCart.discount = discount

                }
            });
            drawCartAmount(getDiscountAmount(user, percentage))
        })
    });
}

function emptyShoppingCart(user) {//--> Vacia el carrito del usuario
    user.shoppingCart.products = [];
    user.shoppingCart.amount = 0;
    user.shoppingCart.discount = {}
    localStorage.setItem("user", JSON.stringify(user))
}

function addPurchasesToUser(user) {//--> Agrega una compra realizada a la lista de compras realizadas por el usuario.
    let purchase = new Purchase(user.shoppingCart.products,
        user.shoppingCart.amount,
        user.shoppingCart.discount)
    user.purchases.push(purchase)
    localStorage.setItem("user", JSON.stringify(user))
}

function completePurchase(user) {//--> Completa la compra y redirecciona al inicio.
    let cartAmount = document.querySelector('.cart-amount').innerText
    let finalAmount = parseInt(cartAmount.replace('$', ''))
    user.shoppingCart.amount = finalAmount;
    purchaseDetails.classList.toggle('hidden')
    purchaseBannerTitle.classList.toggle('hidden')

    drawPurchaseBanner(user)
    addPurchasesToUser(user)
    emptyShoppingCart(user)
    setTimeout(() => {
        window.location.href = "../index.html"
    }, 3000);



}




/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Events ////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


window.onload = () => {
    drawCartItems(user)
    drawDiscounts("../DB/discounts.json")
    drawCartAmount(shoppingCartAmount(user))
}

purchaseBtn.addEventListener('click', (e) => {
    e.preventDefault()
    completePurchase(user)
})

