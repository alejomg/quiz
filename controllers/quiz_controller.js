// se importa el modelo de DB
var models = require("../models/models.js");

// autoload: se ejecuta si la ruta incluye quizId
// a la vez, también se refactoriza el código
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId)
	.then(
		function(quiz) {
			if(quiz) {
				req.quiz = quiz;
				next();
			}
			else {
				next(new Error("No existe una pregunta con id: " + quizId));
			}
		}
	)	
	.catch(
		function(error) {
			next(error);
		}
	);
};

/* acciones del controlador, variables y sus vistas asociadas */
var _appTitle = "NeoQuiz";
var _intro = _appTitle + ": el juego de preguntas y respuestas.";

// GET /quizes
exports.index = function(req, res) {
	var search = (req.query.search) ? "%" + req.query.search + "%" : "%";
	search = search.replace(/ /g, "%");
	console.log("buscando: " + search);
	models.Quiz.findAll({where: ["pregunta like ?", search], order: [["pregunta", "ASC"]]})
	.then(
		function(quizes) {
			res.render('quizes/index', {
				appTitle: _appTitle,
				intro: _intro,
				quizes: quizes
			});
		}
	)	
	.catch(
		function(error) {
			next(error);
		}
	);
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {
		appTitle: _appTitle,
		intro: _intro,
		quiz: req.quiz
	});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var solucion = "Incorrecto";
	var resultado = 0;
	if(req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
		solucion = "Correcto";
		resultado = 1;
	}
	res.render('quizes/answer', {
		appTitle: _appTitle,
		intro: _intro,
		solucion: solucion,
		resultado: resultado,
		quiz: req.quiz
	});
};
