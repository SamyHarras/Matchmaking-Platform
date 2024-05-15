const users = [
    { username: "user1", password: "odcpass1" },
    { username: "user2", password: "odcpass2" },
    { username: "user3", password: "odcpass3" },
    { username: "user4", password: "odcpass4" },
    { username: "user5", password: "odcpass5" },
    { username: "user6", password: "odcpass6" },
    { username: "user7", password: "odcpass7" },
    { username: "user8", password: "odcpass8" },
    { username: "user9", password: "odcpass9" },
    { username: "user10", password: "odcpass10" },
    { username: "user11", password: "odcpass11" }
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
