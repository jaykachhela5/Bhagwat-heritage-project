/* ========================================= */
/* ============ DARK MODE ================== */
/* ========================================= */

function toggleDarkMode(){
document.body.classList.toggle("dark");
}


/* ========================================= */
/* ============ SMOOTH SCROLL ============== */
/* ========================================= */

function scrollToSection(id){
document.getElementById(id).scrollIntoView({behavior:"smooth"});
}


/* ========================================= */
/* ============ DONATION =================== */
/* ========================================= */

async function processDonation() {
try{
const amount = document.getElementById("donationAmount").value;

if(!amount || amount <= 0){
alert("Please enter valid amount");
return;
}

await fetch("http://localhost:5000/api/donations", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ amount })
});

openDonationModal();

}catch(err){
console.error(err);
alert("Donation failed");
}
}

function openDonationModal(){
document.getElementById("donationModal").style.display="flex";
}

function closeDonationModal(){
document.getElementById("donationModal").style.display="none";
}


/* ========================================= */
/* ============ LOAD MANDIR DATA =========== */
/* ========================================= */

async function loadMandir() {
try{
const res = await fetch("http://localhost:5000/api/mandir");
const data = await res.json();

if(data){
if(data.title)
document.getElementById("mandirTitle").innerText = data.title;

if(data.subtitle)
document.getElementById("mandirSubtitle").innerText = data.subtitle;

if(data.about)
document.getElementById("aboutContent").innerText = data.about;
}
}catch(err){
console.log("Mandir load error",err);
}
}

loadMandir();


/* ========================================= */
/* ============ ADMIN EDIT ================= */
/* ========================================= */

function openEditModal(){
document.getElementById("editContentArea").value =
document.getElementById("aboutContent").innerText;

document.getElementById("editModal").style.display="flex";
}

function closeEditModal(){
document.getElementById("editModal").style.display="none";
}

async function saveContent(){
try{
const newContent =
document.getElementById("editContentArea").value;

await fetch("http://localhost:5000/api/mandir", {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ about: newContent })
});

document.getElementById("aboutContent").innerText = newContent;

alert("Updated Successfully");
closeEditModal();

}catch(err){
console.log(err);
alert("Update failed");
}
}


/* ========================================= */
/* ============ EVENTS ===================== */
/* ========================================= */

async function loadEvents() {
try{
const res = await fetch("http://localhost:5000/api/events");
const events = await res.json();

const container = document.getElementById("eventContainer");
container.innerHTML = "";

events.forEach(event => {
container.innerHTML += `
<div class="event-card">
<h3>${event.title}</h3>
<p class="event-date">
${new Date(event.date).toDateString()}
</p>
<p class="event-desc">${event.description}</p>
<button onclick="registerEvent('${event._id}')">
Register
</button>
</div>`;
});

}catch(err){
console.log("Event load error",err);
}
}

loadEvents();


async function registerEvent(id) {
try{
const name = prompt("Enter your name");
const email = prompt("Enter your email");

if(!name || !email){
alert("All fields required");
return;
}

await fetch("http://localhost:5000/api/events/register", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ eventId: id, name, email })
});

alert("Registered Successfully");

}catch(err){
console.log(err);
alert("Registration failed");
}
}


/* ========================================= */
/* ============ LOAD MORE EVENTS =========== */
/* ========================================= */

function loadMoreEvents(){
loadEvents();   // reuse same function
}


/* ========================================= */
/* ============ GALLERY REDIRECT =========== */
/* ========================================= */

function goToFullGallery(){
window.location.href="gallery.html";
}


/* ========================================= */
/* ============ TESTIMONIAL SLIDER ========= */
/* ========================================= */

let index=0;
const testimonials=document.querySelectorAll(".testimonial");

function showTestimonial(){
if(testimonials.length === 0) return;

testimonials.forEach(t=>t.classList.remove("active"));
testimonials[index].classList.add("active");
index=(index+1)%testimonials.length;
}

setInterval(showTestimonial,3000);
showTestimonial();