// Table: Quiz
// Fields:
//		pregunta: DataTypes.STRING,
//		respuesta: DataTypes.STRING

module.exports = function (sequelize, DataTypes) {
	return sequelize.define("Quiz", {
		pregunta: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "-> Introduzca el texto de la pregunta"}}
		},
		respuesta: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "-> Introduzca el texto de la respuesta"}}
		}
	});
}