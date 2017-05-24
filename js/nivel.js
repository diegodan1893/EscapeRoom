/** Clase fachada con la escena */
Nivel = function(renderer)
{
	THREE.Scene.call(this);

	// Variables privadas
	var camera = null;
	var orbitControls = null;

	/** Grafo con el sistema solar */
	var escena = null;
	var fondo = null;

	/**
	 * Crear la cámara
	 * 
	 * @param {*} self 
	 * @param {Renderer} renderer El renderer que muestra la imagen y captura la entrada del usuario
	 */
	var createCamera = function(self, renderer)
	{
		camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000000);
		camera.position.set(0, 0, 1);
		var look = new THREE.Vector3(0, 0, 0);
		camera.lookAt(look);

		orbitControls = new THREE.OrbitControls(camera, renderer);
		orbitControls.rotateSpeed = 0.6;
		orbitControls.zoomSpeed = -2;
		orbitControls.panSpeed = 0.5;
		orbitControls.target = look;
		orbitControls.maxZoom = 0;
		orbitControls.enableZoom = false;
		orbitControls.enablePan = false;
	};

	/** Crear las luces */
	var createLight = function(self)
	{
		ambientLight = new THREE.AmbientLight(0x7f7f7f);
		self.add(ambientLight);
	};

	/** Crear el fondo */
	var crearFondo = function()
	{
		var cargadorTextura = new THREE.TextureLoader();
		var texturaCargada = cargadorTextura.load("../imgs/fondo2.png");

		var cielo = new THREE.Mesh(
			new THREE.SphereGeometry(100000),
			new THREE.MeshLambertMaterial({
				color: 0xffffff,
				map: texturaCargada
			})
		);
		
		cielo.material.side = THREE.BackSide;
		cielo.rotation.y = 3.14;
		cielo.updateMatrix();
		return cielo;
	};

	/** Crear la escena */
	var crearEscena = function()
	{
        /*
		// Crear el sistema solar
		var sol = new Estrella(4, 0, 800, 0, "../imgs/sol.jpg");
		
		var mercurio = new Planeta(0.38, 6, 1.7, 2.5, "../imgs/mercurio.jpg");
		sol.addPlaneta(mercurio);

		var venus = new Planeta(0.95, 10, 8, 6.2, "../imgs/venus.jpg");
		sol.addPlaneta(venus);

		var tierra = new Planeta(1, 15, 1, 10, "../imgs/tierra.jpg");
		sol.addPlaneta(tierra);
		
		var luna = new Satelite(0.4, 2, 3, 5, "../imgs/luna.png");
		tierra.addSatelite(luna);

		var marte = new Planeta(0.53, 21, 1.001, 18, "../imgs/marte.jpg");
		sol.addPlaneta(marte);

		var fobos = new Satelite(0.2, 1.6, 0.5, 0.5, "../imgs/fobos.jpg");
		marte.addSatelite(fobos);

		var deimos = new Satelite(0.2, 3, 1.2, 1.2, "../imgs/deimos.jpg");
		marte.addSatelite(deimos);

		var jupiter = new Planeta(3, 33, 0.6, 110, "../imgs/jupiter.jpg");
		sol.addPlaneta(jupiter);

		var io = new Satelite(0.6, 4, 1.7, 1.7, "../imgs/io.jpg");
		jupiter.addSatelite(io);

		var europa = new Satelite(0.5, 5, 3.5, 3.5, "../imgs/europa.jpg");
		jupiter.addSatelite(europa);

		var calisto = new Satelite(0.6, 6, 16, 16, "../imgs/calisto.jpg");
		jupiter.addSatelite(calisto);

		return sol;
        */
	};

	var init = function(self, renderer)
	{
		createLight(self);
		createCamera(self, renderer);
		fondo = crearFondo();
		escena = crearEscena();
		self.add(fondo);
		self.add(escena);
	};

	// Métodos públicos
	/** Obtener la cámara */
	this.getCamera = function()
	{
		return camera;
	};

	/** Obtener los controles de la cámara */
	this.getCameraControls = function()
	{
		return orbitControls;
	};

	/** 
	 * Definir la relación de aspecto
	 * 
	 * @param {Número} aspecto Relación de aspecto, entre 0 y 1
	 */
	this.setCameraAspect = function(aspecto)
	{
		camera.aspect = aspecto;
		camera.updateProjectionMatrix();
	};

	init(this, renderer);
};

Nivel.prototype = Object.create(THREE.Scene.prototype);
Nivel.prototype.constructor = Nivel;