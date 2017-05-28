/** Clase objeto recogible */

/**
 * Objeto Recogible
 * 
 * @param {Object3D} modelo Modelo inicial.
 * @param {FuncionInteraccion} funcionInteraccion Función utilizada para la interacción.
 * @param {ObjetoInventario} objetoActivacion Objeto utilizado para interactuar con el entorno.
 * @param {ObjetoInventario} objetoRecoger Objeto que sustituye este por el del inventario.
 * @param {Juego} juego Propio juego.
 */


ObjetoRecogible = function(modelo, funcionInteraccion, objetoRecoger, juego, objetoActivacion = null)
{
    // Llamar al super
    ObjetoInteractuable.call(this, modelo, funcionInteraccion, juego, objetoActivacion);

    // Variables
    this.objetoARecoger = objetoRecoger;

};

ObjetoRecogible.prototype = Object.create(ObjetoInteractuable.prototype);
ObjetoRecogible.prototype.constructor = ObjetoRecogible;

ObjetoRecogible.prototype.interactuar = function(modo, objetoSeleccionado)
{
    var resultado = false;

    resultado = ObjetoInteractuable.prototype.interactuar.call(this, modo, objetoSeleccionado);
    
    if (this.objetoActivacion === null || objetoSeleccionado === this.objetoActivacion)
    {
        this.juego.darObjeto(this.objetoARecoger);
        this.parent.remove(this);
        this.juego.visualizarObjeto(this.modelo);
    }

    return resultado;
};
