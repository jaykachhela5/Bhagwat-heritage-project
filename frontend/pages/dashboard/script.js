const API = "http://localhost:5000/api/media";
let page = 1;

/* Check Login */
if(!localStorage.token){
  location = "login.html";
}

/* Upload Images */
function upload(){
  const files = document.getElementById("files").files;
  const progress = document.getElementById("progress");

  if(files.length === 0){
    alert("Select images first");
    return;
  }

  const formData = new FormData();

  for(let file of files){
    formData.append("images", file);
  }

  const xhr = new XMLHttpRequest();

  xhr.open("POST", API + "/upload");

  xhr.upload.onprogress = e => {
    progress.value = (e.loaded / e.total) * 100;
  };

  xhr.onload = () => {
    progress.value = 0;
    load();
  };

  xhr.send(formData);
}

/* Load Images with Pagination + Search */
async function load(){
  const search = document.getElementById("search").value;

  const res = await fetch(`${API}/media?page=${page}&search=${search}`);
  const data = await res.json();

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  data.data.forEach(img => {
    gallery.innerHTML += `
      <div class="card">
        <img src="http://localhost:5000${img.filepath}">
        <p>${img.filename}</p>
        <button class="delete" onclick="del('${img._id}')">Delete</button>
      </div>
    `;
  });
}

/* Delete Image */
async function del(id){
  await fetch(API + "/" + id, { method:"DELETE" });
  load();
}

/* Pagination */
function next(){
  page++;
  load();
}

function prev(){
  if(page > 1){
    page--;
    load();
  }
}

/* Logout */
function logout(){
  localStorage.removeItem("token");
  location = "login.html";
}

load();
