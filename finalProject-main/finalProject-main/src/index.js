require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("./config/mongo-connection");
const Router = require("./routes");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(cookieParser());

const swaggerOption = {};

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer",
      },
      servers: ["http://localhost:5000"],
    },
  },
  // ['.routes/*.js']
  apis: ["app.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docscocktail", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.privateKey,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/", Router);

app.listen(8000, () => {
  console.log("server abc chay cong 8000");
});
