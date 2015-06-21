// definición del modelo del proyecto quiz

var path = require("path");

// cargar modelo ORM
var Sequelize = require("sequelize");

// usar DB SQLite
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});

// importar a la DB la definición de la tabla Quiz que está en quiz.js
var Quiz = sequelize.import(path.join(__dirname, "quiz"));

// exportar la definición de la tabla Quiz
exports.Quiz = Quiz;

// sequelize.sync() crea e inicializa la DB
sequelize.sync().success(function() {
	Quiz.count().success(function(count) {
		// si no hay ningún registro en la tabla, se añaden para inicializarla
		if(count === 0) {
			Quiz.create({
				pregunta: "Capital de Inglaterra",
				respuesta: "Londres"
			})
			.success(function(){console.log("DB started!!")});
		}
	});
});