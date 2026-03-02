document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  const data = await res.json();

  if (data.success) {
    document.getElementById("msg").innerText = "Login Successful";
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("msg").innerText = "Invalid Login";
  }
});
