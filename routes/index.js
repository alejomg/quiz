var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
  	appTitle: 'Quiz',
  	intro: 'Bienvenido a Quiz',
  	descripcion: 'El portal donde podrá crear su propio juego de preguntas y respuestas.'
  });
});

module.exports = router;
