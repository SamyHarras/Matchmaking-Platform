const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Use the port provided by Render.com or default to 3000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let bookings = {};
let bookingHistory = [];

// Handle API requests
app.get('/api/bookings', (req, res) => {
    res.json(bookings);
});

app.get('/api/history', (req, res) => {
    res.json(bookingHistory);
});

app.post('/api/book', (req, res) => {
    const { userName, expertName } = req.body;
    if (!bookings[userName]) {
        bookings[userName] = [];
    }

    let message;
    let booked = false;
    if (bookings[userName].includes(expertName)) {
        bookings[userName] = bookings[userName].filter(expert => expert !== expertName);
        bookingHistory.push(`${userName} cancelled booking with ${expertName}`);
        message = `Cancelled booking with ${expertName}`;
    } else {
        bookings[userName].push(expertName);
        bookingHistory.push(`${userName} booked a meeting with ${expertName}`);
        booked = true;
        message = `Booked a meeting with ${expertName}`;
    }

    res.json({ success: true, booked, message });
});

app.post('/api/clear', (req, res) => {
    bookings = {};
    bookingHistory = [];
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
