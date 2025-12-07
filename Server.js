require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const contactRoute = require('./Router/Contact-router');
const adminRoute = require("./Router/Admin-router");
const router = require('./Router/Auth-router');
const connectDb = require("./Utils/Db");
const errorMiddelware = require('./Middleware/error-middleware');

const corsOptions = {
    origin: process.env.FRONTEND_URL,  //"http://localhost:5173"
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", router);
app.use("/api/form", contactRoute);

app.use("/api/admin", adminRoute);

app.use(errorMiddelware);

const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);   
   });
});
