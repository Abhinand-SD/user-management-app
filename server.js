const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const path = require("path");
const connectDB = require("./db/connectDB");
const session = require("express-session");
// const nocache = require('nocache');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
//statc assets

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: false, maxAge: 3600000 }
  })
);


//for cache handling
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  next();
});

//middleware
app.use(express.static("public"));

//view engine setup
app.use("/user", userRoutes);
  app.use("/admin", adminRoutes);

  app.use(express.json()); // To parse JSON requests

  // Routes
  app.use("/admin/api", userRoutes);



connectDB();

app.listen(3001, () => {
  console.log("server is running on : http://localhost:3001/user/login");
});
