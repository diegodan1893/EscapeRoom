/** Clase objeto examinable */

/**
 * Objeto Recogible
 * 
 * @param {Object3D} modelo Modelo inicial.
 * @param {FuncionInteraccion} funcionInteraccion Función utilizada para la interacción.
 * @param {ObjetoInventario} objetoActivacion Objeto utilizado para interactuar con el entorno.
 * @param {Object3D} puntoCamara Zona donde acercarse para ver mejor.
 * @param {Juego} juego Propio juego.
 */


ObjetoRecogible = function(modelo, funcionInteraccion, objetoActivacion, puntoCamara, juego)
{
    ObjetoInteractuable.call(this,modelo,funcionInteraccion, objetoActivacion);

    this.juego = juego;
    this.puntoCamara = puntoCamara;

};

ObjetoExaminable.prototype = Object.create(ObjetoInteractuable.prototype);
ObjetoExaminable.prototype.constructor = ObjetoExaminable;