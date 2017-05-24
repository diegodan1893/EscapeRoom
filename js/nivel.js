Nivel = function(juego)
{
	// Llamar al super
	THREE.Object3D.call(this);

	// Objetos estáticos
	var fondo = null;

	// Objetos interactuables
	var objetos = null;

	/** Crear las luces */
	var crearLuces = function(self)
	{
		ambientLight = new THREE.AmbientLight(0x7f7f7f);
		self.add(ambientLight);
	};

	/** Crear los objetos decorativos */
	var crearFondo = function()
	{
		var decoracion;

		decoracion = new THREE.Mesh(
			new THREE.SphereGeometry(20, 20, 20),
			new THREE.MeshLambertMaterial({
				color: 0xffffff,
				map: this.texturaCargada
			})
		);
		decoracion.translateZ(-30);

		return decoracion;
	};

	/** Crear los objetos interactuables */
	var crearObjetos = function()
	{
		
	};

	var init = function(self, juego)
	{
		crearLuces(self);
		fondo = crearFondo();
		objetos = crearObjetos();
		self.add(fondo);
		self.add(objetos);
	};

	init(this, juego);
};

Nivel.prototype = Object.create(THREE.Object3D.prototype);
Nivel.prototype.constructor = Nivel;