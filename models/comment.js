// Table: Comment
// Fields:
//		texto: DataTypes.STRING

module.exports = function (sequelize, DataTypes) {
	return sequelize.define("Comment", {
		texto: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "-> Introduzca un texto para el comentario"}}
		},
		publicado: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});
}