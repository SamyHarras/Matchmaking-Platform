document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('currentUser');

    function bookMeeting(expertName) {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
        if (!bookings[userName]) {
            bookings[userName] = [];
        }
        if (bookings[userName].includes(expertName)) {
            if (confirm(`Do you want to cancel the meeting with ${expertName}?`)) {
                bookings[userName] = bookings[userName].filter(expert => expert !== expertName);
                localStorage.setItem('bookings', JSON.stringify(bookings));
                updateButton(expertName, false);
                updateBookedList();
                alert('Meeting canceled successfully!');
            }
        } else {
            if (bookings[userName].length >= 11) {
                alert('You have reached the maximum number of bookings (10).');
                return;
            }
            if (confirm(`Do you want to book a meeting with ${expertName}?`)) {
                bookings[userName].push(expertName);
                localStorage.setItem('bookings', JSON.stringify(bookings));
                updateButton(expertName, true);
                updateBookedList();
                alert('Meeting booked successfully!');
            }
        }
    }

    function updateButton(expertName, booked) {
        const buttons = document.querySelectorAll(`[data-expert='${expertName}']`);
        buttons.forEach(button => {
            if (booked) {
                button.classList.add('booked');
                button.style.backgroundColor = 'orange';
                button.textContent = 'Cancel Meeting';
                button.style.pointerEvents = 'auto';
            } else {
                button.classList.remove('booked');
                button.style.backgroundColor = '';
                button.textContent = 'Book Meeting';
                button.style.pointerEvents = 'auto';
            }
        });
    }

    function updateBookedList() {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
        const bookedList = document.getElementById('booked-startups-list');
        bookedList.innerHTML = ''; // Clear previous list
        if (bookings[userName]) {
            bookings[userName].forEach(expertName => {
                const listItem = document.createElement('li');
                listItem.textContent = expertName;
                bookedList.appendChild(listItem);
            });
        }
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

    // Load initial button states and booked list
    const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
    if (bookings[userName]) {
        bookings[userName].forEach(expertName => {
            updateButton(expertName, true);
        });
        updateBookedList();
    }
});