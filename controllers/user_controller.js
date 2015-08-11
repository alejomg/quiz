// usuarios predefinidos, de momento no hay gestión de usuarios
users = {
	admin: {id: 1, username: "admin", password: "1234"},
	pepe: {id: 2, username: "pepe", password: "5678"}
};

// se comprueba que el usuario está predefinido
// si falla la autenticación o hay errores se ejecuta callback(error)
exports.autenticar = function(login, password, callback) {
	if(users[login]) {
		if(password === users[login].password) {
			callback(null, users[login]);
		}
		else {
			callback(new Error("Contraseña errónea."));
		}
	}
	else {
		callback(new Error("No existe el usuario."));
	}
};