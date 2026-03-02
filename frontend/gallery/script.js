const API = "http://localhost:5000/api/gallery";

let isAdmin = true; // false = user mode

const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", uploadImage);

async function uploadImage() {
  const form = new FormData();
  form.append("image", fileInput.files[0]);

  try {
    await fetch(API + "/upload", {
      method: "POST",
      body: form
    });

    loadGallery();
  } catch (err) {
    alert("Upload failed");
  }
}

async function loadGallery() {
  const res = await fetch(API);
  const data = await res.json();

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  data.forEach(img => {
    const card = document.createElement("div");
    card.className = "card";

    // ✅ CLOUDINARY DIRECT URL USE
    card.innerHTML = `
      <img src="${img.imageUrl}" loading="lazy">
      <a href="${img.imageUrl}" download class="download">Download</a>
      ${isAdmin ? `<div class="delete" onclick="deleteImg('${img._id}')">X</div>` : ""}
    `;

    gallery.appendChild(card);
  });
}

async function deleteImg(id) {
  await fetch(API + "/" + id, { method: "DELETE" });
  loadGallery();
}

loadGallery();
