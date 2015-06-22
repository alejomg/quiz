// se importa el modelo de DB
var models = require("../models/models.js");


/* acciones del controlador y sus vistas asociadas */

/*
// GET /quizes/question
exports.question = function(req, res) {
	models.Quiz.findAll().success(function(quiz) {
		res.render('quizes/question', {
			appTitle: 'Quiz',
			intro: 'Quiz: el juego de preguntas y respuestas.',
			pregunta: quiz[0].pregunta
		})
	});
};

// GET /quizes/answer
exports.answer = function(req, res) {
	models.Quiz.findAll().success(function(quiz) {
		if(req.query.respuesta.toUpperCase() === quiz[0].respuesta.toUpperCase()) {
			res.render('quizes/answer', {
				appTitle: 'Quiz',
				intro: 'Quiz: el juego de preguntas y respuestas.',
				solucion: 'Correcto'
			});
		}
		else {
			res.render('quizes/answer', {
				appTitle: 'Quiz',
				intro: 'Quiz: el juego de preguntas y respuestas.',
				solucion: 'Incorrecto'
			});
		}
	});
};
*/

// GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs', {
			appTitle: 'Quiz',
			intro: 'Quiz: el juego de preguntas y respuestas.',
			quizes: quizes
		})
	});
};

// GET /quizes/:id
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {
			appTitle: 'Quiz',
			intro: 'Quiz: el juego de preguntas y respuestas.',
			quiz: quiz
		})
	});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		if(req.query.respuesta.toUpperCase() === quiz.respuesta.toUpperCase()) {
			res.render('quizes/answer', {
				appTitle: 'Quiz',
				intro: 'Quiz: el juego de preguntas y respuestas.',
				solucion: 'Correcto',
				resultado: 1,
				quiz: quiz
			});
		}
		else {
			res.render('quizes/answer', {
				appTitle: 'Quiz',
				intro: 'Quiz: el juego de preguntas y respuestas.',
				solucion: 'Incorrecto',
				resultado: 0,
				quiz: quiz
			});
		}
	});
};
