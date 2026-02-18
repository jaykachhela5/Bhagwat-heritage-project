async function login(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const role = document.getElementById("role").value;

const res = await fetch("http://localhost:5000/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,password,role})
});

const data = await res.json();

if(data.success){

localStorage.setItem("role",data.role);
localStorage.setItem("name",data.name);

// ROLE BASED REDIRECT
if(data.role==="admin") window.location="admin.html";
if(data.role==="donor") window.location="donor.html";
if(data.role==="volunteer") window.location="volunteer.html";

}else{
document.getElementById("msg").innerText="Invalid Login";
}

}
