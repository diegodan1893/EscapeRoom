Nivel = function(juego)
{
	// Llamar al super
	THREE.Object3D.call(this);

	// Objetos estáticos
	var fondo = null;

	// Objetos interactuables
	this.objetos = new THREE.Object3D();

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
		var objetos = new THREE.Object3D();

		// Cubo
		var modeloCubo = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5),
										new THREE.MeshLambertMaterial({color: 0xaa0000}));
		var funcionCubo = function(a, b, c){alert("Cubo");};
		var cubo = new ObjetoInteractuable(modeloCubo, funcionCubo);
		cubo.translateY(40);
		cubo.translateZ(-20);
		cubo.translateX(-10);
		objetos.add(cubo);

		// Esfera
		var modeloEsfera = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 32),
										  new THREE.MeshLambertMaterial({color: 0x0000aa}));
		var funcionEsfera = function(a, b, c){alert("Esfera");};
		var esfera = new ObjetoInteractuable(modeloEsfera, funcionEsfera);
		esfera.translateY(40);
		esfera.translateZ(-20);
		esfera.translateX(10);
		objetos.add(esfera);
		
		return objetos;
	};

	var init = function(self, juego)
	{
		crearLuces(self);
		self.fondo = crearFondo();
		self.objetos = crearObjetos();
		self.add(self.fondo);
		self.add(self.objetos);
	};

	init(this, juego);
};

Nivel.prototype = Object.create(THREE.Object3D.prototype);
Nivel.prototype.constructor = Nivel;