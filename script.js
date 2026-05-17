let buttons = document.querySelectorAll(".card button");

let total =
localStorage.getItem("cartTotal") || 0;

total = parseInt(total);

let cartItems =
JSON.parse(localStorage.getItem("cartItems")) || [];


for(let i = 0; i < buttons.length; i++){

    buttons[i].onclick = function(){

        let productName =
        this.parentElement.querySelector("h3").innerText;

        let priceText =
        this.parentElement.querySelector("p").innerText;

        let productImage =
        this.parentElement.querySelector("img").src;

        let price =
        parseInt(priceText.replace("₹","").replace(",",""));

        total = total + price;

        localStorage.setItem("cartTotal", total);

        cartItems.push({
            name: productName,
            price: priceText,
            image: productImage
        });

        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );

        alert("Product Added To Cart");

    }

}


/* SHOW TOTAL */

if(document.getElementById("total")){

    document.getElementById("total").innerText =
    "₹" + total;

}


/* SHOW PRODUCTS IN CART */

let cartProducts =
document.getElementById("cart-products");

if(cartProducts){

    for(let i = 0; i < cartItems.length; i++){

        cartProducts.innerHTML += `

        <div class="card">

            <img src="${cartItems[i].image}">

            <h3>${cartItems[i].name}</h3>

            <p>${cartItems[i].price}</p>

        </div>

        `;
    }

}

/* CLEAR CART */

let clearButton =
document.getElementById("clear-cart");

if(clearButton){

    clearButton.onclick = function(){

        localStorage.removeItem("cartTotal");

        localStorage.removeItem("cartItems");

        location.reload();

    }

}