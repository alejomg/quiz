// se importa el modelo de DB
var models = require("../models/models.js");

/* acciones del controlador, variables y sus vistas asociadas */
var _appTitle = "NeoQuiz";
var _intro = _appTitle + ": el juego de preguntas y respuestas.";

// GET /quizes/:id/comments/new
exports.new = function(req, res) {
	res.render('comments/new', {
		appTitle: _appTitle,
		intro: _intro,
		quiz: req.quiz,
		errors: []
	});
};

// POST /quizes/:id/comments
exports.create = function(req, res, next) {
	// se recupera el objeto Comment de la request
	var comment = models.Comment.build(
		{
			texto: req.body.comment.texto,
			QuizId: req.params.quizId
		}
	);
	console.log("comentario: " + comment.texto + " de la pregunta: " + comment.QuizId);

	// validamos los campos de la tabla
	comment.validate()
	.then(
		function(err) {
			if(err) {
				// si hay errores, mostramos la pagina de preguntas indicando los errores
				res.render('comments/new', {
					appTitle: _appTitle,
					intro: _intro,
					comment: comment,
					errors: err.errors
				});
			}
			else {
				// si no hay errores, se guarda en DB un registro con los datos del objeto recuperado
				// y despues se redirige a la lista de preguntas
				comment.save()
				.then(
					function(){
						res.redirect("/quizes/" + req.params.quizId);
					}
				);
			}
		}
	)
	.catch(
		function(error) {
			next(error);
		}
	);
};




/*******************



// GET /quizes
exports.index = function(req, res, next) {
	var search = (req.query.search) ? "%" + req.query.search + "%" : "%";
	var idTema = (req.query.idTema) ? req.query.idTema : false;
	var cadenaWhere = (idTema) ? 'pregunta like ? and "TemaId" = ?' : 'pregunta like ?';
	search = search.replace(/ /g, "%");
	console.log("buscando: " + search + " tema: " + idTema + " con cadena: " + cadenaWhere);
	var _temas;
	models.Tema.findAll({order: [["descripcion", "ASC"]]})
	.then(
		function(temas) {
			_temas = temas;
		}
	)
	models.Quiz.findAll({where: [cadenaWhere, search, idTema], order: [["pregunta", "ASC"]]})
	.then(
		function(quizes) {
			res.render('quizes/index', {
				appTitle: _appTitle,
				intro: _intro,
				quizes: quizes,
				temas: _temas,
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
	
	models.Tema.findAll({order: [["descripcion", "ASC"]]})
	.then(
		function(temas) {
			res.render('quizes/new', {
				appTitle: _appTitle,
				intro: _intro,
				quiz: quiz,
				temas: temas,
				errors: []
			});
		}
	);
};

// POST /quizes/create
exports.create = function(req, res) {
	// se recupera el objeto Quiz de la request
	var quiz = models.Quiz.build(req.body.quiz);
	console.log("paso por aqui: " + quiz.TemaId);

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
				//quiz.save({fields: ["pregunta", "respuesta", "TemaId"]}) //si se quiere guardar solo unos campos en concreto
				quiz.save()
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
	models.Tema.findAll({order: [["descripcion", "ASC"]]})
	.then(
		function(temas) {
			res.render('quizes/edit', {
				appTitle: _appTitle,
				intro: _intro,
				quiz: req.quiz,
				temas: temas,
				errors: []
			});
		}
	);
};

// PUT /quizes/:id
exports.update = function(req, res) {
	// se recuperan los valores del objeto Quiz del body y se guardan en el objeto Quiz de la request
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.TemaId = req.body.quiz.TemaId;
	// ¿se podría recuperar asi? NO!! lo que hace es crear un objeto nuevo y un insert
	//req.quiz = models.Quiz.build(req.body.quiz);

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
				//req.quiz.save({fields: ["pregunta", "respuesta", "TemaId"]}) //si se quiere guardar solo unos campos en concreto
				req.quiz.save()
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
exports.destroy = function(req, res, next) {
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

**************************/