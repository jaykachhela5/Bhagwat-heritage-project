// Progress Animation
window.addEventListener("scroll", () => {
  document.querySelectorAll(".progress-bar").forEach(bar => {
    bar.style.width = bar.getAttribute("data-width");
  });
});

// Counter
function counter(id, target) {
  let count = 0;
  let element = document.getElementById(id);

  let interval = setInterval(() => {
    count++;
    element.innerText = count;
    if (count >= target) clearInterval(interval);
  }, 30);
}

window.onload = () => {
  counter("years", 35);
  counter("events", 500);
};

// Modal
function openModal(title){
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modal").style.display="flex";
}

function closeModal(){
  document.getElementById("modal").style.display="none";
}
