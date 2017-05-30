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
					"Me encantaría que hubiera unos planetas orbitando alrededor, en este fondo.",
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

	var crearPuerta = function(llaveInventario)
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
		
		var puerta = new ObjetoInteractuable(modeloPuerta, funcionPuerta, juego, llaveInventario);
		puerta.rotation.y = Math.PI;
		puerta.position.x = 100;
		puerta.position.y = 85/2;
		puerta.position.z = 148;

		return puerta;
	}

	var crearCajaFuerte = function(combinacionInventario)
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
		
		var abierta = false;
		var funcionCaja = function(objeto, modo, objetoSeleccionado)
		{
			var tirar = false;
			if(objeto.objetoActivacion === objetoSeleccionado)
			{
				if(!abierta){
						abierta = true;
						var rotacionInicial = {angulo: 0};
						var rotacionFinal = {angulo:- Math.PI/2};

						this.interpolador = new TWEEN.Tween(rotacionInicial).to(rotacionFinal, 500)
							.onUpdate(function(){
								puerta.rotation.y = rotacionInicial.angulo;
							})
							.start()

						
					objeto.juego.iniciarDialogo([
						"He introducido la combinación de la caja fuerte.",
						"En vista de que no hay papelera, tiraré la combinación al limbo gráfico."
					]);
					tirar = true;
				}
			}
			else
			{
				if(!abierta){
					objeto.juego.iniciarDialogo([
						"Es una caja fuerte. Hace falta una combinación para abrirla.",
						"O también podemos optar por mucha dinamita."
					]);
				}else{
					objeto.juego.iniciarDialogo([
					"La caja fuerte ha sido abrida.",
					"Me ha apetecido hablar en conjugación no válida."
					]);
				}
			}

			return tirar;
		}

		var cajaFuerte = new ObjetoInteractuable(modeloCaja, funcionCaja, juego, combinacionInventario);

		return cajaFuerte;
	}

	var crearLlave = function(llaveInventario)
	{
		var funcionLlave = function(objeto, modo, objetoSeleccionado)
		{
			objeto.juego.iniciarDialogo([
				"He encontrado una llave.",
				"Sorprendentemente, se parece a una llave.",
				"Aún no me creo lo bien hecha que está la llave después de ver la cama.",
				"Me quedo con la llave. Pocos días se pueden ver algo tan bello."
			]);
		}

		var anillo = new THREE.Mesh(
			new THREE.TorusGeometry(1, 0.4, 8, 10),
			new THREE.MeshLambertMaterial({color: 0xf2e437})
		);
		var tubo = new THREE.Mesh(
			new THREE.CylinderGeometry(0.4, 0.4, 4),
			new THREE.MeshLambertMaterial({color: 0xf2e437})
		);
		var diente1 = new THREE.Mesh(
			new THREE.CylinderGeometry(0.4, 0.4, 0.5),
			new THREE.MeshLambertMaterial({color: 0xf2e437})
		);
		var diente2 = new THREE.Mesh(
			new THREE.CylinderGeometry(0.4, 0.4, 0.4),
			new THREE.MeshLambertMaterial({color: 0xf2e437})
		);

		tubo.rotation.z = Math.PI / 2;
		tubo.position.x = 3.2;

		diente1.position.y = -0.45;
		diente1.position.x = 4.6;
		diente2.position.y = -0.4;
		diente2.position.x = 3.8;

		anillo.add(tubo);
		anillo.add(diente1);
		anillo.add(diente2);

		var llave = new ObjetoRecogible(anillo, funcionLlave, llaveInventario, juego);

		return llave;
	}

	var crearEscritorio = function(objetos, llaveInventario)
	{
		var funcionEscritorio = function(objeto, modo, objetoSeleccionado)
		{
			if(modo !== Juego.Modo.TUTORIAL){
				if(objetoSeleccionado === llaveInventario){
					objeto.juego.iniciarDialogo([
					"Lo de la llave del tiempo era una metáfora. No se van a abrir."
					]);
				}else{
					objeto.juego.iniciarDialogo([
						"Es un escritorio. Tiene una caja fuerte y cajones que no se abren.",
						"No se abren porque están cerrados con la llave de la falta de tiempo."
					]);
				}

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

				var llave = crearLlave(llaveInventario);
				llave.rotateY(-Math.PI/2);
				llave.position.x = 20;
				llave.position.y = 43.5;
				llave.position.z = 30;
				escritorio.insertarSubobjeto(llave);

				objetos.add(escritorio);
			});
		});
	}

	var crearCombinacion = function(combinacionInventario)
	{
		var funcionCombinacion = function(objeto, modo, objetoSeleccionado)
		{

		}

		var cargadorTextura = new THREE.TextureLoader();
		this.texturaCargada = cargadorTextura.load("../imgs/1031.png");

		var modeloNota = new THREE.Mesh(
			new THREE.BoxGeometry(4, 4, 0.01),
			new THREE.MeshLambertMaterial({color: 0xffffff, map:this.texturaCargada})
		);

		var nota = new ObjetoRecogible(modeloNota, funcionCombinacion, combinacionInventario, juego);

		return nota;
	}


	var crearCama = function(combinacionInventario)
	{
		var modeloCama = new THREE.Object3D();

		// 25 20 10
		var cama = new THREE.Mesh(new THREE.BoxGeometry(100, 10, 40),
								   new THREE.MeshLambertMaterial({color: 0xe60026}));
		var pataIzqCerca = new THREE.Mesh(new THREE.BoxGeometry(5, 20, 5),
									  new THREE.MeshLambertMaterial({color: 0x8d4925}));
		var pataDchaCerca = new THREE.Mesh(new THREE.BoxGeometry(5, 20, 5),
									  new THREE.MeshLambertMaterial({color: 0x8d4925}));
		var pataIzqLejos = new THREE.Mesh(new THREE.BoxGeometry(5, 20, 5),
								   new THREE.MeshLambertMaterial({color: 0x8d4925}));
		var pataDchaLejos = new THREE.Mesh(new THREE.BoxGeometry(5, 20, 5),
								   new THREE.MeshLambertMaterial({color: 0x8d4925}));
					
		var almohada = new THREE.Mesh(new THREE.BoxGeometry(7, 4, 30),
								  		  new THREE.MeshLambertMaterial({color: 0xffffff}));

		cama.position.y = 10;
		
		pataIzqCerca.position.x = 40;
		pataIzqCerca.position.z = 15;

		pataDchaCerca.position.x = 40;
		pataDchaCerca.position.z = -15;

		pataIzqLejos.position.x = -40;
		pataIzqLejos.position.z = 15;

		pataDchaLejos.position.x = -40;
		pataDchaLejos.position.z = -15;

		almohada.position.y = 15;
		almohada.position.x = -45;
		
		

		modeloCama.add(cama);
		modeloCama.add(pataIzqCerca);
		modeloCama.add(pataDchaCerca);
		modeloCama.add(pataIzqLejos);
		modeloCama.add(pataDchaLejos);
		modeloCama.add(almohada);

		
		var funcionCama = function(objeto, modo, objetoSeleccionado)
		{
			if(modo !== Juego.Modo.TUTORIAL)
			{	
				if(objetoSeleccionado == combinacionInventario){
					objeto.juego.iniciarDialogo([
					"¿Deshacerme de la nota que tanto tiempo he tardado en localizar?",
					"Po' va a ser que no."
				]);
				}else{
					objeto.juego.iniciarDialogo([
						"Es una cama. O mejor dicho, se parece a una cama.",
						"Tengo la sensación de que si me tumbo me romperé cuatro costillas."
					]);
				}
					
			}else{
				objeto.juego.iniciarDialogo([
					"Desde luego, las condiciones son las óptimas para tumbarme.",
					"Pero ya he dormido suficiente, gracias."			
				]);
			}

		}

		var puntoCamara = new THREE.Object3D();
		puntoCamara.position.z = 50;


		var trueCama = new ObjetoExaminable(modeloCama, funcionCama, puntoCamara, juego);

		trueCama.position.x = -90;
		trueCama.position.y = 10;
		trueCama.rotation.y = Math.PI/2;

		var nota = crearCombinacion(combinacionInventario);
		nota.position.y = -10;
		nota.position.z = 10;
		nota.rotateX(-Math.PI/2);

		trueCama.insertarSubobjeto(nota);

		return trueCama;
	}

	/** Crear los objetos interactuables */
	var crearObjetos = function()
	{
		var objetos = new THREE.Object3D();

		// Objetos inventario
		var llaveInventario = new ObjetoInventario("Llave", "imgs/inventario/llave.png");
		var combinacionInventario = new ObjetoInventario("Combinación", "imgs/1031.png");

		// Interruptor de la luz
		objetos.add(crearInterruptor());

		//Poster
		objetos.add(crearPoster());

		// Puerta
		objetos.add(crearPuerta(llaveInventario));

		//Cama
		objetos.add(crearCama(combinacionInventario));

		// Escritorio
		crearEscritorio(objetos, llaveInventario, combinacionInventario);

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
