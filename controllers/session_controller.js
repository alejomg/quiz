/* acciones del controlador, variables y sus vistas asociadas */
var _appTitle = "NeoQuiz";
var _intro = _appTitle + ": el juego de preguntas y respuestas.";

// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next) {
	if(req.session.user) {
		next();
	}
	else {
		res.redirect("/login");
	}
};

// GET /login
exports.new = function(req, res) {
	var errors  = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {
		appTitle: _appTitle,
		intro: _intro,
		errors: errors
	});
};

// POST /login
exports.create = function(req, res) {
	// se recuperan los datos de acceso de la request
	var login = req.body.login;
	var passw = req.body.password;

	console.log("usuario: " + login);

	var userController = require("./user_controller");

	userController.autenticar(login, passw, function(error, user) {
		if(error) { // si hay error se devuelven mensajes de error de sesión
			req.session.errors = [{"message": "Se ha producido un error: " + error}];
			res.redirect("/login");
			return;
		}

		// se crea req.session.user y se guardan ahí los campos id y username
		// la sesión se define por la existencia de req.session.user
		req.session.user = {id: user.id, username: user.username};
		// se redirecciona al patn anterior al login
		res.redirect(req.session.redir.toString());

	});
};

// DELETE /logout
exports.destroy = function(req, res) {
	// se elimina req.session.user de la sesión
	delete req.session.user;
	// se redirecciona al patn anterior al login
	res.redirect(req.session.redir.toString());
};