const users = [
    { username: "amine", password: "odcpass1" },
    { username: "yvan", password: "odcpass2" },
    { username: "faycal", password: "odcpass3" },
    { username: "adama", password: "odcpass4" },
    { username: "ismael", password: "odcpass5" },
    { username: "alia", password: "odcpass6" },
    { username: "yvan", password: "odcpass7" },
    { username: "brutus", password: "odcpass8" },
    { username: "najib", password: "odcpass9" },
    { username: "alyune", password: "odcpass10" },
    { username: "babacar", password: "odcpass11" },
    { username: "admin", password: "odcadmin" }
];

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', username);
        window.location.href = "matchmakingPage.html";
    } else {
        document.getElementById('error').innerText = "Invalid username or password";
    }
});
