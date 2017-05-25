/** Clase objeto interactuable */

/**
 * Objeto Interactuable
 * 
 * @param {Object3D} modelo Modelo inicial.
 * @param {FuncionInteraccion} funcionInteraccion Función utilizada para la interacción.
 * @param {ObjetoInventario} objetoActivacion Objeto utilizado para interactuar con el entorno.
 */
ObjetoInteractuable = function(modelo, funcionInteraccion, objetoActivacion = null)
{

    // Llamar al super
	THREE.Object3D.call(this);

	// Variables
	this.intermedio = new THREE.Object3D();
	this.funcionInteraccion = funcionInteraccion;
    this.objetoActivacion = objetoActivacion;
    this.estado = {};

    this.intermedio.add(modelo);
    this.add(intermedio);

};

ObjetoInteractuable.prototype = Object.create(THREE.Object3D.prototype);
ObjetoInteractuable.prototype.constructor = ObjetoInteractuable;

ObjetoInteractuable.prototype.obtenerEstado = function()
{
    return this.estado;
};

ObjetoInteractuable.prototype.insertarSubobjeto = function(objeto)
{
    this.intermedio.add(objeto);
}

ObjetoInteractuable.prototype.interactuar(modo, objetoSeleccionado)
{
    var resultado = false;
    resultado = this.funcionInteraccion(this, modo, objetoSeleccionado);
    return resultado;
}
