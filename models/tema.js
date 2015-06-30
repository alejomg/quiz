// Table: Tema
// Fields:
//		descripcion: DataTypes.STRING

module.exports = function (sequelize, DataTypes) {
	return sequelize.define("Tema", {
		descripcion: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "-> Introduzca la descripción del tema"}}
		}
	});
}