let currentIndex = 0;
const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function changeSlide(direction){
currentIndex += direction;

if(currentIndex >= totalSlides){currentIndex = 0;}
if(currentIndex < 0){currentIndex = totalSlides-1;}

slider.style.transform = "translateX(-"+(currentIndex*100)+"%)";
}

/* FORM SUBMIT */
document.getElementById("devoteeForm")
.addEventListener("submit",async function(e){
e.preventDefault();

const formData = new FormData(this);
const data = Object.fromEntries(formData);

const res = await fetch("/api/devotee",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
});

const result = await res.json();
document.getElementById("responseMsg").innerText = result.message;
});
const form = document.getElementById("devoteeForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const phone = form.phone.value;

    if(phone.length === 10) {
        message.style.color = "green";
        message.innerText = "Join  successfully 🙏";
        form.reset();
    } else {
        message.style.color = "red";
        message.innerText = "Please enter a valid 10 digit phone number.";
    }
});