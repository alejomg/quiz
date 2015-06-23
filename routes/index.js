var express = require("express");
var router = express.Router();

// se importa el controller con la lógica
var quizController = require("../controllers/quiz_controller");

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
  	descripcion: _descripcion
  });
});

// autoload: se ejecuta cuando la ruta incluye el parámetro quizId
// debe definirse antes de las rutas donde se va a usar
router.param("quizId", quizController.load);

// cada ruta que se define en el enrutador tiene que tener una acción asociada
//router.get("/quizes/question", quizController.question);
//router.get("/quizes/answer", quizController.answer);
router.get("/quizes", quizController.index);
router.get("/quizes/:quizId(\\d+)", quizController.show);
router.get("/quizes/:quizId(\\d+)/answer", quizController.answer);
router.get("/quizes/new", quizController.new);
router.post("/quizes/create", quizController.create);

/* GET author page. */
router.get("/author", function(req, res) {
  res.render("author", {
  	appTitle: _appTitle,
  	intro: _intro,
  	author: _author
  });
});

module.exports = router;
