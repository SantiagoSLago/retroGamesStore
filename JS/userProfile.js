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

console.log(productList)




/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Functions /////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

function drawBanner(user) {
    usernameTitle.innerText = user.username;
}

function drawPersonalDataCard(user) {
    userDataCardBody.innerHTML = `
<p> Username: ${user.username}</p>
<p> Email: ${user.email}</p>
<p> Password: ${user.password}</p>
`
}

function drawUserPurchases(user) {

    let userPurchases = user.purchases;
    let counter = 0;
    for (let i = 0; i < userPurchases.length; i++) {

        purchaseDataCardBody.innerHTML += `
         <div>
         <p>Purchase Amount: $${userPurchases[i].amount}</p>
         <p>Discount Applied: ${userPurchases[i].discount.name} ${userPurchases[i].discount.percentage}% </p>
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


/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////// Events ////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

console.log(user)


window.onload = () => {
    drawPersonalDataCard(user)
    drawUserPurchases(user)
}

console.log(user.purchases)

