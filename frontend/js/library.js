/* ================= GLOBAL CONFIG ================= */

const API_BASE = "http://localhost:5000/api";

/* ================= UTILITY ================= */

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/* ================= DASHBOARD UPDATE ================= */

async function updateDashboard() {
    try {
        const booksRes = await fetch(`${API_BASE}/books`);
        const books = await booksRes.json();

        const issueRes = await fetch(`${API_BASE}/issues`);
        const issues = await issueRes.json();

        const totalBooks = books.length;
        const issuedBooks = issues.length;
        const availableBooks = books.reduce((sum, book) => sum + (book.available || 0), 0);

        document.getElementById("totalBooks").innerText = totalBooks;
        document.getElementById("issuedBooks").innerText = issuedBooks;
        document.getElementById("availableBooks").innerText = availableBooks;

    } catch (err) {
        console.error(err);
    }
}

/* ================= LOAD BOOKS ================= */

async function loadBooks() {
    try {
        const res = await fetch(`${API_BASE}/books`);
        const books = await res.json();

        const tbody = document.querySelector("#books tbody");
        tbody.innerHTML = "";

        books.forEach((book, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>${book.category}</td>
                <td>${book.publication}</td>
                <td>${book.total}</td>
                <td>${book.available}</td>
                <td>${book.available > 0 ? "Available" : "Out of Stock"}</td>
                <td>
                    <button onclick="deleteBook('${book._id}')">Delete</button>
                </td>
            `;

            tbody.appendChild(tr);
        });

    } catch (err) {
        console.error(err);
    }
}

/* ================= ADD BOOK ================= */

async function addBook(bookData) {
    try {
        await fetch(`${API_BASE}/books`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookData)
        });

        showToast("Book Added Successfully");
        loadBooks();
        updateDashboard();
    } catch (err) {
        console.error(err);
    }
}

/* ================= DELETE BOOK ================= */

async function deleteBook(id) {
    if (!confirm("Are you sure?")) return;

    try {
        await fetch(`${API_BASE}/books/${id}`, {
            method: "DELETE"
        });

        showToast("Book Deleted");
        loadBooks();
        updateDashboard();
    } catch (err) {
        console.error(err);
    }
}

/* ================= ISSUE BOOK ================= */

async function issueBook(memberId, bookId, date) {
    try {
        await fetch(`${API_BASE}/issue`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ memberId, bookId, issueDate: date })
        });

        showToast("Book Issued Successfully");
        updateDashboard();
    } catch (err) {
        console.error(err);
    }
}

/* ================= FORM HANDLING ================= */

document.addEventListener("DOMContentLoaded", () => {

    updateDashboard();
    loadBooks();

    /* Issue Form */
    const issueForm = document.querySelector("#issues form");
    if (issueForm) {
        issueForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const inputs = issueForm.querySelectorAll("input");
            const memberId = inputs[0].value;
            const bookId = inputs[1].value;
            const date = inputs[2].value;

            issueBook(memberId, bookId, date);
            issueForm.reset();
        });
    }

    /* Smooth Sidebar Scroll */
    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth" });
        });
    });

});

/* ================= BASIC SEARCH FILTER ================= */

const searchInputs = document.querySelectorAll("#books input");

searchInputs.forEach(input => {
    input.addEventListener("keyup", function () {
        const filter = this.value.toLowerCase();
        const rows = document.querySelectorAll("#books tbody tr");

        rows.forEach(row => {
            row.style.display = row.innerText.toLowerCase().includes(filter)
                ? ""
                : "none";
        });
    });
});