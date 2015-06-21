// definición del modelo del proyecto quiz

var path = require("path");

// Postgres DATABASE_URL=postgres://user:password@host:port/database
// SQLite   DATABASE_URL=sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var user     = (url[2] || null);
var password = (url[3] || null);
var host     = (url[4] || null);
var port     = (url[5] || null);
var DB_name  = (url[6] || null);
var storage = process.env.DATABASE_STORAGE;

// cargar modelo ORM
var Sequelize = require("sequelize");

// usar DB SQLite o Postgres
//var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});
var sequelize = new Sequelize(DB_name, user, password,
				{
					protocol: protocol,
					dialect: dialect,
					host: host,
					port: port,
					storage: storage, // solo SQLite (.env)
					omitNull: true    // solo Postgres
				});

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
				pregunta: "Capital de Turquía",
				respuesta: "Ankara"
			})
			.success(function(){console.log("DB started!!")});
		}
	});
});