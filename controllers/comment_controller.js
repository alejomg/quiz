// se importa el modelo de DB
var models = require("../models/models.js");

// autoload: se ejecuta si la ruta incluye commentId
exports.load = function(req, res, next, commentId) {
	models.Comment.find({
		where: { id: Number(commentId) }
	})
	.then(
		function(comment) {
			if(comment) {
				req.comment = comment;
				next();
			}
			else {
				next(new Error("No existe un comentario con id: " + commentId));
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
					function() {
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

// GET /quizes/:id/comments/:id/publish
exports.publish = function(req, res, next) {
	req.comment.publicado = true;
	req.comment.save({fields: ["publicado"]})
	.then(
		function() {
			res.redirect("/quizes/" + req.params.quizId);
		}
	)
	.catch(
		function(error) {
			next(error);
		}
	);
};
