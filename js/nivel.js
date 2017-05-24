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
		ambientLight = new THREE.AmbientLight(0x282828);
		pointLight = new THREE.PointLight(0xffffff, 1, 400, 1);
		pointLight.position.set(50, 50, 50);
		self.add(ambientLight);
		self.add(pointLight);
	};

	/** Crear los objetos decorativos */
	var crearFondo = function()
	{
		var decoracion = new THREE.Object3D();

		var cajaParedes = new THREE.BoxGeometry(300, 100, 300);
		var materialParedes = new THREE.MeshLambertMaterial({
			color: 0xffffff
		});
		var paredes = new THREE.Mesh(cajaParedes, materialParedes);
		paredes.material.side = THREE.BackSide;

		paredes.translateY(50);
		decoracion.add(paredes);

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