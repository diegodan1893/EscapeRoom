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
				objeto.juego.iniciarDialogo([
					"¡Y se hizo la luz!",
				]);
			}{
				objeto.juego.iniciarDialogo([
					"Aun a riesgo de que haya algún puzle que use pintura fosforescente, la luz se queda encendida.",
					"JAJAJAJAJA. Pintura fosforescente. Como si los desarrolladores supieran hacer eso..."
				]);
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

	var crearPoster = function()
	{
		var encendido = false;
		var funcionPoster = function(objeto, modo, objetoSeleccionado)
		{
			if (modo !== Juego.Modo.TUTORIAL)
			{
				objeto.juego.iniciarDialogo([
					"Es un poster del universo.",
					"Me encantaría que hubieran unos planetas orbitando alrededor, en este fondo.",
					"Me gustaría tanto, que lo pondría en todos los sitios en los que pudiera.",
					"Como en una página web de noticias de videojuegos o en la web de un hotel.",
					"Por poner ejemplos así al azar."
				]);
			}else{
				objeto.juego.iniciarDialogo([
					"No sé qué está más oscuro, si esta habitación o el poster."
				]);
			}
		}

		var cargadorTextura = new THREE.TextureLoader();
		this.texturaCargada = cargadorTextura.load("../imgs/fondo.jpg");

		var elPoster = new THREE.Mesh(new THREE.BoxGeometry(70, 45, 0.5),
											   new THREE.MeshLambertMaterial({color: 0xd1d1d1, 
												   map: this.texturaCargada
												})
											   );
		var puntoCamara = new THREE.Object3D();
				puntoCamara.position.z = 50;


		var poster = new ObjetoExaminable(elPoster, funcionPoster, puntoCamara, juego);

		poster.position.x = -50;
		poster.position.y = 50;
		poster.position.z = -149.5;

		return poster;
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

		var abierta = false;

		var funcionPuerta = function(objeto, modo, objetoSeleccionado)
		{

			if(modo !== Juego.Modo.TUTORIAL){

				if(objeto.objetoActivacion === objetoSeleccionado){
					//Suponiendo que hemos conseguido la llave
					if(!abierta){
						abierta = true;
						var rotacionInicial = {angulo: 0};
						var rotacionFinal = {angulo:- Math.PI/2};
						var astro = this.esfera;

						this.interpolador = new TWEEN.Tween(rotacionInicial).to(rotacionFinal, 500)
							.onUpdate(function(){
								parteMovil.rotation.y = rotacionInicial.angulo;
							})
							.start()

						objeto.juego.iniciarDialogo([
						"Tú: ¿¡CÓMO!?",
						"Tú: ¡PERO DETRÁS DE LA PUERTA HAY MÁS PARED!",
						"Tú: ¿Cómo quieren que salga de algo que no tiene salida?",
						"Y te moriste FIN."
					]);

					}
				}else{
					objeto.juego.iniciarDialogo([
						"Es una puerta. Está cerrada.",
						"¿Qué gracia tendría un juego de Escape Room que tuviera la puerta abierta?",
						"Ah, pues ahora que caigo, no son pocos los juegos que dejan la puerta abierta.",
						"...",
						"Mi contradicción no ha dejado a la puerta DESCOLOCADA.",
						"*badumtss*"
					]);
				}

			}else{
				objeto.juego.iniciarDialogo([
					"Huy... ¡Casi! Las puertas no encienden la luz, pero oye, tú a tu ritmo."
				]);
			}
		}
		
		var puerta = new ObjetoInteractuable(modeloPuerta, funcionPuerta, juego);
		puerta.rotation.y = Math.PI;
		puerta.position.x = 100;
		puerta.position.y = 85/2;
		puerta.position.z = 148;

		return puerta;
	}

	var crearCajaFuerte = function()
	{
		var modeloCaja = new THREE.Object3D();
		var puerta = new THREE.Object3D();
		// 25 20 10
		var fondo = new THREE.Mesh(new THREE.BoxGeometry(25, 20, 2),
								   new THREE.MeshLambertMaterial({color: 0xcfcfcf}));
		var paredIzq = new THREE.Mesh(new THREE.BoxGeometry(2, 20, 8),
									  new THREE.MeshLambertMaterial({color: 0xcfcfcf}));
		var paredDer = new THREE.Mesh(new THREE.BoxGeometry(2, 20, 8),
									  new THREE.MeshLambertMaterial({color: 0xcfcfcf}));
		var techo = new THREE.Mesh(new THREE.BoxGeometry(25, 2, 8),
								   new THREE.MeshLambertMaterial({color: 0xcfcfcf}));
		var suelo = new THREE.Mesh(new THREE.BoxGeometry(25, 2, 8),
								   new THREE.MeshLambertMaterial({color: 0xcfcfcf}));
		var modeloPuerta = new THREE.Mesh(new THREE.BoxGeometry(21, 16, 2),
								  		  new THREE.MeshLambertMaterial({color: 0xe9e9e9}));
		var dial = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 1),
								  new THREE.MeshLambertMaterial({color: 0x5c5c5c}));

		fondo.position.z = -10/2 + 1;
		paredIzq.position.x = -25/2 + 1;
		paredDer.position.x = 25/2 - 1;
		techo.position.y = 20/2 - 1;
		suelo.position.y = -20/2 + 1;
		modeloPuerta.position.x = 23/2;
		dial.position.x = 7;
		dial.position.z = 1;
		dial.rotation.x = Math.PI/2;

		modeloPuerta.add(dial);
		puerta.add(modeloPuerta);

		modeloCaja.add(fondo);
		modeloCaja.add(paredIzq);
		modeloCaja.add(paredDer);
		modeloCaja.add(techo);
		modeloCaja.add(suelo);
		modeloCaja.add(puerta);

		puerta.translateX(-23/2);
		puerta.translateZ(3);
		
		var funcionCaja = function(objeto, modo, objetoSeleccionado)
		{
			if(objeto.objetoActivacion === objetoSeleccionado){
				objeto.juego.iniciarDialogo([
					"He introducido la combinación de la caja fuerte.",
					"En vista de que no hay papelera, tiraré la combinación al limbo gráfico."
				]);
				//Se pierde la combinación
			}else{
				objeto.juego.iniciarDialogo([
					"Es una caja fuerte. Hace falta una combinación para abrirla.",
					"O también podemos optar por mucha dinamita."
				]);
			}
		}

		var cajaFuerte = new ObjetoInteractuable(modeloCaja, funcionCaja, juego);

		return cajaFuerte;
	}

	var crearEscritorio = function(objetos)
	{
		var funcionEscritorio = function(objeto, modo, objetoSeleccionado)
		{
			if(modo !== Juego.Modo.TUTORIAL){
				objeto.juego.iniciarDialogo([
					"Es un escritorio. Tiene una caja fuerte y cajones que no se abren.",
					"No se abren porque están cerrados con la llave de la falta de tiempo."
				]);

			}else{
				objeto.juego.iniciarDialogo([
					"Eso es un escritorio, no un interruptor.",
					"Ya sé que no debería ver nada porque está oscuro, pero yo lo veo perfectamente.",
					"Quizás debería usar el escritorio como fuente de luz.",
					"Es broma."
				]);
			}
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
				puntoCamara.position.x = -50;
				puntoCamara.position.y = 60;
				puntoCamara.position.z = 50;
				puntoCamara.rotation.y = -Math.PI / 4;

				var escritorio = new ObjetoExaminable(modeloEscritorio, funcionEscritorio, puntoCamara, juego);
				escritorio.position.x = 100;
				escritorio.position.z = -100;
				
				var cajaFuerte = crearCajaFuerte();
				cajaFuerte.rotation.y = -Math.PI/2;
				cajaFuerte.position.x = 20;
				cajaFuerte.position.y = 50;
				cajaFuerte.position.z = 30;
				escritorio.insertarSubobjeto(cajaFuerte);

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

		//Poster
		objetos.add(crearPoster());

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
