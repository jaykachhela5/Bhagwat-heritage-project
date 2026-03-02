/* =========================================
   GET INVOLVED – ADVANCED JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       SMOOTH SCROLL NAV LINKS
    =============================== */

    document.querySelectorAll("nav a[href^='#']").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    /* ===============================
       STICKY HEADER SHADOW EFFECT
    =============================== */

    const header = document.querySelector(".main-header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 5px 25px rgba(0,0,0,0.4)";
        } else {
            header.style.boxShadow = "none";
        }
    });

    /* ===============================
       SCROLL REVEAL ANIMATION
    =============================== */

    const revealElements = document.querySelectorAll(".why-card, .impact-card, .timeline-item, form");

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s ease";
        revealObserver.observe(el);
    });

    /* ===============================
       ANIMATED COUNTERS (ON VIEW)
    =============================== */

    const counters = [
        { id: "volunteersCount", end: 250 },
        { id: "eventsCount", end: 75 },
        { id: "citiesCount", end: 18 }
    ];

    let counterStarted = false;

    const impactSection = document.querySelector("#impact");

    const counterObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !counterStarted) {
            counters.forEach(counter => animateCounter(counter.id, counter.end));
            counterStarted = true;
        }
    }, { threshold: 0.5 });

    counterObserver.observe(impactSection);

    function animateCounter(id, end) {
        let current = 0;
        const element = document.getElementById(id);
        const increment = end / 100;

        const interval = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end + "+";
                clearInterval(interval);
            } else {
                element.textContent = Math.floor(current) + "+";
            }
        }, 20);
    }

    /* ===============================
       VOLUNTEER FORM VALIDATION
    =============================== */

    const form = document.getElementById("volunteerForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = form.querySelectorAll("input, select");
        let valid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.border = "2px solid red";
            } else {
                input.style.border = "none";
            }
        });

        if (valid) {

            const btn = form.querySelector("button");
            btn.textContent = "Submitting...";
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = "Application Submitted ✅";
                btn.style.background = "#2A9D8F";
                form.reset();
            }, 1500);
        }
    });

});

/* ===============================
   HERO BUTTON SCROLL
================================ */

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

/* ===============================
   RAZORPAY PAYMENT
================================ */

function openRazorpay() {

    var options = {
        "key": "YOUR_RAZORPAY_KEY",
        "amount": 50000, // 500 INR
        "currency": "INR",
        "name": "Bhagwat Heritage",
        "description": "Support Seva Mission",
        "image": "/frontend/images/logo.jpg",
        "theme": {
            "color": "#F4A261"
        },
        "handler": function (response) {
            alert("Payment Successful! Transaction ID: " + response.razorpay_payment_id);
        }
    };

    var rzp = new Razorpay(options);
    rzp.open();
}
/* =========================================
   FOOTER ADVANCED JS
========================================= */

document.addEventListener("DOMContentLoaded", function(){

/* ===============================
   SOCIAL ICON CLICK TRACK
=============================== */

document.querySelectorAll(".social-icons a").forEach(icon => {
    icon.addEventListener("click", function(){
        console.log("Social link clicked:", this.href);
    });
});

/* ===============================
   SOCIAL HOVER GLOW EFFECT
=============================== */

document.querySelectorAll(".social-icons a").forEach(icon => {
    icon.addEventListener("mouseenter", function(){
        this.style.boxShadow = "0 0 20px " + getComputedStyle(this).backgroundColor;
    });
    icon.addEventListener("mouseleave", function(){
        this.style.boxShadow = "none";
    });
});

/* ===============================
   WHATSAPP AUTO MESSAGE
=============================== */

const whatsappBtn = document.querySelector(".whatsapp");

if(whatsappBtn){
    whatsappBtn.addEventListener("click", function(e){
        e.preventDefault();
        const phone = "919999999999"; // apna number daale
        const message = encodeURIComponent("Namaste 🙏 I want to join Bhagwat Heritage Seva.");
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    });
}

/* ===============================
   FOOTER REVEAL ANIMATION
=============================== */

const footer = document.querySelector(".main-footer");

const footerObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            footer.style.opacity = "1";
            footer.style.transform = "translateY(0)";
        }
    });
},{threshold:0.3});

footer.style.opacity="0";
footer.style.transform="translateY(50px)";
footer.style.transition="all 1s ease";

footerObserver.observe(footer);

/* ===============================
   SCROLL TO TOP BUTTON
=============================== */

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 400){
        scrollBtn.style.display="block";
    } else {
        scrollBtn.style.display="none";
    }
});

scrollBtn.addEventListener("click", ()=>{
    window.scrollTo({top:0,behavior:"smooth"});
});

});
