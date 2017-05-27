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

ObjetoInventario.prototype.constructor = ObjetoInventario;

ObjetoInventario.prototype.getName = function()
{
    return this.nombre;
};

ObjetoInventario.prototype.getImagen = function()
{
    return this.imagen;
};

ObjetoInventario.prototype.setName = function(name)
{
    this.nombre = name;
};

ObjetoInventario.prototype.setImagen = function(image)
{
    this.imagen = image;
};