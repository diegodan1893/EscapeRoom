/** Clase inventario */

/**
 * Inventario
 */
Inventario = function()
{

    // Variables
    this.seleccionado = -1;
    this.listaObjetos = [];

    this.seleccionarSiguiente = function()
    {
        if(this.seleccionado != -1)
        {
            var total = this.listaObjetos.length;
            this.seleccionado = (this.seleccionado+1)%total;
        }
    };

    this.seleccionarAnterior = function()
    {
        if(this.seleccionado != -1)
        {
            var total = this.listaObjetos.length;
            this.seleccionado = (this.seleccionado-1 + total) % total;
        }
    };

    this.obtenerSeleccionado = function()
    {
        var objeto = null;
        if(this.seleccionado!=-1)
        {
            objeto = this.listaObjetos[this.seleccionado];
        }
        return objeto;
    };

    this.darObjeto = function(objeto)
    {
        this.listaObjetos.push(objeto);
        this.seleccionado = listaObjetos.length - 1;
    };

    this.eliminarObjeto = function(objeto)
    {
        var posicion = this.listaObjetos.indexOf(objeto);
        this.listaObjetos.splice(posicion,1);
    };

};

Inventario.prototype.constructor = Inventario;
