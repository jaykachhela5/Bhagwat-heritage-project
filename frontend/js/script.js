// Button Hover Animation
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("mouseover", () => {
    btn.style.transform = "scale(1.05)";
    btn.style.transition = "0.3s";
  });

  btn.addEventListener("mouseout", () => {
    btn.style.transform = "scale(1)";
  });
});

let isLogin = true;

// Toggle Login / Signup
function toggleForm() {
  isLogin = !isLogin;

  document.getElementById("title").innerText = isLogin ? "Login" : "Signup";

  document.getElementById("nameField").style.display = isLogin ? "none" : "block";

  document.getElementById("toggleText").innerHTML = isLogin
    ? `Don't have an account? <span onclick="toggleForm()">Signup</span>`
    : `Already have an account? <span onclick="toggleForm()">Login</span>`;
}

// Form Submit
document.getElementById("form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  const url = isLogin
    ? "http://localhost:5000/api/auth/login"
    : "http://localhost:5000/api/auth/signup";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      document.getElementById("msg").style.color = "green";
      document.getElementById("msg").innerText = result.message;

      // Login success -> redirect to Home
      if (isLogin) {
        localStorage.setItem("user", JSON.stringify(result));
        setTimeout(() => {
          window.location.href = "home.html";
        }, 1000);
      } else {
        toggleForm(); // Signup ke baad login pe la do
      }

    } else {
      document.getElementById("msg").style.color = "red";
      document.getElementById("msg").innerText = result.message;
    }

  } catch (error) {
    document.getElementById("msg").style.color = "red";
    document.getElementById("msg").innerText = "Server Error!";
    console.error("Error:", error);
  }
});
function showGallery(num) {

  // Hide all galleries
  document.querySelectorAll(".gallery-images").forEach(g => {
    g.style.display = "none";
  });

  // Show selected
  document.getElementById("gallery" + num).style.display = "grid";
}

// URL se role nikalna
const params = new URLSearchParams(window.location.search);
const role = params.get("role");

if(role){
document.getElementById("role").value = role;
}


