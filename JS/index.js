
/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Clases/////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


class VideoGame {
    constructor(name, price) {
        this.name = name,
            this.price = price
    }
}



/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Constants /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

let buyBtns = document.querySelectorAll('.btn-buy');
let welcomeBanner = document.querySelector('.welcome-banner');
let gameCardsSection = document.querySelector('.cards-section')
let shopItems = document.querySelector('.btn-shopping-items');
let products = shoppingCartProducts(JSON.parse(localStorage.getItem("user")))
let user = JSON.parse(localStorage.getItem("user"));
let canvasBody = document.querySelector('.item-list');
let cartAmount = document.querySelector('.shopping-cart-amount-container');
let buyButton = document.querySelector('.btn-offcanvas-buy');
let deleteIcons;





const snakeVideogame = new VideoGame("Snake", 2300);
const superMarioVideogame = new VideoGame("Super Mario", 1200);
const minesSeekerVideogame = new VideoGame("MineSeeker", 1150);
const spaceInvadersVideogame = new VideoGame("Space Invaders", 1300);
let videogames = [snakeVideogame, superMarioVideogame, minesSeekerVideogame, spaceInvadersVideogame];


if(user != null){

    console.log(user.purchases)
}

console.log(user)



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

///HTML drawing Functions



function drawUsernameInBanner() {
    if (user != null) {
        welcomeBanner.innerHTML += `<h2>${user.username}</h2>`
    }
}

function drawItemsNumber(number) {
        shopItems.innerText = `${number}`
}

function drawCartItems(user) {

    if (user != null) {
        let products = shoppingCartProducts(user)
        canvasBody.innerHTML = '';



        products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<i class="fa-solid fa-circle-minus delete-icon" value="${product.name}">${product.name}</i>`;
            canvasBody.appendChild(listItem);
        });

        deleteIcons = document.querySelectorAll('.delete-icon');
        deleteIcons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                deleteCartItem(e, products)
            })
        })
        drawCartAmount(shoppingCartAmount(user))
    }


}

function drawCartAmount(amount) {
    cartAmount.innerHTML = '';
    cartAmount.innerHTML += `<p>$ ${amount}</p>`
}

//Business Logic Functions

function checkLoguedUser() {
    if (localStorage.getItem("user") != null) {
    } else {
        alert("Please Log In or Sign In to buy")
        setTimeout(() => {
            window.location.href = "https://santiagoslago.github.io/retroGamesStore/templates/logIn.html";
        }, 2);
    }
}

function setButtonsValue(videogames, buttons) {
    let counter = 0;
    buttons.forEach(button => {
        button.value = videogames[counter].name
        counter++
    });

}

function addItemToCart(event) {


    let videogameName = event.target.value
    for (const game of videogames) {
        if (game.name === videogameName) {
            user.shoppingCart.products.push(game)
            increaseCartAmount(game)
        }
    }
    localStorage.setItem("user", JSON.stringify(user))
    drawCartItems(user)
    drawItemsNumber(shoppingCartProducts(user).length)
}

function deleteCartItem(event, products) {

    let videogameName = event.target.innerText;
    let videogame;
    for (const game of videogames) {
        if (game.name === videogameName) {
            videogame = game;
            decreaseCartAmount(game)
            break;
        }
    }

    let index = user.shoppingCart.products.indexOf(videogame);
    user.shoppingCart.products.splice(index, 1);
    localStorage.setItem("user", JSON.stringify(user))




    drawCartItems(user)
    drawItemsNumber(shoppingCartProducts(user).length)


}

function increaseCartAmount(product) {
    user.shoppingCart.amount += product.price;
}

function decreaseCartAmount(product) {
    user.shoppingCart.amount -= product.price;
}


/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Events ////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


window.onload = () => {
    drawUsernameInBanner();
    setButtonsValue(videogames, buyBtns)
    drawCartItems(user)
    drawItemsNumber(shoppingCartProducts(user).length)
}

buyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        checkLoguedUser()
        addItemToCart(e)
    })
});

buyButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href:"https://santiagoslago.github.io/retroGamesStore/templates/purchase.html";
    
})




