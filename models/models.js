// definición del modelo del proyecto quiz

var path = require("path");

// Postgres DATABASE_URL=postgres://user:password@host:port/database
// SQLite   DATABASE_URL=sqlite://:@:/
//var dbURL = process.env.DATABASE_URL || "sqlite://:@:/";
//var url = dbURL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
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

// importar a la DB la definición de las tablas
var Quiz = sequelize.import(path.join(__dirname, "quiz"));
var Tema = sequelize.import(path.join(__dirname, "tema"));
var Comment = sequelize.import(path.join(__dirname, "comment"));

// definición de relaciones entre tablas
// Tema - Pregunta: 1 - N
Tema.hasMany(Quiz);
Quiz.belongsTo(Tema);

// Pregunta - Comentario: 1 - N
Quiz.hasMany(Comment);
Comment.belongsTo(Quiz);

// exportar la definición de las tablas
exports.Quiz = Quiz;
exports.Tema = Tema;
exports.Comment = Comment;

// sequelize.sync() crea e inicializa la DB
sequelize.sync()
.then(
	function() {
		Tema.count()
		.then(
			function(count) {
				// si no hay ningún registro en la tabla, se añaden para inicializarla
				if(count === 0) {
					Tema.create({
						descripcion: "Ciencia"
					})
					Tema.create({
						descripcion: "Humanidades"
					})
					Tema.create({
						descripcion: "Ocio"
					})
					Tema.create({
						descripcion: "Tecnología"
					})
					Tema.create({
						descripcion: "Otro"
					})
					.then(function(){console.log("Table Tema created!!")});
				}
			}
		);
		Quiz.count()
		.then(
			function(count) {
				// si no hay ningún registro en la tabla, se añaden para inicializarla
				if(count === 0) {
					Quiz.create({
						pregunta: "Capital de Inglaterra",
						respuesta: "Londres",
						TemaId: 2
					})
					Quiz.create({
						pregunta: "Capital de Turquía",
						respuesta: "Ankara",
						TemaId: 2
					})
					Quiz.create({
						pregunta: "Capital de Perú",
						respuesta: "Lima",
						TemaId: 2
					})
					Quiz.create({
						pregunta: "Capital de Egipto",
						respuesta: "El Cairo",
						TemaId: 2
					})
					Quiz.create({
						pregunta: "Mayor buscador en internet",
						respuesta: "Google",
						TemaId: 4
					})
					.then(function(){console.log("Table Quiz created!!")});
				}
			}
		);
		console.log("DB started!!");
	}
);