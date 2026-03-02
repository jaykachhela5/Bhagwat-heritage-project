/* =========================================
   SMOOTH SCROLL FUNCTIONS
========================================= */

function scrollToDonate() {
    document.getElementById("donate").scrollIntoView({ behavior: "smooth" });
}

function scrollToAbout() {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
}

/* =========================================
   DONATION TIER AUTO SELECT
========================================= */

function selectAmount(amount) {
    document.getElementById("amount").value = amount;
    scrollToDonate();
}

/* =========================================
   LIVE IMPACT COUNTERS
========================================= */

const counters = [
    { id: "waterLitres", target: 250000 },
    { id: "peopleServed", target: 12000 },
    { id: "locationsCovered", target: 85 }
];

let counterStarted = false;

function animateCounter(element, target) {
    let count = 0;
    const speed = target / 200;

    const update = () => {
        count += speed;
        if (count < target) {
            element.innerText = Math.floor(count).toLocaleString();
            requestAnimationFrame(update);
        } else {
            element.innerText = target.toLocaleString();
        }
    };
    update();
}

function startCountersOnScroll() {
    const impactSection = document.getElementById("impact");
    const sectionTop = impactSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight && !counterStarted) {
        counters.forEach(counter => {
            const el = document.getElementById(counter.id);
            animateCounter(el, counter.target);
        });
        counterStarted = true;
    }
}

window.addEventListener("scroll", startCountersOnScroll);

/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll("section, .tier, .about-box, .testimonial");

function revealOnScroll() {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.transition = "all 0.8s ease";
        } else {
            el.style.opacity = "0";
            el.style.transform = "translateY(40px)";
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =========================================
   FORM VALIDATION + PAYMENT
========================================= */

const donationForm = document.getElementById("donationForm");

donationForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const amount = document.getElementById("amount").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !phone || !amount) {
        alert("Please fill all required fields.");
        return;
    }

    const donateBtn = document.querySelector(".donate-btn");
    donateBtn.innerText = "Processing...";
    donateBtn.disabled = true;

    try {

        // 🔹 Call backend to create order
        const response = await fetch("http://localhost:5000/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount })
        });

        const data = await response.json();

        // 🔹 Razorpay Payment
        const options = {
            key: "YOUR_RAZORPAY_KEY_ID",
            amount: data.amount,
            currency: "INR",
            name: "Bhagwat Heritage Trust",
            description: "Jal Seva Donation",
            order_id: data.id,
            handler: async function (response) {

                await fetch("http://localhost:5000/verify-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...response,
                        name,
                        email,
                        phone,
                        amount,
                        message
                    })
                });

                showSuccessPopup();
            },
            theme: {
                color: "#1F7A8C"
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();

    } catch (error) {
        alert("Payment Error. Please try again.");
    }

    donateBtn.innerText = "Proceed to Secure Donation";
    donateBtn.disabled = false;
});

/* =========================================
   SUCCESS POPUP
========================================= */

function showSuccessPopup() {

    const popup = document.createElement("div");
    popup.innerHTML = `
        <div style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(0,0,0,0.6);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:9999;">
            
            <div style="
                background:white;
                padding:40px;
                border-radius:20px;
                text-align:center;
                max-width:400px;">
                
                <h2 style="color:#1F7A8C;">🙏 Thank You!</h2>
                <p>Your Jal Seva donation was successful.</p>
                <button onclick="location.reload()" 
                style="
                margin-top:20px;
                padding:10px 20px;
                border:none;
                background:#F4B942;
                border-radius:30px;
                cursor:pointer;">
                Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);
}