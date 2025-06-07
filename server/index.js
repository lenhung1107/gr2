const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // Đảm bảo load biến môi trường từ file .env

const cookieParser = require("cookie-parser");
const route = require('./src/routes/index');
const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./src/config/index');

// Routes init
const cors = require('cors');
const allowedOrigins = [
    'http://localhost:5173',
     'http://localhost:5174',
    'https://gr2-o3rfs9qy4-nhungles-projects.vercel.app',
    'https://gr2-liard.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Connect DB
db.connect();

route(app);
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
// const express = require('express');
// const dotenv = require('dotenv');
// dotenv.config(); // Đảm bảo load biến môi trường từ file .env

// const cookieParser = require("cookie-parser");
// const route = require('./src/routes/index');
// const app = express();
// const port = 4000;
// const db = require('./src/config/index');

// // Routes init
// const cors = require('cors');
// // app.use(cors({
// //     origin: "http://localhost:5173", // Địa chỉ frontend
// //     credentials: true  // ✅ Cho phép gửi cookie
// // }));
// app.use(cors({
//     origin: true,  // Cho phép mọi origin (hoặc dùng biến môi trường cho an toàn)
//     credentials: true
// }));

// app.use(cookieParser());
// app.use(express.json());

// // Connect DB
// db.connect();

// route(app);
// const path = require('path');

// // Serve static files từ thư mục dist đã build
// app.use(express.static(path.join(__dirname, '../client/dist')));

// // Với mọi request không khớp route backend → trả về index.html (SPA)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
// });

// app.listen(port, () => console.log(`listening at http://localhost:${port}`));
