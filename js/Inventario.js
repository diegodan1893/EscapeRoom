/** Clase inventario*/

/**
 * Inventario
*/


Inventario = function()
{

    // Variables
    this.seleccionado = -1;
    this.listaObjetos = [];

    var seleccionarSiguiente = new function()
    {
        if(this.seleccionado != -1)
        {
            var total = this.listaObjetos.length;
            this.seleccionado = (this.seleccionado+1)%total;
        }
    };

    var seleccionarAnterior = new function()
    {
        if(this.seleccionado != -1)
        {
            var total = this.listaObjetos.length;
            this.seleccionado = (this.seleccionado-1 + total) % total;
        }
    };

    var obtenerSeleccionado = new function()
    {
        var objeto = null;
        if(this.seleccionado!=-1)
        {
            objeto = this.listaObjetos[this.seleccionado];
        }
        return objeto;
    };

    var darObjeto = new function(objeto)
    {
        this.listaObjetos.push(objeto);
    };

    var eliminarObjeto = new function(objeto)
    {
        var posicion = this.listaObjetos.indexOf(objeto);
        this.listaObjetos.splice(posicion,1);
    };

};

Inventario.prototype.constructor = Inventario;
