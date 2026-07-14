function login() {
    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    })
    .then(res => res.json())
.then(data => {
    if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", data.isAdmin);
        window.location.href = "index.html";
    } else {
        alert(data.message || "Login failed");
    }
});
}
