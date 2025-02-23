const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // Đảm bảo load biến môi trường từ file .env

const cookieParser = require("cookie-parser");
const route = require('./src/routes/index');
const app = express();
const port = 3000;
const db = require('./src/config/index');

// Routes init
const cors = require('cors');
app.use(cors({
    origin: "http://localhost:5173", // Địa chỉ frontend
    credentials: true  // ✅ Cho phép gửi cookie
}));
app.use(cookieParser());
app.use(express.json());

// Connect DB
db.connect();

route(app);
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
