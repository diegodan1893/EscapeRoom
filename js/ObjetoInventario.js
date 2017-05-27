/** Clase objeto inventario*/

/**
 * Objeto Inventario
 * 
 * @param {String} nombre Nombre del objeto.
 * @param {String} imagen Url utilizada para la imagen.
 
 */


ObjetoInventario = function(nombre, imagen)
{

    // Variables
    this.nombre = nombre;
    this.imagen = imagen;

};

ObjetoRecogible.prototype.constructor = ObjetoRecogible;

ObjetoRecogible.prototype.getName = function()
{
    return this.nombre;
};

ObjetoRecogible.prototype.getImagen = function()
{
    return this.imagen;
};

ObjetoRecogible.prototype.setName = function(name)
{
    this.nombre = name;
};

ObjetoRecogible.prototype.setImagen = function(image)
{
    this.imagen = image;
};