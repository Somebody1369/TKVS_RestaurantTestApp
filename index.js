const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");
const menuRoutes = require("./routes/menu");
const paymentRouter = require("./routes/payment");

//auth
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const authRoutes = require("./routes/auth");
const favicon = require("serve-favicon");

//all
const PORT = process.env.PORT || 3000;

const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//auth
// Настройка сессий
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Настройка passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Middleware для проверки авторизации
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Если пользователь аутентифицирован, передаем информацию в шаблоны
    res.locals.isAuthenticated = true;
    res.locals.user = req.user;
  } else {
    // Если пользователь не аутентифицирован, передаем информацию в шаблоны
    res.locals.isAuthenticated = false;
  }
  next();
};
console.log(isAuthenticated);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// Подключение маршрутов
app.use("/payment", paymentRouter);
app.use("/", authRoutes);
app.use(menuRoutes);

//Функция подключения у БД и запуска сервера
async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://anastasiiakravt:scLY7DDpaw5GZz7D@cluster0.anldxmt.mongodb.net/restaurant",
      {
        useNewUrlParser: true,
        useFindAndModify: false,
      }
    );
    app.listen(PORT, () => {
      console.log("Server has been started...");
    });
  } catch (e) {
    console.log(e);
  }
}

start();
