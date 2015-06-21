// Table: Quiz
// Fields:
//		pregunta: DataTypes.STRING,
//		respuesta: DataTypes.STRING

module.exports = function (sequelize, DataTypes) {
	return sequelize.define("Quiz", {
		pregunta: DataTypes.STRING,
		respuesta: DataTypes.STRING
	});
}