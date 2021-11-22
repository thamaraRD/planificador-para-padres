const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();
console.log(process.env.SECRET_KEY);
const ParentsRoutes = require("./server/routes/parent.routes");
const TaskRoutes = require('./server/routes/task.routes');
require("./server/config/mongoose.config");

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ParentsRoutes(app);
TaskRoutes(app);

app.listen(port, () => {console.log(`Listening at Port ${port}`)});
