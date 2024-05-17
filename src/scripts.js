// Temporary function to add initial users
async function addInitialUsers() {
    const initialUsers = [
        { username: "amine", password: "odcpass1" },
        { username: "yvan", password: "odcpass2" },
        { username: "faycal", password: "odcpass3" },
        { username: "adama", password: "odcpass4" },
        { username: "ismael", password: "odcpass5" },
        { username: "alia", password: "odcpass6" },
        { username: "asma", password: "odcpass7" },
        { username: "brutus", password: "odcpass8" },
        { username: "najib", password: "odcpass9" },
        { username: "alyune", password: "odcpass10" },
        { username: "babacar", password: "odcpass11" },
        { username: "admin", password: "odcadmin" }
    ];

    for (const user of initialUsers) {
        await addUser(user.username, user.password);
    }
}

// Call the function once to add the initial users
addInitialUsers();
