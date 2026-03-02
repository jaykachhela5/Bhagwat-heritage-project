console.log("Bhagwat Heritage About Page Loaded");
fetch("http://localhost:5000/api/objectives")
.then(res=>res.json())
.then(data=>{
    let html="";
    data.forEach(item=>{
        html+=`
        <div class="obj-box">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>`;
    });
    document.getElementById("data").innerHTML=html;
});