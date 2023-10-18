
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


let welcomeBanner = document.querySelector('.welcome-banner');
let gameCardsSection = document.querySelector('.cards-section')
let shopItems = document.querySelector('.btn-shopping-items');
let products = shoppingCartProducts(JSON.parse(localStorage.getItem("user")))
let user = JSON.parse(localStorage.getItem("user"));
let canvasBody = document.querySelector('.item-list');
let cartAmount = document.querySelector('.shopping-cart-amount-container');
let buyButton = document.querySelector('.btn-purchase');
let logoutButton = document.querySelector('.btn-logout');
let deleteIcons;

// Videogames//





/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Functions /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////



// Funciones de extraccion de data //

function shoppingCartProducts(user) {//--> Extrae todos los productos del carrito del usuario
    return user != null ? user.shoppingCart.products : null;
}

function shoppingCartAmount(user) {//--> Extrae el monto del carrito del usuario
    return user != null ? user.shoppingCart.amount : null;
}

// Funciones de extraccion de data asincronicas //

async function getAllVIdeogames(vGamesUrl) {//--> Retorna un Json con todos los videojuegos de la BD
    let items = await fetch(vGamesUrl);
    return await items.json();
}

// Funciones de dibujo de HTML //

function drawUsernameInBanner(user) {//--> Dibuja el numbre del usuario en el banner principal
    user != null ? welcomeBanner.innerHTML += `<h2>${user.username}</h2>` : null;
}

function drawItemsNumber(number) {//--> Dibuja el numero de items del carrito en la esquina superior derecha
    shopItems.innerText = `${number}`
}


function drawCartItems(user) {//--> Dibuja los items del carrito en el banner lateral


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

function drawCartAmount(amount) {//--> Dibuja el monto del carrito del usuario
    cartAmount.innerHTML = '';
    cartAmount.innerHTML += `<p>$ ${amount}</p>`
}

//Async drawing functions Functions

/* 1- Consulta asincronica a la BD de videojuegos
   2- Dibuja las tarjetas de cada videojuego
   3- Asigna a cada boton de compra de la tarjeta el valor del nombre del videojuego
   */
async function drawGameCards(vGamesUrl) {
    let vGames = await getAllVIdeogames(vGamesUrl);
    vGames.forEach(game => {
        gameCardsSection.innerHTML += `
        <div class="card-container">
        <div class="joystick-container">
            <img src="img/joystick.png" alt="">
            <p>Price: $${game.price}</p>
        </div>
        <div class="display-container">
            <div class="screen-container">
                <h4>${game.name}</h4>
            </div>
            <div class="button-container">
                <button class="btn-gameCard btn-buy" value="${game.name}">Add to Cart</button>
                <button class="btn-gameCard btn-demo" value="${game.name}">Demo</button>
            </div>
        </div>
    </div>
        `
    });


    //Add Items to cart
    let buyBtns = document.querySelectorAll('.btn-buy');
    buyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            checkLoguedUser()
            addItemToCart(e, vGames)
        })
    });

    let demoBtns = document.querySelectorAll('.btn-demo')
    demoBtns.forEach(btn => {
        btn.addEventListener('click',(e)=>{
            if(checkLoguedUser()){
                redirectToGameDemo(e)
            }
            
            
        })
    });


}

//Business Logic Functions

function checkLoguedUser() {//--> Chequea si el usuario esta logueado o no
    if (localStorage.getItem("user") != null) {
        return true;
    } else {

        Swal.fire({
            text: 'Please Log In or Create Account to continue',
            icon: 'error',
            confirmButtonText: 'Go'
        })
            .then((result) => {
                result.isConfirmed ? window.location.href = "./templates/logIn.html" : null;
            })

    }
}

function addItemToCart(event, videogames) {//--> Agrega un item al carrito


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

function deleteCartItem(event, videogames) {//--> Elimina un item del carrito

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

function increaseCartAmount(product) {//--> Aumenta el valor/monto del carrito
    user.shoppingCart.amount += product.price;
}

function decreaseCartAmount(product) {//--> Disminuye el valor/monto del carrito
    user.shoppingCart.amount -= product.price;
}

function logOut() {//--> Funcion de logout (por ahora solo redirecciona al log in)
    window.location.href = "./templates/logIn.html"
}

function redirectToGameDemo(event){
    if(event.target.value === "Snake"){
        window.location.href = "./templates/snakeGame.html"
    }
}




/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Events ////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

window.onload = () => {
drawUsernameInBanner(user);
drawGameCards("DB/videogames.json")
drawCartItems(user)
drawItemsNumber(shoppingCartProducts(user).length)
}

buyButton.addEventListener('click', (e) => {
    user.shoppingCart.products.length > 0
        ? window.location.href = "./templates/purchase.html"
        :
        Toastify({
            text: "Se debe agregar al menos un elemento al carrito",
            duration: 2000,
            position: 'center',
            style: {
                background: '#8F0000',
                border: '1px solid black',
            }
        }).showToast();
})

logoutButton.addEventListener('click', (e) => {
    logOut();
})

console.log(user)


