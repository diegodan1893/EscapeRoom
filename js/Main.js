renderer = null;
juego = null;
pulsacionRaton = new THREE.Vector2();

/** Función para dibujar cada frame */
function render()
{
	// Encolar para el siguiente frame
	requestAnimationFrame(render);

	// Actualizar posición de la cámara
	if (juego.getCameraControls().enabled)
		juego.getCameraControls().update();

	// Dibujar la escena
	renderer.render(juego, juego.getCamera());

	// Actualizar animaciones
	TWEEN.update();
}

/** Crear renderer básico */
function createRenderer()
{
	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0x000000), 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	return renderer;
}

/** Procesar cambios en el tamaño de la pantalla */
function onWindowResize()
{
	// Actualizar la relación de aspecto
	juego.setCameraAspect(window.innerWidth / window.innerHeight);
	renderer.setSize(window.innerWidth, window.innerHeight);
}

/** Procesar eventos de ratón */
function onMouseDown(event)
{
	pulsacionRaton.x = (event.clientX / window.innerWidth) * 2 - 1;
	pulsacionRaton.y = 1 - 2 * (event.clientY / window.innerHeight);
}

function onMouseUp(event)
{
	var raton = new THREE.Vector2();
	raton.x = (event.clientX / window.innerWidth) * 2 - 1;
	raton.y = 1 - 2 * (event.clientY / window.innerHeight);

	// Detectar si ha sido una pulsación o se ha arrastrado el ratón
	if (raton.x == pulsacionRaton.x && raton.y == pulsacionRaton.y)
	{
		juego.interactuar(raton);
	}
}

/** El main */
$(function(){
	// Crear renderer
	renderer = createRenderer();

	// Añadir la salida del renderer al HTML
	$("#WebGL-output").append(renderer.domElement);

	// Configurar el evento de redimensionamiento de pantalla
	window.addEventListener("resize", onWindowResize);

	// Configurar los eventos de ratón
	document.getElementById("WebGL-output").addEventListener("mousedown", onMouseDown);
	document.getElementById("WebGL-output").addEventListener("mouseup", onMouseUp);

	// Crear la escena
	juego = new Juego(renderer.domElement);

	// El primer render
	render();

	// Quitar la pantalla de carga cuando todo esté listo
	var manager = THREE.DefaultLoadingManager;
	manager.onLoad = function()
	{
		$("#cargador").fadeOut(400);
	}

	// Desactivar pantalla de carga temporalmente
	$("#cargador").fadeOut(0);
});
