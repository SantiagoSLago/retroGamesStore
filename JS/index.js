
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
let shopItems = document.querySelector('.btn-shopping-items');
let items = shopItems.innerText;
let user = JSON.parse(localStorage.getItem("user"));
let canvasBody = document.querySelector('.item-list');
let deleteIcons;




const snakeVideogame = new VideoGame("Snake", 2300);
const superMarioVideogame = new VideoGame("Super Mario", 1200);
let videogames = [snakeVideogame, superMarioVideogame];






/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Functions /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

function checkLoguedUser() {
    if (localStorage.getItem("user") != null) {
        console.log("Usuario logueado")
    } else {
        alert("Please Log In or Sign In to buy")
        setTimeout(() => {
            window.location.href = "templates/logIn.html";
        }, 2);
    }
}

function drawUsernameInBanner() {


    if (user != null) {
        welcomeBanner.innerHTML += `<h2>${user.username}</h2>`
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
    items++;
    shopItems.innerText = `${items}`
    let videogameName = event.target.value
    for (const game of videogames) {
        if (game.name === videogameName) {
            user.shoppingCart.products.push(game)
        }
    }
    drawCartItems(user.shoppingCart.products)
}


function drawCartItems(products) {

    canvasBody.innerHTML = '';

  
    for (const product of products) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<i class="fa-solid fa-circle-minus delete-icon" value="${product.name}">${product.name}</i>`;
        canvasBody.appendChild(listItem);
    }


    deleteIcons = document.querySelectorAll('.delete-icon');
    deleteIcons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            deleteCartItem(e, products)
        })
    })
}

function deleteCartItem(event, products) {

    let videogameName = event.target.innerText;
    let videogame;
    for (const game of videogames) {
        if (game.name === videogameName) {
            videogame = game;
            break;
        }
    }

    let index = user.shoppingCart.products.indexOf(videogame);
    user.shoppingCart.products.splice(index, 1);

    items--
    shopItems.innerText = `${items}`

    drawCartItems(products)

}




/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Events ////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


window.onload = () => {
    drawUsernameInBanner();
    setButtonsValue(videogames, buyBtns)


}

buyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        checkLoguedUser()
        addItemToCart(e)
    })
});




