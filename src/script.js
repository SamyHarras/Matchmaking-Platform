document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('currentUser');

    async function bookMeeting(expertName) {
        const response = await fetch('/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: userName, expert: expertName })
        });

        const result = await response.json();
        if (result.success) {
            updateButton(expertName, result.booked);
            updateBookedList();
            alert(result.message);
        } else {
            alert(result.message);
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

    async function updateBookedList() {
        const response = await fetch(`/bookings?user=${userName}`);
        const bookings = await response.json();

        const bookedList = document.getElementById('booked-startups-list');
        bookedList.innerHTML = ''; // Clear previous list
        bookings.forEach(expertName => {
            const listItem = document.createElement('li');
            listItem.textContent = expertName;
            bookedList.appendChild(listItem);
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

    // Load initial button states and booked list
    updateBookedList();
});
