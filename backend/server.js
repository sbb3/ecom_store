require("module-alias/register");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("@/db/conn");
const routes = require("@/routes");
const env = require("@/config/envalid");
const chalk = require("chalk");
const multer = require("multer");
const upload = multer();
const cookieParser = require("cookie-parser");
const corsOptions = require("@/config/corsOptions");
const { credentials } = require("./config/corsOptions");

connectDB();

const app = express();
// Cors implemented by web browsers to restrict web pages from making requests to a different domain than the one that served the web page.
// you might encounter CORS errors when your frontend (React) tries to make API requests to your backend (Node.js/Express) running on a different domain or port.
// To fix this, you need to configure your backend server to allow cross-origin requests from your frontend domain
// allow requests only from specific domain

// cross origin requests means that the frontend and backend are running on different domains or ports, so the browser will not allow the frontend to make requests to the backend
// cross-origin = different domain or port
// app.use(cors({
// 	origin: ["http://lopez:5173", "http://localhost:5173", "http://127.0.0.1:5173"],
// 	credentials: true,
// 	optionsSuccessStatus: 200
// }));
app.use(cors(corsOptions));
// app.use(cors("*"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(upload.none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log("server.js");
//   console.log(req.body);
//   next();
// });

app.use(routes);

app.listen(env.PORT, () => {
  console.log(chalk.magenta(`Server running on port ${env.PORT}`));
});
