Dialogo = function()
{
    var lineas = null;
    var lineaActual = 0;

    this.nuevoDialogo = function(texto)
    {
        lineas = texto;
        lineaActual = 0;
    }

    this.pasarLinea = function()
    {
        lineaActual += 1;

        return lineaActual > lineas.length-1;
    }

    this.linea = function()
    {
        return lineas[lineaActual];
    }
}

Dialogo.prototype.constructor = Dialogo;