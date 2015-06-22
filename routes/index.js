var express = require('express');
var router = express.Router();

// se importa el controller con la lógica
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
  	appTitle: 'Quiz',
  	intro: 'Bienvenido a Quiz',
  	descripcion: 'El portal donde podrá crear su propio juego de preguntas y respuestas.'
  });
});

// cada ruta que se define en el enrutador tiene que tener una acción asociada
//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/* GET author page. */
router.get('/author', function(req, res) {
  res.render('author', {
  	appTitle: 'Quiz',
  	intro: 'Quiz: el juego de preguntas y respuestas.',
  	author: 'Alejandro Martínez Gallego.'
  });
});

module.exports = router;
