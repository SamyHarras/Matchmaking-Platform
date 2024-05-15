const users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" },
    { username: "user3", password: "pass3" },
    { username: "user4", password: "pass4" },
    { username: "user5", password: "pass5" },
    { username: "user6", password: "pass6" },
    { username: "user7", password: "pass7" },
    { username: "user8", password: "pass8" },
    { username: "user9", password: "pass9" },
    { username: "user10", password: "pass10" },
    { username: "user11", password: "pass11" }
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
