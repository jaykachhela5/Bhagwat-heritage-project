/* =========================================
   SMOOTH SCROLL FUNCTION
========================================= */
function scrollToSection(id) {
document.getElementById(id).scrollIntoView({
behavior: "smooth"
});
}

/* =========================================
   STICKY HEADER EFFECT
========================================= */
window.addEventListener("scroll", function () {
const header = document.querySelector(".main-header");
header.classList.toggle("sticky", window.scrollY > 50);
});

/* =========================================
   IMPACT COUNTER ANIMATION
========================================= */
const counters = document.querySelectorAll(".impact-card h3");
let counterStarted = false;

function runCounters() {
if (counterStarted) return;

const section = document.getElementById("impact");
const sectionTop = section.getBoundingClientRect().top;

if (sectionTop < window.innerHeight - 100) {

counters[0].setAttribute("data-target", 12000);
counters[1].setAttribute("data-target", 85);
counters[2].setAttribute("data-target", 3500);
counters[3].setAttribute("data-target", 120);

counters.forEach(counter => {
const updateCounter = () => {
const target = +counter.getAttribute("data-target");
const count = +counter.innerText;
const increment = target / 200;

if (count < target) {
counter.innerText = Math.ceil(count + increment);
setTimeout(updateCounter, 10);
} else {
counter.innerText = target + "+";
}
};
updateCounter();
});

counterStarted = true;
}
}

window.addEventListener("scroll", runCounters);

/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */
const revealElements = document.querySelectorAll(".service-box, .impact-card, .gallery-item");

function revealOnScroll() {
revealElements.forEach(el => {
const rect = el.getBoundingClientRect();
if (rect.top < window.innerHeight - 100) {
el.style.opacity = "1";
el.style.transform = "translateY(0)";
}
});
}

revealElements.forEach(el => {
el.style.opacity = "0";
el.style.transform = "translateY(40px)";
el.style.transition = "all 0.8s ease";
});

window.addEventListener("scroll", revealOnScroll);

/* =========================================
   FLOATING DONATE BUTTON VISIBILITY
========================================= */
const floatingDonate = document.querySelector(".floating-donate");

window.addEventListener("scroll", () => {
if (window.scrollY > 400) {
floatingDonate.style.opacity = "1";
floatingDonate.style.pointerEvents = "auto";
} else {
floatingDonate.style.opacity = "0";
floatingDonate.style.pointerEvents = "none";
}
});

/* =========================================
   BUTTON RIPPLE EFFECT
========================================= */
document.querySelectorAll("button").forEach(button => {
button.addEventListener("click", function (e) {
const circle = document.createElement("span");
const diameter = Math.max(this.clientWidth, this.clientHeight);
const radius = diameter / 2;

circle.style.width = circle.style.height = `${diameter}px`;
circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
circle.style.top = `${e.clientY - this.offsetTop - radius}px`;
circle.classList.add("ripple");

const ripple = this.getElementsByClassName("ripple")[0];
if (ripple) ripple.remove();

this.appendChild(circle);
});
});

/* =========================================
   DONATION FORM + RAZORPAY
========================================= */
document.getElementById("donationForm").addEventListener("submit", function(e) {
e.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const amount = document.getElementById("amount").value.trim();
const category = document.getElementById("category").value;

if (!name || !email || !phone || !amount) {
alert("Please fill all fields properly.");
return;
}

if (amount < 10) {
alert("Minimum donation amount is ₹10");
return;
}

/* Razorpay Integration */
var options = {
"key": "YOUR_RAZORPAY_KEY",
"amount": amount * 100,
"currency": "INR",
"name": "Bhagwat Heritage",
"description": category + " Donation",
"handler": function (response) {
alert("🙏 Thank you for your donation!\nPayment ID: " + response.razorpay_payment_id);
},
"prefill": {
"name": name,
"email": email,
"contact": phone
},
"theme": {
"color": "#F9B233"
}
};

var rzp1 = new Razorpay(options);
rzp1.open();
});

/* =========================================
   GALLERY ZOOM ON HOVER
========================================= */
document.querySelectorAll(".gallery-item").forEach(item=>{
item.addEventListener("mouseenter",()=>{
item.style.transform="scale(1.1)";
});
item.addEventListener("mouseleave",()=>{
item.style.transform="scale(1)";
});
});

/* =========================================
   SCROLL TO TOP BUTTON (if exists)
========================================= */
const scrollBtn = document.getElementById("scrollTopBtn");

if(scrollBtn){
window.addEventListener("scroll",()=>{
scrollBtn.style.display = window.scrollY > 500 ? "block" : "none";
});
}

/* =========================================
   AUTO TESTIMONIAL SLIDER (If Added Later)
========================================= */
let testimonialIndex = 0;
const testimonials = document.querySelectorAll(".testimonial");

if(testimonials.length > 0){
function showTestimonials(){
testimonials.forEach(t=>t.style.display="none");
testimonialIndex++;
if(testimonialIndex > testimonials.length){
testimonialIndex = 1;
}
testimonials[testimonialIndex-1].style.display="block";
setTimeout(showTestimonials,4000);
}
showTestimonials();
}