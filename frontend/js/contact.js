const form = document.getElementById('contactForm');
const responseMsg = document.getElementById('responseMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();

    if(res.ok){
      responseMsg.textContent = result.message;
      responseMsg.style.color = 'green';
      form.reset();
    } else {
      responseMsg.textContent = result.message;
      responseMsg.style.color = 'red';
    }
  } catch (err) {
    responseMsg.textContent = 'Error sending message!';
    responseMsg.style.color = 'red';
  }
});
