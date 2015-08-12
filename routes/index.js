var express = require("express");
var router = express.Router();

// se importan los controllers con la lógica
var quizController = require("../controllers/quiz_controller");
var commentController = require("../controllers/comment_controller");
var sessionController = require("../controllers/session_controller");

/* variables de la app */
var _appTitle = "NeoQuiz";
var _bienvenida = "Bienvenido a " + _appTitle;
var _descripcion = "El portal donde podrá crear su propio juego de preguntas y respuestas.";
var _intro = _appTitle + ": el juego de preguntas y respuestas.";
var _author = "Alejandro Martínez Gallego.";

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", {
  	appTitle: _appTitle,
  	intro: _bienvenida,
  	descripcion: _descripcion,
    errors: []
  });
});

// autoload: se ejecuta cuando la ruta incluye el parámetro quizId
// debe definirse antes de las rutas donde se va a usar
router.param("quizId", quizController.load);

/* cada ruta que se define en el enrutador tiene que tener una acción asociada */
// rutas de sesión
router.get("/login", sessionController.new);      // formulario de login
router.post("/login", sessionController.create);  // crear la sesión
router.get("/logout", sessionController.destroy); // destruir la sesión

// rutas de quizController
router.get("/quizes", quizController.index);
router.get("/quizes/:quizId(\\d+)", quizController.show);
router.get("/quizes/:quizId(\\d+)/answer", quizController.answer);
router.get("/quizes/new", sessionController.loginRequired, quizController.new); // middlewares en serie, el 2º MW se ejecuta sólo si loginRequired pasa el control con next()
router.post("/quizes/create", sessionController.loginRequired, quizController.create);
router.get("/quizes/:quizId(\\d+)/edit", sessionController.loginRequired, quizController.edit);
router.put("/quizes/:quizId(\\d+)", sessionController.loginRequired, quizController.update);
router.delete("/quizes/:quizId(\\d+)", sessionController.loginRequired, quizController.destroy);

// rutas de commentController
router.get("/quizes/:quizId(\\d+)/comments/new", commentController.new);
router.post("/quizes/:quizId(\\d+)/comments", commentController.create);


/* GET author page. */
router.get("/author", function(req, res) {
  res.render("author", {
  	appTitle: _appTitle,
  	intro: _intro,
  	author: _author,
    errors: []
  });
});

module.exports = router;
