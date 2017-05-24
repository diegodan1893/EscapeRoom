renderer = null;
scene = null;

/** Función para dibujar cada frame */
function render()
{
	// Encolar para el siguiente frame
	requestAnimationFrame(render);

	// Actualizar posición de la cámara
	scene.getCameraControls().update();

	// Dibujar la escena
	renderer.render(scene, scene.getCamera());

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
	scene.setCameraAspect(window.innerWidth / window.innerHeight);
	renderer.setSize(window.innerWidth, window.innerHeight);
}

/** El main */
$(function(){
	// Crear renderer
	renderer = createRenderer();

	// Añadir la salida del renderer al HTML
	$("#WebGL-output").append(renderer.domElement);

	// Configurar el evento de redimensionamiento de pantalla
	window.addEventListener("resize", onWindowResize);

	// Crear la escena
	//scene = new Mundo(renderer.domElement);

	// El primer render
	render();
});