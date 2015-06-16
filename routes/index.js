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
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;
