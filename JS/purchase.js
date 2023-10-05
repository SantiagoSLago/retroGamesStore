
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
        this.products = products,
            this.amount = amount,
            this.discount = discount;
    }
}


/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Constants /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


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

let discount1 = new Discount(1, "Employee", 15);
let discount2 = new Discount(2, "Family", 30);
let discount3 = new Discount(3, "Student", 45);
let discount4 = new Discount(4, "Special", 50);

let discounts = [discount1, discount2, discount3, discount4];


/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Functions /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

///Data Extraction Functions

function shoppingCartProducts(user) {
    if (user != null) {
        let products = user.shoppingCart.products
        return products;
    }
}

function shoppingCartAmount(user) {
    if (user != null) {
        let amount = user.shoppingCart.amount
        return amount;
    }
}

// Drawing functions

function drawCartItems(user) {

    let products = shoppingCartProducts(user)

    purchaseList.innerHTML = '';

    for (const product of products) {
        purchaseList.innerHTML += `<li>${product.name}</li>`
    }


}

function drawDiscounts(discounts) {
    discountList.innerHTML = '';

    for (const discount of discounts) {
        discountList.innerHTML += `<div>${discount.name} ${discount.percentage}% <input type="radio"/ id="${discount.name}" value="${discount.percentage}" name="discount" class="discounts"></div>`
    }

}

function drawCartAmount(amount) {




    cartAmount.innerHTML = '';
    cartAmount.innerHTML += `<p>$ ${amount}</p>`
}

function drawPurchaseBanner(user) {

    let products = user.shoppingCart.products;

    products.forEach(product => {
        purchaseFinalList.innerHTML += `<li>${product.name}`
    });
    console.log(user)

    purchaseFinalDiscount.innerHTML = `Discount Applied: ${user.shoppingCart.discount.percentage}%`
    purchaseFinalAmount.innerHTML = `Final Amount: $ ${user.shoppingCart.amount}`

}


//Business Logic Functions

function getDiscountAmount(user, percentage) {
    let amount = shoppingCartAmount(user)
    let newAmount = 0;
    let discount = (amount * percentage) / 100;
    newAmount = amount - discount;
    return newAmount
}

function applyDiscount(user) {
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
            console.log(user)
            drawCartAmount(getDiscountAmount(user, percentage))
        })
    });
}

function emptyShoppingCart(user) {
    user.shoppingCart.products = [];
    user.shoppingCart.amount = 0;
    user.shoppingCart.discount = {}
    localStorage.setItem("user", JSON.stringify(user))
}

function addPurchasesToUser(user) {
    let purchase = new Purchase(user.shoppingCart.products,
        user.shoppingCart.amount,
        user.shoppingCart.discount)
    user.purchases.push(purchase)
    localStorage.setItem("user", JSON.stringify(user))
}

function completePurchase(user) {
    let cartAmount = document.querySelector('.cart-amount').innerText
    let finalAmount = parseInt(cartAmount.replace('$', ''))
    user.shoppingCart.amount = finalAmount;
    //console.log(user)
    purchaseDetails.classList.toggle('hidden')
    purchaseBannerTitle.classList.toggle('hidden')

    drawPurchaseBanner(user)
    addPurchasesToUser(user)
    emptyShoppingCart(user)
    setTimeout(() => {
        window.location.href = "/index.html"
    }, 4000);



}


/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Events ////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


window.onload = () => {
    drawCartItems(user)
    drawDiscounts(discounts)
    drawCartAmount(shoppingCartAmount(user))
    applyDiscount(user)
}

purchaseBtn.addEventListener('click', (e) => {
    e.preventDefault()
    completePurchase(user)
})