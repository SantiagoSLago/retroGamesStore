/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Clases/////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

class VideoGame {

    cosntructor(name, price) {
        this.name = name,
            this.price = price
    }
}


class ShoppingCart {

    constructor() {
        this.products =[],
        this.amount =0,
        this.discount ={};
    }

}




class User {

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.score = 0,
        this.shoppingCart = new ShoppingCart(),
        this.purchases = [];
    }
}


let user;


/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Constants /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


let btnSignIn = document.getElementById('btn-signIn');
let btnLogIn = document.getElementById('btn-logIn')
let usernameLog = document.getElementById('usernameLog')
let passwordLog = document.getElementById('passwordLog');
let usernameSign = document.getElementById('usernameSign');
let emailSign = document.getElementById('emailSign');
let password1Sign = document.getElementById('password1Sign');
let password2Sign = document.getElementById('password2Sign');




/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Functions /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


function checkRepeatPassword(password1, password2) {
    if (password1 !== password2) {
        return false
    }
    return true;
}

function createUser(data) {
    if (!checkRepeatPassword(data.password1, data.password2)) {
        alert("Los passwords no coinciden, por favor corregir")
        return null;
    } else {
        user = new User(data.username, data.email, data.password1)
        return user;
    }
}


function saveUserinStorage(createUser) {
    const user = createUser;
    const stringedUser = JSON.stringify(user)
    if (user != null) {
        localStorage.setItem("user", stringedUser);
        alert("Usuario guardado con exito")
        window.location.href = "https://santiagoslago.github.io/retroGamesStore/index.html"
    }
}


function logIn() {

    let user = JSON.parse(localStorage.getItem("user"))

    let data = {
        username: usernameLog.value,
        password: passwordLog.value
    }

    if (dataUserComparision(data, user)) {
        alert("Log In Succesfull")
        window.location.href = "https://santiagoslago.github.io/retroGamesStore/index.html"
    }

}

function dataUserComparision(data, user) {

    if (user == null) {
        alert("User not registered")
    }

    if (data.username !== user.username) {
        alert("Usuario no coincide");
        return false
    } else if (data.password !== user.password) {
        alert("Contraseña no coincide")
        return false;
    }
    return true;
}


/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Events ////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


//Sign in
btnSignIn.addEventListener("click", (e) => {
    e.preventDefault()

    let data = {
        username: usernameSign.value,
        email: emailSign.value,
        password1: password1Sign.value,
        password2: password2Sign.value
    }

    saveUserinStorage(createUser(data))

})

//Log In
btnLogIn.addEventListener("click", (e) => {
    e.preventDefault()
    logIn()
})





