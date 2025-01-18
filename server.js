const express = require("express");
const { createServer } = require("http");
require("dotenv").config();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error.middleware");
const app = express();
const httpServer = createServer(app);
// socket
const { initSocket } = require("./socket");
initSocket(httpServer);
// socket
app.use(express.json());
app.use(express.static("static"));
app.use(cookieParser({}));
app.use(fileUpload({}));
app.use(cors());


// API endpoints
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/post", require("./routes/post.route"));

const PORT = process.env.PORT || 8080;
const bootstrap = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("Connected DB"));
    httpServer.listen(PORT, () => {
      console.log(`Listening on - ${PORT}`);
    });
  } catch (error) {
    console.log(`Error conecting with DB: ${error}`);
  }
};

bootstrap();
