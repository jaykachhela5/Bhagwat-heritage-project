/* =====================================
   DOM LOADED
===================================== */

document.addEventListener("DOMContentLoaded", function () {

initStickyHeader();
initScrollReveal();
initCounters();
initFAQ();
initActiveNav();
initRippleEffect();
initDonationButtons();
initFormValidation();
initFloatingEmergency();

});

/* =====================================
   STICKY HEADER
===================================== */

function initStickyHeader() {
const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
if (window.scrollY > 50) {
header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
header.style.transition = "0.3s";
} else {
header.style.boxShadow = "none";
}
});
}

/* =====================================
   SCROLL REVEAL ANIMATION
===================================== */

function initScrollReveal() {

const elements = document.querySelectorAll("section, .type-card, .impact-card, .story-card, .plan");

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = "1";
entry.target.style.transform = "translateY(0)";
}
});
}, { threshold: 0.2 });

elements.forEach(el => {
el.style.opacity = "0";
el.style.transform = "translateY(40px)";
el.style.transition = "all 0.8s ease";
observer.observe(el);
});
}

/* =====================================
   LIVE COUNTERS
===================================== */

function initCounters() {

const counters = document.querySelectorAll(".impact-card h3");

counters.forEach(counter => {

const target = parseInt(counter.innerText.replace(/\D/g, ""));
counter.innerText = "0";

let count = 0;

const updateCounter = () => {
const increment = target / 100;

if (count < target) {
count += increment;
counter.innerText = Math.floor(count) + "+";
requestAnimationFrame(updateCounter);
} else {
counter.innerText = target + "+";
}
};

const observer = new IntersectionObserver(entries => {
if (entries[0].isIntersecting) {
updateCounter();
observer.disconnect();
}
});

observer.observe(counter);

});
}

/* =====================================
   FAQ ACCORDION
===================================== */

function initFAQ() {

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

item.addEventListener("click", () => {

const p = item.querySelector("p");

if (p.style.display === "block") {
p.style.display = "none";
} else {
document.querySelectorAll(".faq-item p").forEach(el => el.style.display = "none");
p.style.display = "block";
}

});

item.querySelector("p").style.display = "none";

});
}

/* =====================================
   ACTIVE NAV LINK
===================================== */

function initActiveNav() {

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {
const sectionTop = section.offsetTop - 150;
if (window.scrollY >= sectionTop) {
current = section.getAttribute("id");
}
});

navLinks.forEach(link => {
link.classList.remove("active");
if (link.getAttribute("href").includes(current)) {
link.classList.add("active");
}
});

});
}

/* =====================================
   BUTTON RIPPLE EFFECT
===================================== */

function initRippleEffect() {

const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
btn.addEventListener("click", function (e) {

const circle = document.createElement("span");
circle.classList.add("ripple");

this.appendChild(circle);

const d = Math.max(this.clientWidth, this.clientHeight);
circle.style.width = circle.style.height = d + "px";
circle.style.left = e.clientX - this.offsetLeft - d / 2 + "px";
circle.style.top = e.clientY - this.offsetTop - d / 2 + "px";

setTimeout(() => circle.remove(), 600);

});
});
}

/* =====================================
   DONATION RAZORPAY
===================================== */

function initDonationButtons() {

const donateBtns = document.querySelectorAll(".plan button");

donateBtns.forEach(btn => {

btn.addEventListener("click", function () {

const amountText = this.parentElement.querySelector("p").innerText;
const amount = parseInt(amountText.replace(/\D/g, ""));

const options = {
key: "YOUR_RAZORPAY_KEY",
amount: amount * 100,
currency: "INR",
name: "Bhagwat Heritage Trust",
description: "Vyasanmukti Donation",
theme: {
color: "#0F6E8C"
}
};

const rzp = new Razorpay(options);
rzp.open();

});
});
}

/* =====================================
   CONTACT FORM VALIDATION
===================================== */

function initFormValidation() {

const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {

e.preventDefault();

const inputs = form.querySelectorAll("input, textarea");

let valid = true;

inputs.forEach(input => {
if (input.value.trim() === "") {
input.style.borderColor = "red";
valid = false;
} else {
input.style.borderColor = "#1C8DAF";
}
});

if (valid) {
alert("Form submitted successfully!");
form.reset();
}

});
}

/* =====================================
   FLOATING EMERGENCY BUTTON
===================================== */

function initFloatingEmergency() {

const btn = document.createElement("div");
btn.innerHTML = "🚨 Emergency Help";
btn.style.position = "fixed";
btn.style.bottom = "20px";
btn.style.right = "20px";
btn.style.background = "#C62828";
btn.style.color = "#fff";
btn.style.padding = "12px 18px";
btn.style.borderRadius = "50px";
btn.style.cursor = "pointer";
btn.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
btn.style.zIndex = "9999";

btn.addEventListener("click", () => {
window.location.href = "tel:+91XXXXXXXXXX";
});

document.body.appendChild(btn);
}

/* =====================================
   SMOOTH SCROLL FUNCTION
===================================== */

function scrollToSection(id) {
document.getElementById(id).scrollIntoView({
behavior: "smooth"
});
}