const username = sessionStorage.getItem("username");
const balance = sessionStorage.getItem("balance");

if (!username) {
    window.location.href = "index.html";
} else {
    document.getElementById("welcome-text").textContent = "Welcome, " + username;
    document.getElementById("balance-text").textContent = "$" + parseFloat(balance).toFixed(2);
}

document.getElementById("logout-btn").addEventListener("click", function () {
    sessionStorage.clear();
    window.location.href = "index.html";
});