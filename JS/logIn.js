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
        this.products = [],
            this.amount = 0,
            this.discount = {};
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


/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Constants /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


let user;
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

// Funciones de extraccion de data asincronicas //

async function getAllUsers(usersUrl) {//--> Devuelve un Json con todos los usuarios de la BD
    let users = await fetch(usersUrl)
    return await users.json();

}

// Funciones de control de los formularios //

function signInFormDataCheck(data) {//--> Chequea que la data del formulario de Sign In no se encuentre vacia

    if (data.username === '') {
        return false;
    } else if (data.email === '') {
        return false;
    } else if (data.password1 === '') {
        return false;
    } else if (data.password2 === '') {
        return false
    }
    return true;
}

function logInFormDataCheck(data) {//--> Chequea que la data del formulario de Log In no se encuentre vacia
    if (data.username === '') {
        return false
    } else if (data.password === '') {
        return false
    }
    return true;
}


function checkRepeatPassword(password1, password2) {//--> Chequea si los passwords del form de Sign In son identicos
    return password1 !== password2 ? false : true;
}

// Funciones de control de Registros de Usuarios ( BD y LocalStorage) // 

function checkLocalStorage(data) {//--> Chequea la existencia de un usuario el el storage

    let user = JSON.parse(localStorage.getItem("user"))

    return user ? userDataCheck(data, user) : false
}

async function checkDataBase(data, usersUrl) {//--> Chequea la existencia de un usuario en el BD en el caso de existir le asigna campos faltantes y lo devuelve

    let users = await getAllUsers(usersUrl)
    let registeredUser = null;

    users.forEach(user => {
        if (userDataCheck(data, user)) {
            registeredUser = {
                username: user.username,
                email: user.email,
                password:user.password,
                score:0,
                shoppingCart: new ShoppingCart(),
                purchases:[]
            };
        }
    });
    return registeredUser;

}

function userDataCheck(data, user) {//--> Funcion que compara data ingresada con la almacenada en el LocalSt, utilizada en el Log In
    if ((user.username === data.username) && (user.password === data.password)) {
        return true;
    } else {
    } return false;
}

// Funciones de Persistencia //

function createUser(data) {//--> Crea un nuevo usuario y lo retorna luego de hacer los controles de formulario
    if (!signInFormDataCheck(data)) {
        Swal.fire({
            text: 'Completar todos los campos del formulario',
            icon: 'error',
            confirmButtonText: 'Go'
        })
        return null;
    }
    const user = !checkRepeatPassword(data.password1, data.password2) ? null : new User(data.username, data.email, data.password1)

    if (user == null) {
        Swal.fire({
            title: 'Error',
            text: 'Las contraseñas no coinciden',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    return user;
}

function saveUserinDatabase(user) {//--> Recibe un usuario y lo guarda en la database (Simulada por el LocalStorage) (en realidad recibe a la funcion que crea un usuario)
    if (user != null) {   
        saveUserInStorage(user)
        Swal.fire({
            text: 'Usuario guardado con exito',
            icon: 'success',
            confirmButtonText: 'Go'
        })
            .then((result) => {
                result.isConfirmed ? window.location.href = "../index.html" : null;
                // window.location.href = "https://santiagoslago.github.io/retroGamesStore/index.html"

            })

    }
}

function saveUserInStorage(user) {//--> Guarda un usario en el localStorage
    const stringedUser = JSON.stringify(user)
    localStorage.setItem("user", stringedUser);
    const getUser = JSON.parse(localStorage.getItem("user"))
    return getUser ? true : false;

}

// Log In // 

async function logIn() {//--Funcion de Log In

    let data = {
        username: usernameLog.value,
        password: passwordLog.value
    }
    let usersUrl = "../DB/users.json"

    if (logInFormDataCheck(data)) {

        if (checkLocalStorage(data)) {
            Swal.fire({
                text: 'Log in succesful',
                icon: 'success',
                confirmButtonText: 'Go'
            })
                .then((result) => {
                   result.isConfirmed ? window.location.href = "../index.html" : null;
                    //window.location.href = "https://santiagoslago.github.io/retroGamesStore/index.html"
                })
        } else if (await checkDataBase(data, usersUrl) != null) {
            Swal.fire({
                text: 'Log in succesful',
                icon: 'success',
                confirmButtonText: 'Go'
            })
                .then( async () => {
                    user = await checkDataBase(data, usersUrl)                    
                    saveUserInStorage(user) ? window.location.href = "../index.html" : Swal.fire({
                        text: 'Error persistiendo al usuario en el storage',
                        icon: 'error',
                        confirmButtonText: 'Accept'
                    });
                    //window.location.href = "https://santiagoslago.github.io/retroGamesStore/index.html"
                })
        } else {
            Swal.fire({
                text: 'El usuario no se encuentra registrado',
                icon: 'error',
                confirmButtonText: 'Accept'
            })
        }
    } else {
        Swal.fire({
            text: 'Completar todos los campos del formulario',
            icon: 'error',
            confirmButtonText: 'Go'
        })
    }
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

    saveUserinDatabase(createUser(data))

})

//Log In
btnLogIn.addEventListener("click", (e) => {
    e.preventDefault()
    logIn()
})






