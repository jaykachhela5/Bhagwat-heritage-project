function scrollToAdmission(){
    document.getElementById("admission").scrollIntoView({behavior:"smooth"});
}

document.getElementById("admissionForm")
.addEventListener("submit", async function(e){
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    const response = await fetch("http://localhost:5000/api/pathshala",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById("responseMessage").innerText = result.message;
    this.reset();
});
