/* =========================
   LIANE´ LASH STUDIO
   JAVASCRIPT
========================= */


/* IMPORTANT:
   Replace this with your real WhatsApp number.
   Use 254 followed by your number.
   Do not include + or spaces.
*/

const whatsappNumber = "+254790192434";



/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menu-toggle");

const navbar = document.getElementById("navbar");


menuToggle.addEventListener("click", function () {

    navbar.classList.toggle("active");

});


const navLinks = document.querySelectorAll(".navbar a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("active");

    });

});



/* =========================
   BOOKING DATE
========================= */

const dateInput = document.getElementById("appointment-date");


const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");


const formattedDate = `${year}-${month}-${day}`;


dateInput.min = formattedDate;



/* =========================
   WHATSAPP BOOKING
========================= */

const bookingForm = document.getElementById("booking-form");


bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name = document.getElementById("customer-name").value.trim();

    const phone = document.getElementById("customer-phone").value.trim();

    const service = document.getElementById("lash-service").value;

    const date = document.getElementById("appointment-date").value;

    const time = document.getElementById("appointment-time").value;

    const notes = document.getElementById("booking-notes").value.trim();


    if (!name || !phone || !service || !date || !time) {

        alert("Please complete all the required fields.");

        return;

    }


    const message =

`Hello LIANE´ Lash Studio! ♡

I would like to request an appointment.

Name: ${name}

Phone: ${phone}

Service: ${service}

Preferred date: ${date}

Preferred time: ${time}

Deposit: KSh 500

Additional notes: ${notes || "None"}

Please confirm availability and share the deposit payment instructions.

Thank you!`;


    const whatsappLink =

        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    if (whatsappNumber.includes("X")) {

        alert("Please add your real WhatsApp number in script.js first.");

        return;

    }


    window.open(whatsappLink, "_blank");

});



/* =========================
   SHOPPING CART
========================= */


let cart = [];


const cartItems = document.getElementById("cart-items");

const cartTotal = document.getElementById("cart-total");

const cartCount = document.getElementById("cart-count");

const cartCountText = document.getElementById("cart-count-text");



/* ADD PRODUCTS */

const addButtons = document.querySelectorAll(".add-to-cart");


addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productName = button.dataset.name;

        const productPrice = Number(button.dataset.price);


        const existingProduct = cart.find(function (item) {

            return item.name === productName;

        });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: productName,

                price: productPrice,

                quantity: 1

            });

        }


        updateCart();


    });

});



/* UPDATE CART */

function updateCart() {

    cartItems.innerHTML = "";


    let total = 0;

    let totalItems = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =

            '<p class="empty-cart">Your bag is waiting for a little something ♡</p>';

    }


    cart.forEach(function (item, index) {

        const itemTotal = item.price * item.quantity;


        total += itemTotal;

        totalItems += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        const itemName = document.createElement("span");

        itemName.textContent =

            `${item.name} × ${item.quantity}`;


        const itemRight = document.createElement("div");


        const itemPrice = document.createElement("strong");

        itemPrice.textContent =

            `KSh ${itemTotal.toLocaleString("en-KE")}`;


        const removeButton = document.createElement("button");

        removeButton.innerHTML =

            '<i class="fa-solid fa-trash"></i>';

        removeButton.setAttribute("aria-label", "Remove product");


        removeButton.addEventListener("click", function () {

            cart[index].quantity--;


            if (cart[index].quantity <= 0) {

                cart.splice(index, 1);

            }


            updateCart();

        });


        itemRight.appendChild(itemPrice);

        itemRight.appendChild(removeButton);


        cartItem.appendChild(itemName);

        cartItem.appendChild(itemRight);


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =

        `KSh ${total.toLocaleString("en-KE")}`;


    cartCount.textContent = totalItems;

    cartCountText.textContent =

        `${totalItems} item${totalItems === 1 ? "" : "s"}`;

}



/* =========================
   WHATSAPP SHOP CHECKOUT
========================= */

const checkoutButton = document.getElementById("checkout-button");


checkoutButton.addEventListener("click", function () {


    if (cart.length === 0) {

        alert("Your shopping bag is empty. Add a product first!");

        return;

    }


    if (whatsappNumber.includes("X")) {

        alert("Please add your real WhatsApp number in script.js first.");

        return;

    }


    let message =

        "Hello LIANE´ Lash Studio! ♡\n\nI would like to order:\n\n";


    let total = 0;


    cart.forEach(function (item) {

        const itemTotal = item.price * item.quantity;


        message +=

            `${item.name} × ${item.quantity} = KSh ${itemTotal}\n`;


        total += itemTotal;

    });


    message +=

        `\nTotal: KSh ${total}\n\nPlease let me know how to complete my order. Thank you!`;


    const whatsappLink =

        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    window.open(whatsappLink, "_blank");

});



/* INITIAL CART DISPLAY */

updateCart();