Juego = function(renderer)
{
	THREE.Scene.call(this);

	// Variables privadas
	var camera = null;
	var orbitControls = null;

	var nivel = null;
	var modoActual = Juego.Modo.INVESTIGANDO;
	var objetoExaminando = null;

	/**
	 * Crear la cámara
	 * 
	 * @param {*} self 
	 * @param {Renderer} renderer El renderer que muestra la imagen y captura la entrada del usuario
	 */
	var createCamera = function(self, renderer)
	{
		camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000000);
		camera.position.set(0, 50, 1);
		var look = new THREE.Vector3(0, 50, 0);
		camera.lookAt(look);

		orbitControls = new THREE.OrbitControls(camera, renderer);
		orbitControls.rotateSpeed = 0.4;
		orbitControls.zoomSpeed = -2;
		orbitControls.panSpeed = 0.5;
		orbitControls.target = look;
		orbitControls.maxZoom = 0;
		orbitControls.enableZoom = false;
		orbitControls.enablePan = false;
	};

	/** Crear la escena */
	var crearNivel = function()
	{
        var nivel = new Nivel(this);
        return nivel;
	};

	var init = function(self, renderer)
	{
		createCamera(self, renderer);
		nivel = crearNivel();
		self.add(nivel);
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

	/**
	 * Seleccionar el objeto que está debajo del ratón y llamar
	 * a su método de interacción
	 * 
	 * @param {Vector2} La posición del ratón
	 */
	this.interactuar = function(raton)
	{
		var raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(raton, camera);

		var objetosSeleccionados = raycaster.intersectObjects(nivel.objetos.children, true);

		// Seleccionar el más cercano
		if (objetosSeleccionados.length > 0)
		{
			/**
			 * Subir en el árbol hasta encontrar el ObjetoInteractuable correspondiente:
			 * un objeto de primer nivel si el jugador no está examinando nada,
			 * un subobjeto del objeto que está examinando,
			 * o el propio objeto que está examinando
			 */ 
			var objeto = objetosSeleccionados[0].object;
			while (objeto.parent !== nivel
					&& !('objetoInteractuable' in objeto.userData)
					&& (objeto.userData.objetoPadre !== objetoExaminando
					&& objeto.userData.objetoInteractuable !== objetoExaminando))
			{
				objeto = objeto.parent;
			}

			// Comprobar si se ha encontrado un objeto interactuable
			if ('objetoInteractuable' in objeto.userData)
			{
				// Llamar a su método de interacción
				objeto.userData.objetoInteractuable.interactuar(modoActual, null);
			}
		}
	}

	init(this, renderer);
};

Juego.prototype = Object.create(THREE.Scene.prototype);
Juego.prototype.constructor = Juego;

// Enum de modos o lo que sea
Juego.Modo = {
	INVESTIGANDO : 0,
	EXAMINANDO : 1
}
