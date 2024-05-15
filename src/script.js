document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('currentUser');

    function bookMeeting(expertName) {
        if (confirm(`Do you want to book a meeting with ${expertName}?`)) {
            const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
            if (!bookings[userName]) {
                bookings[userName] = [];
            }
            if (bookings[userName].includes(expertName)) {
                alert('You have already booked a meeting with this expert.');
                return;
            }
            if (bookings[userName].length >= 6) {
                alert('You have reached the maximum number of bookings (6).');
                return;
            }
            bookings[userName].push(expertName);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            updateButton(expertName);
            alert('Meeting booked successfully!');
        }
    }

    function updateButton(expertName) {
        const buttons = document.querySelectorAll(`[data-expert='${expertName}']`);
        console.log(`Updating buttons for expert: ${expertName}`, buttons); // Debugging line
        buttons.forEach(button => {
            button.classList.add('booked');
        });
    }

    function searchExperts() {
        const searchTerm = document.getElementById('search-bar').value.toLowerCase();
        const experts = document.querySelectorAll('.expert-box');
        experts.forEach(expert => {
            const name = expert.querySelector('.expert-name').textContent.toLowerCase();
            const description = expert.querySelector('.startup-description').textContent.toLowerCase();
            if (name.includes(searchTerm) || description.includes(searchTerm)) {
                expert.style.display = '';
            } else {
                expert.style.display = 'none';
            }
        });
    }

    function switchTheme() {
        document.body.classList.toggle('dark-mode');
        const themeSwitcher = document.getElementById('theme-switcher');
        themeSwitcher.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeSwitcher.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            themeSwitcher.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    }

    document.getElementById('theme-switcher').addEventListener('click', switchTheme);
    document.getElementById('search-bar').addEventListener('keyup', searchExperts);
    document.querySelectorAll('.book-meeting').forEach(button => {
        button.addEventListener('click', (event) => {
            const expertName = event.target.dataset.expert;
            bookMeeting(expertName);
        });
    });

    // Load initial button states
    const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
    if (bookings[userName]) {
        bookings[userName].forEach(expertName => {
            updateButton(expertName);
        });
    }
});

// Admin page script
document.addEventListener('DOMContentLoaded', () => {
    const bookingsContainer = document.getElementById('bookings-container');
    const bookings = JSON.parse(localStorage.getItem('bookings')) || {};

    for (const [user, experts] of Object.entries(bookings)) {
        const userBookings = document.createElement('div');
        userBookings.classList.add('user-bookings');
        userBookings.innerHTML = `<h3>${user}</h3>`;
        experts.forEach(expert => {
            const expertItem = document.createElement('p');
            expertItem.textContent = expert;
            userBookings.appendChild(expertItem);
        });
        bookingsContainer.appendChild(userBookings);
    }
});
