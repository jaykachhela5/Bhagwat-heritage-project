document.querySelectorAll(".donate-btn").forEach(btn => {
    btn.addEventListener("click", async () => {

        const amount = prompt("Enter donation amount:");

        const res = await fetch("http://localhost:5000/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount })
        });

        const order = await res.json();

        const options = {
            key: "rzp_test_xxxxx", // YOUR KEY ID
            amount: order.amount,
            currency: "INR",
            name: "Bhagwat Heritage",
            description: "Donation Payment",
            order_id: order.id,

            handler: async function (response) {

                const verify = await fetch("http://localhost:5000/verify-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(response)
                });

                const result = await verify.json();

                if (result.status === "success") {
                    alert("🎉 Payment Successful!");
                } else {
                    alert("Payment Failed");
                }
            },

            theme: { color: "#ff6a00" }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    });
});
aconst container = document.getElementById("events-container");

async function loadEvents() {
  const res = await fetch("http://localhost:5000/api/events");
  const events = await res.json();

  container.innerHTML = "";

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <img src="${event.image}" />
      <h3>${event.title}</h3>
      <p>People Served: ${event.peopleServed}</p>
      <small>${new Date(event.date).toLocaleDateString()}</small>
    `;

    container.appendChild(card);
  });
}

loadEvents();

/* UPLOAD FORM */
document.getElementById("uploadForm").onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  await fetch("http://localhost:5000/api/events", {
    method: "POST",
    body: formData
  });

  alert("Event Uploaded!");

  e.target.reset();

  loadEvents(); // 👈 AUTO REFRESH
};