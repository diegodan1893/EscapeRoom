Nivel = function(juego)
{
	// Llamar al super
	THREE.Object3D.call(this);

	// Objetos estáticos
	var fondo = null;

	// Objetos interactuables
	this.objetos = new THREE.Object3D();

	var luz;
	/** Crear las luces */
	var crearLuces = function(self)
	{
		ambientLight = new THREE.AmbientLight(0x161616);
		luz = new THREE.PointLight(0xffffff, 0.1, 400, 1);
		luz.position.set(50, 45, 30);
		self.add(ambientLight);
		self.add(luz);
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

	/** Funciones de los objetos interactuables */
	var crearInterruptor = function()
	{
		var encendido = false;
		var funcionInterruptor = function(objeto, modo, objetoSeleccionado)
		{
			if (!encendido)
			{
				// Encender la luz y terminar tutorial
				luz.intensity = 1;
				objeto.juego.terminarTutorial();
				encendido = true;
			}
		}

		var pulsadorInterruptor = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 2),
											   new THREE.MeshLambertMaterial({color: 0xd1d1d1}));
		var luzInterruptor = new THREE.Mesh(new THREE.BoxGeometry(4, 1, 2),
											new THREE.MeshLambertMaterial({color: 0x000000, emissive: 0xffaa0d}));
		luzInterruptor.position.z = 0.1;
		luzInterruptor.position.y = -3;
		pulsadorInterruptor.add(luzInterruptor);
		var interruptor = new ObjetoInteractuable(pulsadorInterruptor, funcionInterruptor, juego);
		interruptor.rotation.y = Math.PI;
		interruptor.position.x = 60;
		interruptor.position.y = 50;
		interruptor.position.z = 148;

		return interruptor;
	}

	var crearPuerta = function()
	{
		var modeloPuerta = new THREE.Object3D();
		var parteMovil = new THREE.Object3D();
		var madera = new THREE.Mesh(new THREE.BoxGeometry(50, 85, 2),
										new THREE.MeshLambertMaterial({color: 0x6c4226}));
		
		var marco1 = new THREE.Mesh(new THREE.BoxGeometry(5, 85, 2),
									new THREE.MeshLambertMaterial({color: 0x4f311c}));
		var marco2 = new THREE.Mesh(new THREE.BoxGeometry(5, 85, 2),
									new THREE.MeshLambertMaterial({color: 0x4f311c}));
		var marco3 = new THREE.Mesh(new THREE.BoxGeometry(60, 5, 2),
									new THREE.MeshLambertMaterial({color: 0x4f311c}));
		var pomo = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 2),
								  new THREE.MeshLambertMaterial({color: 0xcca00b}));

		madera.position.x = 50/2;

		marco1.position.x = 50/2 + 5/2;
		marco2.position.x = -(50/2 + 5/2);
		marco3.position.y = 85/2 + 5/2;

		pomo.rotation.x = Math.PI / 2;
		pomo.position.x = 20 + 50/2;
		pomo.position.z = 1;

		modeloPuerta.add(parteMovil);
		parteMovil.add(pomo);
		parteMovil.add(madera);
		modeloPuerta.add(marco1);
		modeloPuerta.add(marco2);
		modeloPuerta.add(marco3);

		parteMovil.translateX(-50/2);

		var funcionPuerta = function(objeto, modo, objetoSeleccionado)
		{
			
		}
		
		var puerta = new ObjetoInteractuable(modeloPuerta, funcionPuerta, juego);
		puerta.rotation.y = Math.PI;
		puerta.position.x = 100;
		puerta.position.y = 85/2;
		puerta.position.z = 148;

		return puerta;
	}

	var crearEscritorio = function(objetos)
	{
		var funcionEscritorio = function(objeto, modo, objetoSeleccionado)
		{

		}

		var cargadorMTL = new THREE.MTLLoader();
		cargadorMTL.setPath("models/Desk/");

		cargadorMTL.load("Desk.mtl", function(materiales)
		{
			materiales.preload();
			
			var cargadorObjetos = new THREE.OBJLoader();
			cargadorObjetos.setMaterials(materiales);
			cargadorObjetos.setPath("models/Desk/");

			cargadorObjetos.load("Desk.obj", function(modeloEscritorio)
			{
				modeloEscritorio.scale.set(25, 22, 25);

				var puntoCamara = new THREE.Object3D();
				puntoCamara.position.x = -60;
				puntoCamara.position.y = 60;
				puntoCamara.position.z = 50;
				puntoCamara.rotation.y = -Math.PI / 4;

				var escritorio = new ObjetoExaminable(modeloEscritorio, funcionEscritorio, puntoCamara, juego);
				escritorio.position.x = 100;
				escritorio.position.z = -100;

				objetos.add(escritorio);
			});
		});
	}

	/** Crear los objetos interactuables */
	var crearObjetos = function()
	{
		var objetos = new THREE.Object3D();

		// Interruptor de la luz
		objetos.add(crearInterruptor());

		// Puerta
		objetos.add(crearPuerta());

		// Escritorio
		crearEscritorio(objetos);

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
