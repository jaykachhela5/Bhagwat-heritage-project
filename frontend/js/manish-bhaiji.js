// Counter Animation
function counter(id, target) {
    let count = 0;
    let speed = target / 100;
    let interval = setInterval(() => {
        count += speed;
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        document.getElementById(id).innerText = Math.floor(count) + "+";
    }, 20);
}

counter("years", 35);
counter("followers", 50000);
counter("events", 1200);

// Contact Form Submit
document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    const response = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById("responseMsg").innerText = result.message;
});
