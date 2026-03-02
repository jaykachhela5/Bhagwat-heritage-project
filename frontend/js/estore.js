/* ==========================================
   BHAGWAT HERITAGE ULTRA ESTORE
   ENTERPRISE CART SYSTEM
========================================== */

let cart = JSON.parse(localStorage.getItem("bh_cart")) || [];

/* ================= INITIALIZE ================= */

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    updateCartUI();
    bindProductButtons();
});

/* ================= PRODUCT BUTTON BINDING ================= */

function bindProductButtons(){
    document.querySelectorAll(".addToCart").forEach(btn => {
        btn.addEventListener("click", function(){
            const product = getProductData(this);
            addToCart(product);
        });
    });

    document.querySelectorAll(".buyNow").forEach(btn => {
        btn.addEventListener("click", function(){
            const product = getProductData(this);
            addToCart(product);
            openCart();
        });
    });
}

/* ================= GET PRODUCT DATA ================= */

function getProductData(button){
    const card = button.closest(".product-card");
    return {
        id: card.dataset.id,
        name: card.querySelector("h3").innerText,
        price: parseFloat(card.querySelector(".price").innerText.replace("₹","")),
        image: card.querySelector("img").src,
        quantity: 1
    };
}

/* ================= ADD TO CART ================= */

function addToCart(product){

    const existing = cart.find(item => item.id === product.id);

    if(existing){
        existing.quantity += 1;
    } else {
        cart.push(product);
    }

    saveCart();
    updateCartUI();
    showNotification("Product Added to Cart");
}

/* ================= REMOVE FROM CART ================= */

function removeFromCart(id){
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

/* ================= UPDATE QUANTITY ================= */

function changeQuantity(id, action){
    const item = cart.find(p => p.id === id);
    if(!item) return;

    if(action === "increase"){
        item.quantity++;
    } else if(action === "decrease"){
        item.quantity--;
        if(item.quantity <= 0){
            removeFromCart(id);
            return;
        }
    }

    saveCart();
    updateCartUI();
}

/* ================= SAVE CART ================= */

function saveCart(){
    localStorage.setItem("bh_cart", JSON.stringify(cart));
}

/* ================= LOAD CART ================= */

function loadCart(){
    cart = JSON.parse(localStorage.getItem("bh_cart")) || [];
}

/* ================= UPDATE CART UI ================= */

function updateCartUI(){

    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    if(!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.image}" width="50">
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <div class="qty-controls">
                    <button onclick="changeQuantity('${item.id}','decrease')">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.id}','increase')">+</button>
                </div>
                <button onclick="removeFromCart('${item.id}')" class="remove-btn">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(div);
    });

    if(cartTotal) cartTotal.innerText = total.toFixed(2);
    if(cartCount) cartCount.innerText = count;

}

/* ================= CART SIDEBAR ================= */

function openCart(){
    document.getElementById("cartSidebar").classList.add("active");
}

function closeCart(){
    document.getElementById("cartSidebar").classList.remove("active");
}

document.getElementById("cartBtn")?.addEventListener("click", openCart);

/* ================= CHECKOUT ================= */

document.getElementById("checkoutBtn")?.addEventListener("click", () => {

    if(cart.length === 0){
        showNotification("Cart is Empty", true);
        return;
    }

    document.getElementById("checkoutSection").scrollIntoView({
        behavior: "smooth"
    });

});

/* ================= PLACE ORDER ================= */

document.getElementById("checkoutForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    if(cart.length === 0){
        showNotification("Cart is Empty", true);
        return;
    }

    const order = {
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        date: new Date()
    };

    console.log("Order Placed:", order);

    showNotification("Order Placed Successfully!");

    cart = [];
    saveCart();
    updateCartUI();
    this.reset();
});

/* ================= NOTIFICATION SYSTEM ================= */

function showNotification(message, error=false){

    const note = document.createElement("div");
    note.className = "enterprise-toast";
    note.innerText = message;

    if(error){
        note.style.background = "#c0392b";
    }

    document.body.appendChild(note);

    setTimeout(() => {
        note.style.opacity = "0";
        setTimeout(()=> note.remove(),500);
    },3000);
}

/* ================= AUTO CLOSE CART ON OUTSIDE CLICK ================= */

document.addEventListener("click", function(e){

    const cartSidebar = document.getElementById("cartSidebar");
    const cartBtn = document.getElementById("cartBtn");

    if(!cartSidebar || !cartBtn) return;

    if(
        cartSidebar.classList.contains("active") &&
        !cartSidebar.contains(e.target) &&
        !cartBtn.contains(e.target)
    ){
        closeCart();
    }

});