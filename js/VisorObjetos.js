/**
 * Crea una escena con un objeto a visualizar
 * 
 * @param {Object3D} El objeto a visualizar
 * @param {Number} La distancia entre la cámara y el objeto
 */
VisorObjetos = function(renderer, modelo, distancia = 20)
{
    THREE.Scene.call(this);

	// Variables privadas
	var camera = null;
	var orbitControls = null;
    var objeto = modelo;

    /**
	 * Crear la cámara
	 * 
	 * @param {*} self 
	 * @param {Renderer} renderer El renderer que muestra la imagen y captura la entrada del usuario
	 */
	var createCamera = function(self, renderer)
	{
		camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000000);
		camera.position.set(0, 0, distancia);
		var look = new THREE.Vector3(0, 0, 0);
		camera.lookAt(look);

		orbitControls = new THREE.OrbitControls(camera, renderer, false);
		orbitControls.rotateSpeed = 0.4;
		orbitControls.zoomSpeed = -2;
		orbitControls.panSpeed = 0.5;
		orbitControls.target = look;
		orbitControls.maxZoom = 0;
		orbitControls.enableZoom = false;
		orbitControls.enablePan = false;
	};

    var crearLuces = function(self)
    {
        ambientLight = new THREE.AmbientLight(0x282828);
		pointLight = new THREE.PointLight(0xffffff, 1, 400, 1);
		pointLight.position.set(50, 50, 50);
		self.add(ambientLight);
		self.add(pointLight);
    }

    var init = function(self, renderer)
	{
		createCamera(self, renderer);
        crearLuces(self);
		self.add(objeto);
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
}

VisorObjetos.prototype = Object.create(THREE.Scene.prototype);
VisorObjetos.prototype.constructor = VisorObjetos;