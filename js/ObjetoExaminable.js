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
    // Llamar al super
    ObjetoInteractuable.call(this,modelo,funcionInteraccion, objetoActivacion);

    // Variables
    this.juego = juego;
    this.puntoCamara = puntoCamara;

};

ObjetoExaminable.prototype = Object.create(ObjetoInteractuable.prototype);
ObjetoExaminable.prototype.constructor = ObjetoExaminable;

ObjetoExaminable.prototype.interactuar = function(modo, objetoSeleccionado)
{
    var resultado = false;

    if (modo == Juego.Modo.INVESTIGANDO)
        juego.moverCamara(this.puntoCamara);
    else if (modo == Juego.Modo.EXAMINANDO)
        resultado = super.interactuar(modo,objetoSeleccionado);

    return resultado;
};