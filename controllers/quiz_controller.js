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
				quizes: quizes,
				errors: []
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
		quiz: req.quiz,
		errors: []
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
		quiz: req.quiz,
		errors: []
	});
};

// GET /quizes/new
exports.new = function(req, res) {
	// se crea un objeto Quiz
	var quiz = models.Quiz.build({
		pregunta: "pregunta",
		respuesta: "respuesta"
	});
	res.render('quizes/new', {
		appTitle: _appTitle,
		intro: _intro,
		quiz: quiz,
		errors: []
	});
};

// POST /quizes/create
exports.create = function(req, res) {
	// se recupera el objeto Quiz de la request
	var quiz = models.Quiz.build(req.body.quiz);

	// validamos los campos de la tabla
	quiz.validate()
	.then(
		function(err) {
			if(err) {
				// si hay errores, mostramos la pagina de preguntas indicando los errores
				res.render('quizes/new', {
					appTitle: _appTitle,
					intro: _intro,
					quiz: quiz,
					errors: err.errors
				});
			}
			else {
				// si no hay errores, se guarda en DB un registro con los datos del objeto recuperado
				// y despues se redirige a la lista de preguntas
				quiz.save({fields: ["pregunta", "respuesta"]})
				.then(
					function(){
						res.redirect("/quizes");
					}
				);
			}
		}
	);
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
	res.render('quizes/edit', {
		appTitle: _appTitle,
		intro: _intro,
		quiz: req.quiz,
		errors: []
	});
};

// PUT /quizes/:id
exports.update = function(req, res) {
	// se recuperan los valores del objeto Quiz del body y se guardan en el objeto Quiz de la request
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	// ¿se podría recuperar asi? Probarlo
	// req.quiz = models.Quiz.build(req.body.quiz);

	// validamos los campos de la tabla
	req.quiz.validate()
	.then(
		function(err) {
			if(err) {
				// si hay errores, mostramos la pagina de edición indicando los errores
				res.render('quizes/edit', {
					appTitle: _appTitle,
					intro: _intro,
					quiz: req.quiz,
					errors: err.errors
				});
			}
			else {
				// si no hay errores, se actualiza en DB el registro con los datos del objeto
				// y despues se redirige a la lista de preguntas
				req.quiz.save({fields: ["pregunta", "respuesta"]})
				.then(
					function(){
						res.redirect("/quizes");
					}
				);
			}
		}
	);
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
	req.quiz.destroy()
	.then(
		function(){
			res.redirect("/quizes");
		}
	)
	.catch(
		function(error){
			next(error);
		}
	);
}