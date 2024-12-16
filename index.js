const express = require('express')
const app = express()
const cors = require("cors");

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config();

export default function handler(req, res) {
    // Allow the specific frontend origin
    res.setHeader('Access-Control-Allow-Origin', 'https://book-app-frontend-8s8ov3f8z-dhinesh-ms-projects-2ba403a4.vercel.app');

    // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // If you're handling preflight (OPTIONS) requests:
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.status(200).end();
        return;
    }

    // Regular API logic
    res.status(200).json({ message: 'CORS enabled!' });
}

// middlewares
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5174', 'https://book-app-frontend-3wr03oecu-dhinesh-ms-projects-2ba403a4.vercel.app  '],
    credentials: true
}));

// routes
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require("./src/orders/order.route")
const userRoutes =  require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Book server!')
    })
}

main().then(() => console.log('Mongodb connected successfully')).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})