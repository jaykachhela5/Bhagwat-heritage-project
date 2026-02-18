function counter(id, target) {
  let count = 0;
  const element = document.getElementById(id);

  const interval = setInterval(() => {
    count++;
    element.innerText = count;

    if (count >= target) {
      clearInterval(interval);
    }
  }, 50);
}

window.onload = () => {
  counter("years", 35);
  counter("events", 500);
  counter("volunteers", 150);
};
