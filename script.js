let total = 0;
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

let cards = document.querySelectorAll(".card");


// PRODUCT SECTION OPERATIONS
for(let i = 0; i < cards.length; i++){

    let plusBtn = cards[i].querySelector(".plus");

    let minusBtn = cards[i].querySelector(".minus");

    let qtyText = cards[i].querySelector(".qty");

    let addCartBtn = cards[i].querySelector(".add-cart");

    if(plusBtn && minusBtn && qtyText && addCartBtn){

        let count = 1;


        // PLUS BUTTON
        plusBtn.onclick = function(){

            count++;

            qtyText.innerText = count;

        }

        // MINUS BUTTON
        minusBtn.onclick = function(){

            if(count > 1){

                count--;

                qtyText.innerText = count;

            }

        }

        // ADD TO CART
       // ADD TO CART
addCartBtn.onclick = function(){

    // CHANGE BUTTON VALUE
    addCartBtn.innerHTML = "Added ✓";

    // DISABLE BUTTON
    addCartBtn.disabled = true;



    let productName =
    cards[i].querySelector("h3").innerText;

    let priceText =
    cards[i].querySelector("p").innerText;

    let productImage =
    cards[i].querySelector("img").src;

    let found = false;



    // CHECK IF PRODUCT ALREADY EXISTS
    for(let j = 0; j < cartItems.length; j++){

        if(cartItems[j].name == productName){

            cartItems[j].quantity =
            cartItems[j].quantity + count;

            found = true;

        }

    }



    // ADD NEW PRODUCT
    if(found == false){

        cartItems.push({

            name: productName,
            price: priceText,
            image: productImage,
            quantity: count

        });

    }



    // SAVE TO LOCAL STORAGE
    localStorage.setItem(

        "cartItems",
        JSON.stringify(cartItems)

    );

}

    }

}

// CART RENDERING
let cartProducts =
document.getElementById("cart-products");

if(cartProducts){

    cartProducts.innerHTML = "";

    total = 0;



    for(let i = 0; i < cartItems.length; i++){

        let price = parseInt(

            cartItems[i].price
            .replace("₹","")
            .replace(",","")

        );



        total =
        total + (price * cartItems[i].quantity);



        cartProducts.innerHTML += `

        <div class="card">

            <img src="${cartItems[i].image}">

            <h3>${cartItems[i].name}</h3>

            <p>${cartItems[i].price}</p>

            <h4>
                Quantity : ${cartItems[i].quantity}
            </h4>

            <div class="cart-buttons">

                <button onclick="decreaseQty(${i})">
                    -
                </button>

                <span class="cart-qty">
                    ${cartItems[i].quantity}
                </span>

                <button onclick="increaseQty(${i})">
                    +
                </button>

            </div>

        </div>

        `;

    }

}

// SHOW TOTAL
if(document.getElementById("total")){

    document.getElementById("total").innerText =
    "₹" + total;

}
// INCREASE QUANTITY
function increaseQty(index){

    cartItems[index].quantity++;

    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );

    location.reload();

}

// DECREASE QUANTITY
function decreaseQty(index){

    cartItems[index].quantity--;

    if(cartItems[index].quantity <= 0){

        cartItems.splice(index,1);

    }

    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );

    location.reload();

}

// CLEAR CART

let clearButton =
document.getElementById("clear-cart");

if(clearButton){

    clearButton.onclick = function(){
        

        localStorage.removeItem("cartItems");

        location.reload();

    }

}

// LOAD MORE PRODUCTS
let loadMoreBtn =
document.getElementById("loadMoreBtn");

if(loadMoreBtn){

    loadMoreBtn.onclick = function(){

        document.getElementById("moreProducts")
        .style.display = "flex";

        loadMoreBtn.style.display = "none";

    }

}


// FILTER PRODUCTS
function filterProducts(category){

    let cards =
    document.querySelectorAll(".card");

    for(let i = 0; i < cards.length; i++){

        if(category == "all"){

            cards[i].style.display = "flex";

        }

        else if(cards[i].dataset.category == category){

            cards[i].style.display = "flex";

        }

        else{

            cards[i].style.display = "none";

        }

    }

}

// SORT PRODUCTS
function sortProducts(value){

    let products =
    document.querySelector(".products");

    let cards =
    Array.from(document.querySelectorAll(".card"));



    cards.sort(function(a,b){

        let priceA = parseInt(
            a.querySelector("p")
            .innerText
            .replace("₹","")
            .replace(",","")
        );

        let priceB = parseInt(
            b.querySelector("p")
            .innerText
            .replace("₹","")
            .replace(",","")
        );



        if(value == "low"){

            return priceA - priceB;

        }

        else{

            return priceB - priceA;

        }

    });


    products.innerHTML = "";

    for(let i = 0; i < cards.length; i++){

        products.appendChild(cards[i]);

    }

}


// PRODUCT POPUP

function openProduct(imageSrc){

    let popup =
    document.getElementById("product-popup");

    let popupImage =
    document.getElementById("popup-image");

    popup.style.display = "flex";

    popupImage.src = imageSrc;

}



function closeProduct(){

    document.getElementById("product-popup")
    .style.display = "none";

}

// LOGIN & SIGNUP SYSTEM


// SHOW SIGNUP FORM
function showSignup(){

    document.getElementById("form-title")
    .innerText = "Sign Up";

    document.getElementById("main-btn")
    .innerText = "Create Account";

    document.getElementById("signup-email")
    .style.display = "block";



    // CHANGE CHECKBOX TEXT
    let checkboxLabel =
    document.getElementById("checkboxLabel");

    if(checkboxLabel){

        checkboxLabel.innerText =
        "I accept the Terms and Conditions";

    }

}

// LOGIN BUTTON
let mainBtn =
document.getElementById("main-btn");

if(mainBtn){

    // AUTO FILL SAVED LOGIN
    let savedLogin =
    JSON.parse(localStorage.getItem("savedLogin"));

    if(savedLogin){

        document.getElementById("username").value =
        savedLogin.username;

        document.getElementById("password").value =
        savedLogin.password;

        document.getElementById("formCheckbox").checked = true;

    }

    mainBtn.onclick = function(){
        

        let formTitle =
        document.getElementById("form-title").innerText;

        let username =
        document.getElementById("username").value;

        let email =
        document.getElementById("signup-email").value;

        let password =
        document.getElementById("password").value;

        let checkbox =
        document.getElementById("formCheckbox").checked;

// SIGN UP

        if(formTitle == "Sign Up"){

            if(username == "" ||
               email == "" ||
               password == ""){

                alert("Please fill all fields!");

                return;

            }

            if(!checkbox){

                alert(
                    "Please accept Terms & Conditions"
                );

                return;

            }

            let userData = {

                username: username,
                email: email,
                password: password

            };



            localStorage.setItem(

                "registeredUser",
                JSON.stringify(userData)

            );



            alert(
                "Account Created Successfully!"
            );

            location.reload();

        }

        // LOGIN

        else{

            let savedUser =
            JSON.parse(
                localStorage.getItem("registeredUser")
            );



            if(!savedUser){

                alert(
                    "No account found! Please Sign Up first."
                );

                return;

            }

            if(username == savedUser.username &&
               password == savedUser.password){

                // REMEMBER LOGIN
                if(checkbox){

                    localStorage.setItem(

                        "savedLogin",

                        JSON.stringify({

                            username: username,
                            password: password

                        })

                    );

                }

                else{

                    localStorage.removeItem("savedLogin");

                }

                alert("Login Successful!");

                window.location.href = "index.html";

            }

            else{

                alert(
                    "Invalid Username or Password!"
                );

            }

        }

    }

}


// PAYMENT MODAL

let checkoutBtn =
document.querySelector(".checkout-btn");

let paymentModal =
document.getElementById("paymentModal");

let closePayment =
document.getElementById("closePayment");


if(checkoutBtn){

    checkoutBtn.onclick = function(){

        if(cartItems.length == 0){

            alert("Your cart is empty!");

            return;

        }

        paymentModal.style.display = "flex";

    }

}

if(closePayment){

    closePayment.onclick = function(){

        paymentModal.style.display = "none";

    }

}

// CONFIRM PAYMENT


let confirmPayBtn =
document.getElementById("confirmPayBtn");

if(confirmPayBtn){

    confirmPayBtn.onclick = function(){

        let paymentMethod =
        document.querySelector(
            "input[name='paymentOpt']:checked"
        ).value;

        alert(

            "Payment Successful using " +
            paymentMethod

        );

        localStorage.removeItem("cartItems");

        window.location.href = "index.html";

    }
}

// CONTACT FORM

let contactBtn =
document.querySelector(".contact-right button");

if(contactBtn){

    contactBtn.onclick = function(){

        let inputs =
        document.querySelectorAll(".contact-right input");

        let textarea =
        document.querySelector(".contact-right textarea");

        let name = inputs[0].value;

        let email = inputs[1].value;

        let subject = inputs[2].value;

        let message = textarea.value;

        if(name == "" ||
           email == "" ||
           subject == "" ||
           message == ""){

            alert("Please fill all fields!");

            return;
        }

        let contactData = {

            name: name,
            email: email,
            subject: subject,
            message: message

        };

        localStorage.setItem(

            "contactForm",

            JSON.stringify(contactData)

        );

        alert("Message Sent Successfully!");

        inputs[0].value = "";

        inputs[1].value = "";

        inputs[2].value = "";

        textarea.value = "";

    }

}
// REMOVE ELEMENT USING JQUERY

$(document).ready(function(){

    $(".remove-btn").click(function(){

        $(this).closest(".card").remove();

    });

});