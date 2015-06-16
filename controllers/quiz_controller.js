/* acciones del controlador y sus vistas asociadas */

// GET /quizes/question
exports.question = function(req, res) {
	res.render('quizes/question', {
		appTitle: 'Quiz',
		intro: 'Quiz: el juego de preguntas y respuestas.',
		pregunta: 'Capital de Italia'
	});
};

// GET /quizes/answer
exports.answer = function(req, res) {
	if(req.query.respuesta.toUpperCase() === 'Roma'.toUpperCase()) {
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
};
