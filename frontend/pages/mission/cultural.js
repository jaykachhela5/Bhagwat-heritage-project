fetch("http://localhost:5000/api/cultural")
.then(res => res.json())
.then(data => {
let html="";
data.forEach(item=>{
html+=`
<div class="card">
<img src="${item.image}">
<h3>${item.title}</h3>
<p>${item.description}</p>
</div>`;
});
document.getElementById("culturalData").innerHTML = html;
});