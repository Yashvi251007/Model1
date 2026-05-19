// ==========================================
// GLOBALS & INITIALIZATION
// ==========================================

// TOTAL
let total = 0;

// CART ITEMS
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// PRODUCT CARDS
let cards = document.querySelectorAll(".card");


// ==========================================
// PRODUCT SECTION OPERATIONS
// ==========================================

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
        addCartBtn.onclick = function(){
            let productName = cards[i].querySelector("h3").innerText;
            let priceText = cards[i].querySelector("p").innerText;
            let productImage = cards[i].querySelector("img").src;
            let found = false;

            // CHECK PRODUCT ALREADY EXISTS
            for(let j = 0; j < cartItems.length; j++){
                if(cartItems[j].name == productName){
                    cartItems[j].quantity = cartItems[j].quantity + count;
                    found = true;
                }
            }

            // NEW PRODUCT
            if(found == false){
                cartItems.push({
                    name: productName,
                    price: priceText,
                    image: productImage,
                    quantity: count
                });
            }

            // SAVE
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            alert("Product Added To Cart");
        }
    }
}


// ==========================================
// CART RENDERING MANAGEMENT
// ==========================================

let cartProducts = document.getElementById("cart-products");

if(cartProducts){
    cartProducts.innerHTML = "";
    total = 0;

    for(let i = 0; i < cartItems.length; i++){
        let price = parseInt(
            cartItems[i].price
            .replace("₹","")
            .replace(",","")
        );

        total = total + (price * cartItems[i].quantity);

        cartProducts.innerHTML += `
        <div class="card">
            <img src="${cartItems[i].image}">
            <h3>${cartItems[i].name}</h3>
            <p>${cartItems[i].price}</p>
            <h4>Quantity : ${cartItems[i].quantity}</h4>
            <div class="cart-buttons">
                <button onclick="decreaseQty(${i})">-</button>
                <span class="cart-qty">${cartItems[i].quantity}</span>
                <button onclick="increaseQty(${i})">+</button>
            </div>
        </div>
        `;
    }
}

// SHOW TOTAL
if(document.getElementById("total")){
    document.getElementById("total").innerText = "₹" + total;
}

// INCREASE QUANTITY
function increaseQty(index){
    cartItems[index].quantity++;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();
}

// DECREASE QUANTITY
function decreaseQty(index){
    cartItems[index].quantity--;
    if(cartItems[index].quantity <= 0){
        cartItems.splice(index,1);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();
}

// CLEAR CART
let clearButton = document.getElementById("clear-cart");

for(let i = 0; i < cartItems.length; i++){
    if(!cartItems[i].quantity){
        cartItems[i].quantity = 1;
    }
}

if(clearButton){
    clearButton.onclick = function(){
        localStorage.removeItem("cartItems");
        location.reload();
    }
}


// ==========================================
// UTILITIES: FILTER, SORT, AND LOAD MORE
// ==========================================

// LOAD MORE
let loadMoreBtn = document.getElementById("loadMoreBtn");
if(loadMoreBtn){
    loadMoreBtn.onclick = function(){
        document.getElementById("moreProducts").style.display = "flex";
        loadMoreBtn.style.display = "none";
    }
}

// FILTER PRODUCTS
function filterProducts(category){
    let cards = document.querySelectorAll(".card");
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
    let products = document.querySelector(".products");
    let cards = Array.from(document.querySelectorAll(".card"));

    cards.sort(function(a,b){
        let priceA = parseInt(a.querySelector("p").innerText.replace("₹","").replace(",",""));
        let priceB = parseInt(b.querySelector("p").innerText.replace("₹","").replace(",",""));

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


// ==========================================
// USER CONFIGURATION: LOGIN & SIGN UP
// ==========================================

// TOGGLE VIEW TO SIGN UP
function showSignup(){
    document.getElementById("form-title").innerText = "Sign Up";
    document.getElementById("main-btn").innerText = "Create Account";
    document.getElementById("signup-email").style.display = "block";
    
    // Updates checkbox text for Sign Up view rules
    let checkboxLabel = document.getElementById("checkboxLabel");
    if(checkboxLabel){
        checkboxLabel.innerText = "I accept the Terms and Conditions";
    }
}

// ACCOUNT AUTHENTICATION SUBMISSION HANDLING
let mainBtn = document.getElementById("main-btn");

if(mainBtn) {
    mainBtn.onclick = function() {
        let formTitle = document.getElementById("form-title").innerText;
        let isChecked = document.getElementById("formCheckbox").checked;
        
        let usernameInput = document.querySelector(".login-box input[type='text']");
        let emailInput = document.getElementById("signup-email");
        let passwordInput = document.querySelector(".login-box input[type='password']");

        // 1. SIGN UP ROUTINE
        if(formTitle == "Sign Up") {
            if(isChecked == false) {
                alert("Please accept the Terms and Conditions to create an account!");
                return;
            }

            if(usernameInput.value == "" || passwordInput.value == "" || (emailInput && emailInput.value == "")) {
                alert("Please fill in all fields!");
                return;
            }

            let userData = {
                username: usernameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };

            localStorage.setItem("registeredUser", JSON.stringify(userData));
            alert("Account Created Successfully! You can now Log In.");
            location.reload(); 
        } 
        
        // 2. LOGIN ROUTINE
        else {
            let savedData = JSON.parse(localStorage.getItem("registeredUser"));

            if(!savedData) {
                alert("No account found! Please Sign Up first.");
                return;
            }

            if(usernameInput.value == savedData.username && passwordInput.value == savedData.password) {
                if(isChecked == true) {
                    alert("Logged in successfully! Your session will be remembered.");
                } else {
                    alert("Logged in successfully!");
                }
                
                window.location.href = "index.html"; 
            } else {
                alert("Invalid Username or Password! Please try again.");
            }
        }
    }
}


// ==========================================
// DISPLAY POPUPS
// ==========================================

function openProduct(imageSrc){
    document.getElementById("product-popup").style.display = "flex";
    document.getElementById("popup-image").src = imageSrc;
}

function closeProduct(){
    document.getElementById("product-popup").style.display = "none";
}


// ==========================================
// CHECKOUT & PAYMENT METHOD SYSTEM
// ==========================================

let checkoutButton = document.querySelector(".checkout-btn");
let paymentModal = document.getElementById("paymentModal");
let closePaymentBtn = document.getElementById("closePayment");
let confirmPayBtn = document.getElementById("confirmPayBtn");

// OPEN CHECKOUT POPUP WINDOW
if(checkoutButton){
    checkoutButton.onclick = function(){
        if(cartItems.length == 0){
            alert("Your shopping cart is empty!");
        } else {
            paymentModal.style.display = "flex";
            
            // Re-label checkbox text specifically for shipping confirmations
            let checkboxLabel = document.getElementById("checkboxLabel");
            if(checkboxLabel){
                checkboxLabel.innerText = "Confirm shipping address is correct";
            }
            document.getElementById("formCheckbox").checked = false; 
        }
    }
}

// CLOSE CHECKOUT POPUP WINDOW
if(closePaymentBtn){
    closePaymentBtn.onclick = function(){
        paymentModal.style.display = "none";
    }
}

// EVALUATE SELECTED TRANSACTION METHOD
if(confirmPayBtn){
    confirmPayBtn.onclick = function(){
        let selectedMethod = "";
        let radioButtons = document.getElementsByName("paymentOpt");
        let isChecked = document.getElementById("formCheckbox").checked;

        // Mandate checkbox rule evaluation
        if(isChecked == false){
            alert("Please check the verification box to confirm your transaction request!");
            return;
        }

        // Loop array to parse active radio value
        for(let i = 0; i < radioButtons.length; i++){
            if(radioButtons[i].checked){
                selectedMethod = radioButtons[i].value;
            }
        }

        // Prompt inputs meeting standard university course guidelines
        if(selectedMethod == "Card"){
            let cardNumber = prompt("Enter your 16-digit Card Number:");
            if(cardNumber == null || cardNumber == "") {
                alert("Transaction Process Aborted.");
                return;
            }
            alert("Card ending in " + cardNumber.slice(-4) + " processed successfully!");
        }
        else if(selectedMethod == "UPI"){
            let upiId = prompt("Enter your personal UPI ID (e.g., username@okaxis):");
            if(upiId == null || upiId == "") {
                alert("Transaction Process Aborted.");
                return;
            }
            alert("Payment request transaction transmitted to " + upiId + " successfully!");
        }
        else if(selectedMethod == "COD"){
            alert("Order Transaction Documented! Balance due upon delivery package arrival.");
        }

        // Wipe active cart memory state and update DOM structure automatically
        localStorage.removeItem("cartItems");
        location.reload();
    }
}