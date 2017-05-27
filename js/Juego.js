Juego = function(renderer)
{
	THREE.Scene.call(this);

	// Variables privadas
	var camera = null;
	var orbitControls = null;

	var nivel = null;
	var modoActual = Juego.Modo.INVESTIGANDO;
	var objetoExaminando = null;
	var posicionInicialCamara = null;

	var interaccionActivada = true;

	// Inventario del jugador
	var inventario = new Inventario();

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
		if (interaccionActivada)
		{
			var raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(raton, camera);

			objetosSeleccionados = raycaster.intersectObjects(nivel.objetos.children, true);

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
				while (objeto.parent !== nivel && !('objetoInteractuable' in objeto.userData))
				{
					objeto = objeto.parent;
				}

				if ('objetoInteractuable' in objeto.userData)
				{
					while (objeto !== null 
						&& (objeto.userData.objetoPadre !== objetoExaminando
							&& objeto.userData.objetoInteractuable !== objetoExaminando))
					{
						objeto = objeto.userData.objetoPadre;
					}

					if (objetoExaminando == null 
						|| (objeto !== null && (objeto.userData.objetoPadre == objetoExaminando
							|| objeto.userData.objetoInteractuable === objetoExaminando)))
					{
						// Llamar a su método de interacción
						var quitar = objeto.userData.objetoInteractuable.interactuar(modoActual, inventario.obtenerSeleccionado());

						if (quitar)
							eliminarObjeto(inventario.obtenerSeleccionado());
					}
				}
			}
		}
	}

	/**
	 * Mueve la cámara al puntoCamara del ObjetoExaminable proporcionado
	 * También entra en modo examinando
	 * 
	 * @param {ObjetoExaminable} El objeto al que acercar la cámara
	 */
	this.examinarObjeto = function(objeto)
	{
		if (objetoExaminando === null)
		{
			// Almacenar la posición actual de la cámara
			posicionInicialCamara = {
				posicion: {
					x: camera.position.x,
					y: camera.position.y,
					z: camera.position.z
				},
				rotacion: {
					x: camera.rotation.x,
					y: camera.rotation.y,
					z: camera.rotation.z
				}
			};
		}

		// Desactivar controles
		orbitControls.enabled = false;
		interaccionActivada = false;

		// Interpolar 
		var puntoCamaraInicial = {
			x: camera.position.x,
			y: camera.position.y,
			z: camera.position.z,

			rx: camera.rotation.x,
			ry: camera.rotation.y,
			rz: camera.rotation.z
		};

		var puntoCamara = objeto.obtenerPuntoCamara();

		var posFinal = new THREE.Vector3();
		posFinal.setFromMatrixPosition(puntoCamara.matrixWorld);
		var rotFinal = new THREE.Euler();
		rotFinal.setFromRotationMatrix(puntoCamara.matrixWorld);
		var puntoCamaraFinal = {
			x: posFinal.x,
			y: posFinal.y,
			z: posFinal.z,

			rx: rotFinal.x,
			ry: rotFinal.y,
			rz: rotFinal.z
		};

		var tiempoInterpolacion = 1000;

		this.interpoladorCamara = new TWEEN.Tween(puntoCamaraInicial).to(puntoCamaraFinal, tiempoInterpolacion)
			.onUpdate(function(){
				camera.position.set(puntoCamaraInicial.x, puntoCamaraInicial.y, puntoCamaraInicial.z);
				camera.rotation.set(puntoCamaraInicial.rx, puntoCamaraInicial.ry, puntoCamaraInicial.rz);
			})
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onComplete(function(){
				interaccionActivada = true;

				modoActual = Juego.Modo.EXAMINANDO;
				objetoExaminando = objeto;

				// Mostrar botón para salir
				$("#boton-salir-examinar").fadeIn(400);
			})
			.start();
	}

	/**
	 * Sale del modo examinar y coloca la cámara en su posición inicial
	 */
	this.dejarDeExaminar = function()
	{
		if (interaccionActivada)
		{
			// Desactivar controles
			interaccionActivada = false;

			// Interpolar 
			var puntoCamaraInicial = {
				x: camera.position.x,
				y: camera.position.y,
				z: camera.position.z,

				rx: camera.rotation.x,
				ry: camera.rotation.y,
				rz: camera.rotation.z
			};

			var puntoCamaraFinal = {
				x: posicionInicialCamara.posicion.x,
				y: posicionInicialCamara.posicion.y,
				z: posicionInicialCamara.posicion.z,

				rx: posicionInicialCamara.rotacion.x,
				ry: posicionInicialCamara.rotacion.y,
				rz: posicionInicialCamara.rotacion.z
			};

			var tiempoInterpolacion = 1000;

			this.interpoladorCamara = new TWEEN.Tween(puntoCamaraInicial).to(puntoCamaraFinal, tiempoInterpolacion)
				.onUpdate(function(){
					camera.position.set(puntoCamaraInicial.x, puntoCamaraInicial.y, puntoCamaraInicial.z);
					camera.rotation.set(puntoCamaraInicial.rx, puntoCamaraInicial.ry, puntoCamaraInicial.rz);
				})
				.easing(TWEEN.Easing.Quadratic.InOut)
				.onComplete(function(){
					// Activar interaccion
					orbitControls.enabled = true;
					interaccionActivada = true;

					modoActual = Juego.Modo.INVESTIGANDO;
					objetoExaminando = null;
				})
				.start();

			// Ocultar botón para salir
			$("#boton-salir-examinar").fadeOut(400);
		}
	}

	// Inventario
	/**
	 * Añade un objeto al inventario del jugador
	 * 
	 * @param {ObjetoInventario} El objeto a añadir
	 */
	this.darObjeto = function(objeto)
	{
		inventario.darObjeto(objeto);
	};

	/**
	 * Eliminar un objeto del inventario del jugador
	 * 
	 * @param {ObjetoInventario} El objeto a eliminar
	 */
	this.eliminarObjeto = function(objeto)
	{
		inventario.eliminarObjeto(objeto);
	};

	init(this, renderer);
};

Juego.prototype = Object.create(THREE.Scene.prototype);
Juego.prototype.constructor = Juego;

// Enum de modos o lo que sea
Juego.Modo = {
	INVESTIGANDO : 0,
	EXAMINANDO : 1
}
