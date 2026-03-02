/* ===================================================== */
/* ================= GLOBAL VARIABLES ================== */
/* ===================================================== */

let currentIndex = 0;
let currentImages = [];
let currentFolder = "all";
let currentCategory = "all";

/* ===================================================== */
/* ================= INIT FUNCTION ===================== */
/* ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    updateImageCount();
    applyDarkMode();
    attachCardClick();
});

/* ===================================================== */
/* ================= IMAGE COUNT ======================= */
/* ===================================================== */

function updateImageCount() {
    const cards = document.querySelectorAll(".gallery-card");
    document.getElementById("totalImages").innerText = cards.length;
}

/* ===================================================== */
/* ================= SEARCH ============================ */
/* ===================================================== */

document.getElementById("searchInput").addEventListener("input", function () {
    const value = this.value.toLowerCase();
    const cards = document.querySelectorAll(".gallery-card");

    cards.forEach(card => {
        const title = card.querySelector("h4").innerText.toLowerCase();
        card.style.display = title.includes(value) ? "block" : "none";
    });
});

/* ===================================================== */
/* ================= SORT ============================== */
/* ===================================================== */

document.getElementById("sortSelect").addEventListener("change", function () {
    const container = document.getElementById("galleryContainer");
    const cards = Array.from(container.querySelectorAll(".gallery-card"));
    const value = this.value;

    cards.sort((a, b) => {
        const titleA = a.querySelector("h4").innerText;
        const titleB = b.querySelector("h4").innerText;
        const dateA = new Date(a.querySelector("p").innerText);
        const dateB = new Date(b.querySelector("p").innerText);

        if (value === "az") return titleA.localeCompare(titleB);
        if (value === "za") return titleB.localeCompare(titleA);
        if (value === "latest") return dateB - dateA;
        if (value === "oldest") return dateA - dateB;
    });

    cards.forEach(card => container.appendChild(card));
});

/* ===================================================== */
/* ================= FILTER CATEGORY =================== */
/* ===================================================== */

function filterCategory(category) {
    currentCategory = category;
    const cards = document.querySelectorAll(".gallery-card");

    cards.forEach(card => {
        const matchCategory = category === "all" || card.dataset.category === category;
        const matchFolder = currentFolder === "all" || card.dataset.folder === currentFolder;

        card.style.display = (matchCategory && matchFolder) ? "block" : "none";
    });

    document.querySelectorAll(".filter-section button").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
}

/* ===================================================== */
/* ================= FILTER FOLDER ===================== */
/* ===================================================== */

function openFolder(folder) {
    currentFolder = folder;
    filterCategory(currentCategory);
}

/* ===================================================== */
/* ================= GRID / LIST TOGGLE ================ */
/* ===================================================== */

function toggleView() {
    const container = document.getElementById("galleryContainer");
    container.classList.toggle("list-view");
}

/* ===================================================== */
/* ================= DARK MODE ========================= */
/* ===================================================== */

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

function applyDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }
}

/* ===================================================== */
/* ================= LIGHTBOX ========================== */
/* ===================================================== */

function attachCardClick() {
    document.querySelectorAll(".gallery-card").forEach((card, index) => {
        card.addEventListener("click", () => openLightbox(index));
    });
}

function openLightbox(index) {
    const cards = document.querySelectorAll(".gallery-card");
    currentImages = Array.from(cards);
    currentIndex = index;

    const img = currentImages[index].querySelector("img").src;
    const title = currentImages[index].querySelector("h4").innerText;
    const date = currentImages[index].querySelector("p").innerText;

    document.getElementById("lightboxImage").src = img;
    document.getElementById("lightboxTitle").innerText = title;
    document.getElementById("lightboxDate").innerText = date;

    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    openLightbox(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    openLightbox(currentIndex);
}

/* Keyboard Navigation */

document.addEventListener("keydown", (e) => {
    if (document.getElementById("lightbox").style.display === "flex") {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeLightbox();
    }
});

/* ===================================================== */
/* ================= DOWNLOAD ========================== */
/* ===================================================== */

function downloadImage() {
    const imgSrc = document.getElementById("lightboxImage").src;
    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = "image.jpg";
    link.click();
}

/* ===================================================== */
/* ================= DELETE ============================ */
/* ===================================================== */

function deleteImage() {
    if (confirm("Delete this image?")) {
        currentImages[currentIndex].remove();
        closeLightbox();
        updateImageCount();
    }
}

/* ===================================================== */
/* ================= EDIT TITLE ======================== */
/* ===================================================== */

function editImage() {
    const newTitle = prompt("Enter new title:");
    if (newTitle) {
        currentImages[currentIndex].querySelector("h4").innerText = newTitle;
        document.getElementById("lightboxTitle").innerText = newTitle;
    }
}

/* ===================================================== */
/* ================= UPLOAD MODAL ====================== */
/* ===================================================== */

function openUploadModal() {
    document.getElementById("uploadModal").style.display = "flex";
}

function closeUploadModal() {
    document.getElementById("uploadModal").style.display = "none";
}

/* ===================================================== */
/* ================= DRAG & DROP ======================= */
/* ===================================================== */

const dropArea = document.getElementById("dropArea");
const uploadInput = document.getElementById("uploadImage");
const previewArea = document.getElementById("previewArea");

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.background = "#e0f7fa";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.background = "";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadInput.files = e.dataTransfer.files;
    previewImages(uploadInput.files);
});

uploadInput.addEventListener("change", () => {
    previewImages(uploadInput.files);
});

function previewImages(files) {
    previewArea.innerHTML = "";
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "80px";
            img.style.margin = "5px";
            previewArea.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

/* ===================================================== */
/* ================= SAVE UPLOAD ======================= */
/* ===================================================== */

function saveImages() {
    const title = document.getElementById("uploadTitle").value;
    const date = document.getElementById("uploadDate").value;
    const category = document.getElementById("uploadCategory").value;
    const folder = document.getElementById("uploadFolderSelect").value;
    const files = uploadInput.files;

    const container = document.getElementById("galleryContainer");

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const card = document.createElement("div");
            card.className = "gallery-card";
            card.dataset.category = category;
            card.dataset.folder = folder;

            card.innerHTML = `
                <img src="${e.target.result}">
                <div class="card-content">
                    <h4>${title}</h4>
                    <p>${date}</p>
                </div>
            `;

            container.appendChild(card);
            attachCardClick();
            updateImageCount();
        };
        reader.readAsDataURL(file);
    });

    closeUploadModal();
}

/* ===================================================== */
/* ================= CREATE FOLDER ===================== */
/* ===================================================== */

function createFolder() {
    const name = document.getElementById("newFolderName").value;
    if (!name) return;

    const li = document.createElement("li");
    li.innerText = name;
    li.onclick = () => openFolder(name.toLowerCase());

    document.getElementById("folderList").appendChild(li);
    document.getElementById("newFolderName").value = "";
}