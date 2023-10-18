/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Constants /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


let user = JSON.parse(localStorage.getItem("user"));
let usernameTitle = document.getElementById('username');
let userDataCardBody = document.querySelector('.user-data');
let purchaseDataCardBody = document.querySelector('.user-purchases');
let productList = document.querySelector('.purchase-products');
let updateBtn = '';
let formContainer = document.querySelector('.edit-user-data');


/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Functions /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

// Drawing functions //

function drawBanner(user) {
    usernameTitle.innerText = user.username;
}

function drawPersonalDataCard(user) {//--> Dibuja datos personales del usuario
    userDataCardBody.innerHTML = `
<p> Username: ${user.username}</p>
<p> Email: ${user.email}</p>
<p> Password: ${user.password}</p>
<button class="btn-update-profile">Update User</button>
`




    updateBtn = document.querySelector('.btn-update-profile');

    updateBtn.addEventListener('click', (e) => {
        formContainer.classList.toggle('hidden')
    })






}

function drawUserPurchases(user) {//-->Dibuja las compras realizadas por el usuario

    let userPurchases = user.purchases;
    let counter = 0;
    for (let i = 0; i < userPurchases.length; i++) {

        purchaseDataCardBody.innerHTML += `
         <div>
         <ul style="list-style-type: square";>
         <li>Id: ${userPurchases[i].id}</li>
         <li>Purchase Amount: $${userPurchases[i].amount}</li>
         <li>Discount Applied: ${userPurchases[i].discount.name} ${userPurchases[i].discount.percentage}% </li>
         <li>Date Time: ${userPurchases[i].dateTime}</li>
         </ul>
         `
        for (let e = 0; e < userPurchases[i].products.length; e++) {
            purchaseDataCardBody.innerHTML +=
                `
            <li>${userPurchases[i].products[e].name} $${userPurchases[i].products[e].price}</li>
            `
        }
        purchaseDataCardBody.innerHTML += `
        </div>
        <hr>
        </div>`
    }



}


/*
 1- Dibuja el formulario de modificacion del usuario
 2- Agrega event listener al boton update
 3- Llama a la funcion update en el caso de presionar el boton
*/
function drawUpdateForm(user) {

    formContainer.innerHTML = `
<form action="" class="update-form">
<div>
<label for="">Username:</label>
<input type="text" placeholder="${user.username}" id="input-username">
</div>
<div>
<label for="">Email:</label>
<input type="email" placeholder="${user.email}" id="input-email">
</div>
<div>
<label for="">Password:</label>
<input type="password" placeholder="${user.password}" id="input-password1">
</div>
<div>
<label for="">RepeatPassword:</label>
<input type="password" placeholder="${user.password}" id="input-password2">
</div>
<button class="btn-save-profile">Save</button>
</form>
`

    let btnSaveProfile = document.querySelector('.btn-save-profile');
    btnSaveProfile.addEventListener('click', (e) => {
        e.preventDefault();

        data = createData();
        passwordControl(data.password1, data.password2)
            ?
            updateUser(data, user)
            :
            Toastify({
                text: "Las contraseñas deben ser identicas",
                duration: 2000,
                position: 'center',
                gravity:'top',
                style:{
                    background: '#8F0000',
                    border: '1px solid black',
                }
            }).showToast();
    })
}

// Business Logic functions //

function passwordControl(password1, password2) {//--> Controla que las dos passwords del formulario de update sean identicas
    return password1 !== password2 ? false : true;
}

function updateUser(data, user) {//--> Modifica el usuario con los nuevos datos del formulario
    data.username !== '' ? user.username = data.username : false;
    data.email !== '' ? user.email = data.email : false;
    data.password1 !== '' ? user.password = data.password1 : false;
    localStorage.setItem("user", JSON.stringify(user))
    window.location.reload();
}

function createData() {//--> Crea la data con la que se completa el formulario de update
    let inputUsername = document.getElementById('input-username');
    let inputEmail = document.getElementById('input-email');
    let inputPassword1 = document.getElementById('input-password1');
    let inputPassword2 = document.getElementById('input-password2');

    const data = {
        username: inputUsername.value,
        email: inputEmail.value,
        password1: inputPassword1.value,
        password2: inputPassword2.value
    }
    return data;
}



/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Events ////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

window.onload = () => {
    drawPersonalDataCard(user)
    drawUserPurchases(user)
    drawUpdateForm(user)
}








