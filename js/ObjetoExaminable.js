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


ObjetoExaminable = function(modelo, funcionInteraccion, puntoCamara, juego, objetoActivacion = null)
{
    // Llamar al super
    ObjetoInteractuable.call(this, modelo, funcionInteraccion, juego, objetoActivacion);

    // Variables
    this.puntoCamara = puntoCamara;

    this.intermedio.add(puntoCamara);
};

ObjetoExaminable.prototype = Object.create(ObjetoInteractuable.prototype);
ObjetoExaminable.prototype.constructor = ObjetoExaminable;

ObjetoExaminable.prototype.interactuar = function(modo, objetoSeleccionado)
{
    var resultado = false;

    if (modo === Juego.Modo.TUTORIAL){
        resultado = ObjetoInteractuable.prototype.interactuar.call(this, modo,objetoSeleccionado);
    }else if (modo === Juego.Modo.INVESTIGANDO)
        this.juego.examinarObjeto(this);
    else if (modo === Juego.Modo.EXAMINANDO)
        resultado = ObjetoInteractuable.prototype.interactuar.call(this, modo,objetoSeleccionado);

    return resultado;
};

ObjetoExaminable.prototype.obtenerPuntoCamara = function()
{
    return this.puntoCamara;
}
