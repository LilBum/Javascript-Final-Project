window.onload = function () {

    const addToCartRadioButtons = document.querySelectorAll(".product input[type='radio']");

    window.addEventListener('DOMContentLoaded', (event) => {
        // Loop through the radio buttons and attach a click event listener to each one
        addToCartRadioButtons.forEach(button => {
            button.addEventListener("click", addToCartClicked);
        });
    });

    function updateCartTotal() {
        const cartItems = document.querySelectorAll(".cart-item");
        let subtotal = 0;
        cartItems.forEach(item => {
            const priceElement = item.querySelector(".cart-item-price");
            const price = parseFloat(priceElement.textContent.replace("$", ""));
            subtotal += price;
        });
        const tax = 0.08;
        const taxAmount = subtotal * tax;
        const total = subtotal + taxAmount;
        const cartTotalElement = document.querySelector(".cart-total p");
        cartTotalElement.textContent =
            `Subtotal: $${subtotal.toFixed(2)}
        | Tax: $${taxAmount.toFixed(2)} 
        | Total: $${total.toFixed(2)}`;
    }

    function addItemToCart(title, price, imageSrc, size) {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
        <span class="cart-item-title">${title}</span> <br>
        <span class="cart-item-size">Size: ${size}</span> <br> Price:  
        <span class="cart-item-price">$${price.toFixed(2)}</span>
        <img class="cart-item-image" src="${imageSrc}" alt="Cart Item Image"> <br>
      `;
        const cartItems = document.querySelector(".cart-items");
        cartItems.appendChild(cartItem);
        updateCartTotal();
    }

    function addToCartClicked(event) {
        const select = event.target;
        const product = select.closest('.product');
        const title = product.querySelector("h2").textContent;
        const selectedOption = product.querySelector('select[name="size"] option:checked');
        if (!selectedOption) {
            console.warn(`Please select a size for ${title}`);
            return;
        }
        const size = selectedOption.value;
        const price = parseFloat(selectedOption.getAttribute('data-price'));
        if (isNaN(price)) {
            console.warn(`Unknown price for product: ${title}. Setting price to 0.`);
        }

        const imageSrc = product.querySelector("img").getAttribute("src");
        addItemToCart(title, price, imageSrc, size);
        updateCartTotal();

        // Save the selected product information in a cookie
        const productInfo = { title, price, imageSrc, size };
        document.cookie = `productInfo=${JSON.stringify(productInfo)}; expires=${new Date(Date.now() + 6000000000).toUTCString()}`;
    }



    addToCartRadioButtons.forEach(button => { button.addEventListener("click", addToCartClicked); });

    function getCookie() {
        document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById("customer-info-form");
            console.log(form);

            // attach the event listener for form submit
            form.addEventListener("submit", function (event) {
                console.log(form);
                event.preventDefault();
            });
        });

        // Get the cookie value
        const cookieValue = document.cookie;
        if (cookieValue) {
            const customerInfo = JSON.parse(cookieValue.split(";").find(c => c.trim().startsWith("customerInfo=")).split("=")[1]);
            console.log(customerInfo.firstName);
            console.log(customerInfo.lastName);
            console.log(customerInfo.email);
        }
    }
    function submitForm() {
        const form = document.getElementById("customer-info-form");
        const firstName = form.elements["first-name"].value;
        const lastName = form.elements["last-name"].value;
        const email = form.elements["email"].value;

        // Create an object with the customer information
        const customerInfo = {
            firstName: firstName,
            lastName: lastName,
            email: email
        };
        console.log("customerInfo object:", customerInfo);
        document.cookie = `customerInfo=${JSON.stringify(customerInfo)}; path=/; expires=${new Date(Date.now() + 6000000000).toUTCString()}`;

        window.location.href = "summary.html";
    }



    const form = document.getElementById("customer-info-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            getCookie();
            submitForm();
        });
    }
};
