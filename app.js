var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

//añade vistas parciales y permite crear un layout común a la aplicación
var partials = require("express-partials");

//gestiona las sesiones de la aplicación
var session = require("express-session");

var routes = require("./routes/index");

// se añade para gestionar los metodos PUT y DELETE, pasandole el parametro _method
var methodOverride = require("method-override");

var app = express();

/* variables de la app */
var _appTitle = "NeoQuiz";
var _intro = _appTitle + ": el juego de preguntas y respuestas.";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("NeoQuiz"));//el string del parametro es una semilla para mayor seguridad al generar el cifrado de las cookies
app.use(session());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// helpers dinámicos
app.use(function(req, res, next) {
    // se guarda el path en req.session.redir para después de hacer login volver a donde estaba
    if(!req.path.match(/\/login|\/logout/)) {
        req.session.redir = req.path;
    }

    // si hay usuario logado, se comprueba el tiempo que lleva inactivo
    if(req.session.user) {
        if(req.session.hora) {
            // tiene registrada la hora de la ultima solicitud, se comprueba si es superior a 2 minutos
            var ultimaSolicitud = new Date().getTime();
            var intervalo = ultimaSolicitud - req.session.hora;
            console.log("req.session.hora: " + req.session.hora);
            console.log("ultimaSolicitud: " + ultimaSolicitud);
            console.log("intervalo: " + intervalo);
            if(intervalo <= (2 * 60 * 1000)) {
                // si es inferior a 2 minutos, se actualiza la hora de la solicitud
                req.session.hora = ultimaSolicitud;
            }
            else {
                // si es superior a 2 minutos
                // se elimina req.session.user de la sesión
                delete req.session.user;
                // se actualiza la hora de la ultima solicitud
                req.session.hora = new Date().getTime();
                // se redirecciona al login
                res.redirect("/login");
                return;
            }
        }
        else {
            // NO tiene registrada la hora de la ultima solicitud, asi que se guarda
            req.session.hora = new Date().getTime();
        }
    }

    // se hace visible req.session en las vistas
    res.locals.session = req.session;
    next();
});

app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            appTitle: _appTitle,
            intro: _intro,
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        appTitle: _appTitle,
        intro: _intro,
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;
