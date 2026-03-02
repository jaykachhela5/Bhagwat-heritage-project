/* ==========================================
   BHAGWAT HERITAGE - KANYADAAN JS
   Ultra Advanced Interaction Script
========================================== */

/* ==========================================
   SMOOTH NAVBAR SCROLL EFFECT
========================================== */

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
    navbar.style.background = "rgba(255,255,255,0.95)";
  } else {
    navbar.style.boxShadow = "none";
    navbar.style.background = "rgba(255,255,255,0.85)";
  }
});

/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(
  ".program-box, .impact-card, .plan, .faq-item, .gallery-item"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(50px)";
  el.style.transition = "all 0.8s ease";
  revealObserver.observe(el);
});

/* ==========================================
   LIVE IMPACT COUNTERS
========================================== */

const counters = document.querySelectorAll(".impact-card h3");

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

function animateCounter(counter) {
  const targetText = counter.innerText;
  const targetNumber = parseInt(targetText.replace(/\D/g, ""));
  const suffix = targetText.replace(/[0-9]/g, "");

  let count = 0;
  const increment = targetNumber / 100;

  const updateCounter = () => {
    if (count < targetNumber) {
      count += increment;
      counter.innerText = Math.floor(count) + suffix;
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = targetText;
    }
  };

  updateCounter();
}

/* ==========================================
   FAQ ACCORDION EFFECT
========================================== */

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    const paragraph = item.querySelector("p");

    if (paragraph.style.display === "block") {
      paragraph.style.display = "none";
    } else {
      document.querySelectorAll(".faq-item p").forEach((p) => {
        p.style.display = "none";
      });
      paragraph.style.display = "block";
    }
  });

  // Initially hide answers
  const p = item.querySelector("p");
  p.style.display = "none";
});

/* ==========================================
   RAZORPAY AUTO POPUP SYSTEM
========================================== */

const donateButtons = document.querySelectorAll(".plan button, .floating-donate");

donateButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    let amount = 11000; // default

    const plan = btn.closest(".plan");
    if (plan) {
      const priceText = plan.querySelector("p").innerText;
      amount = parseInt(priceText.replace(/[^\d]/g, ""));
    }

    openRazorpay(amount);
  });
});

function openRazorpay(amount) {
  const options = {
    key: "YOUR_RAZORPAY_KEY", // 🔴 Replace with Live Key
    amount: amount * 100,
    currency: "INR",
    name: "Bhagwat Heritage Service Foundation Trust",
    description: "Kanyadaan Seva Donation",
    image: "/frontend/images/logo.png",
    handler: function (response) {
      alert(
        "🙏 Thank you for your donation!\nPayment ID: " +
          response.razorpay_payment_id
      );
    },
    prefill: {
      name: "",
      email: "",
      contact: "",
    },
    theme: {
      color: "#0E7490",
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
}

/* ==========================================
   SMOOTH SCROLL NAVIGATION
========================================== */

document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

/* ==========================================
   PREMIUM LOADER EFFECT (Optional)
========================================== */

window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 1s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 200);
});