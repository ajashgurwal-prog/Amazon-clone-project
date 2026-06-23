/* ==========================
   HERO IMAGE SLIDER
========================== */

const heroImages = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
];

const heroSlider = document.querySelector(".hero-slider");

let currentSlide = 0;

function changeSlide() {
    heroSlider.style.backgroundImage =
        `url('${heroImages[currentSlide]}')`;

    currentSlide++;

    if (currentSlide >= heroImages.length) {
        currentSlide = 0;
    }
}

changeSlide();
setInterval(changeSlide, 4000);


/* ==========================
   LOCAL STORAGE CART
========================== */

let cart =
    JSON.parse(localStorage.getItem("amazonCart")) || [];

updateCartCount();

function addToCart(productName) {

    const item = {
        name: productName,
        id: Date.now()
    };

    cart.push(item);

    localStorage.setItem(
        "amazonCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    showNotification(
        `${productName} added to cart`
    );
}

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}


/* ==========================
   SEARCH FUNCTION
========================== */

const searchInput =
    document.querySelector(".search-input");

if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        function () {

            const value =
                searchInput.value.toLowerCase();

            const boxes =
                document.querySelectorAll(".box");

            boxes.forEach(box => {

                const title =
                    box.querySelector("h2")
                    .innerText
                    .toLowerCase();

                if (title.includes(value)) {
                    box.style.display = "block";
                } else {
                    box.style.display = "none";
                }

            });

        }
    );

}


/* ==========================
   BACK TO TOP
========================== */

const backToTop =
    document.querySelector(".foot-panel1");

if (backToTop) {

    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* ==========================
   NOTIFICATION SYSTEM
========================== */

function showNotification(message) {

    const notification =
        document.createElement("div");

    notification.classList.add(
        "notification"
    );

    notification.innerText = message;

    document.body.appendChild(
        notification
    );

    setTimeout(() => {
        notification.classList.add("show");
    }, 100);

    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

        setTimeout(() => {

            notification.remove();

        }, 500);

    }, 2500);

}


/* ==========================
   DYNAMIC NOTIFICATION CSS
========================== */

const style =
    document.createElement("style");

style.innerHTML = `
.notification{
    position:fixed;
    right:20px;
    top:20px;
    background:#131921;
    color:white;
    padding:15px 20px;
    border-radius:8px;
    z-index:9999;
    opacity:0;
    transform:translateY(-20px);
    transition:0.4s;
    font-weight:bold;
}

.notification.show{
    opacity:1;
    transform:translateY(0);
}
`;

document.head.appendChild(style);


/* ==========================
   CART ICON CLICK
========================== */

const cartButton =
    document.querySelector(".nav-cart");

if (cartButton) {

    cartButton.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

            } else {

                let items = "";

                cart.forEach(item => {
                    items +=
                        "• " +
                        item.name +
                        "\n";
                });

                alert(
                    "Items in Cart:\n\n" +
                    items +
                    "\nTotal Items: " +
                    cart.length
                );

            }

        }
    );

}


/* ==========================
   CLEAR CART OPTION
========================== */

function clearCart() {

    cart = [];

    localStorage.removeItem(
        "amazonCart"
    );

    updateCartCount();

    showNotification(
        "Cart Cleared"
    );
}


/* ==========================
   DOUBLE CLICK CART TO CLEAR
========================== */

if (cartButton) {

    cartButton.addEventListener(
        "dblclick",
        function () {

            const confirmClear =
                confirm(
                    "Clear cart?"
                );

            if (confirmClear) {
                clearCart();
            }

        }
    );

}


/* ==========================
   PAGE LOAD MESSAGE
========================== */

window.addEventListener(
    "load",
    function () {

        console.log(
            "Amazon Clone Loaded Successfully"
        );

    }
);