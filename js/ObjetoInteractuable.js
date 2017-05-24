
ObjetoInteractuable = function(modelo, funcionInteraccion, objetoActivacion)
{

    // Llamar al super
	THREE.Object3D.call(this);

	// Variables
	this.intermedio = new THREE.Object3D();
	this.funcionInteraccion = funcionInteraccion;
    this.objetoActivacion = objetoActivacion;

    this.intermedio.add(modelo);
    this.add(intermedio);

};

ObjetoInteractuable.prototype = Object.create(THREE.Object3D.prototype);
ObjetoInteractuable.prototype.constructor = ObjetoInteractuable;