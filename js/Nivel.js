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
		var funcionCubo = function(a, b, c)
		{
			if (b == Juego.Modo.TUTORIAL)
			{
				a.juego.terminarTutorial();
				a.juego.iniciarDialogo(["Tutorial"]);
			}
			else
			a.juego.iniciarDialogo([
				"Es un cubo de color rojo.",
				"Puede que me sirva para algo, será mejor que lo guarde."
			]);
		};
		var objetoCubo = new ObjetoInventario("Cubo", "imgs/inventario/test.png");
		var cubo = new ObjetoRecogible(modeloCubo, funcionCubo, objetoCubo, juego);
		cubo.translateY(40);
		cubo.translateZ(-30);
		cubo.translateX(-10);
		objetos.add(cubo);

		// Esfera
		var modeloEsfera = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 32),
										  new THREE.MeshLambertMaterial({color: 0x0000aa}));
		var funcionEsfera = function(a, b, c)
		{
			a.juego.iniciarDialogo([
				"Es una esfera de color azul."
			]);
		};
		var puntoEsfera = new THREE.Object3D();
		puntoEsfera.rotateY(90 * (Math.PI/180));
		puntoEsfera.translateZ(30);
		puntoEsfera.updateMatrix();
		var esfera = new ObjetoExaminable(modeloEsfera, funcionEsfera, puntoEsfera, juego);
		esfera.translateY(40);
		esfera.translateZ(-30);
		esfera.translateX(10);
		objetos.add(esfera);

		// Subcubo
		var modeloCubo = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3),
										new THREE.MeshLambertMaterial({color: 0x00aa00}));
		var funcionCubo = function(a, b, c)
		{
			a.juego.iniciarDialogo([
				"Es un pequeño cubo de color verde que estaba detrás de la esfera.",
				"Me lo llevo, por si acaso sirve para algo más adelante."
			]);
		};
		var objetoCubo = new ObjetoInventario("Subcubo", "imgs/inventario/test2.png");
		var cubo = new ObjetoRecogible(modeloCubo, funcionCubo, objetoCubo, juego);
		cubo.translateZ(-7);
		esfera.insertarSubobjeto(cubo);

		var modeloCama;
		var cargadorMTL = new THREE.MTLLoader();
		cargadorMTL.setPath("models/Desk/");
		cargadorMTL.load("Desk.mtl", function(material)
		{
			material.preload();
			
			var cargadorObjetos = new THREE.OBJLoader();
			cargadorObjetos.setMaterials(material);
			cargadorObjetos.setPath("models/Desk/");
			cargadorObjetos.load("Desk.obj", function(objeto)
			{
				modeloCama = objeto;
				//objeto.material = new THREE.MeshLambertMaterial({color: 0x00aa00});
				//objeto.material.needsUpdate = true;

				modeloCama.scale.set(18, 18, 18);
				//modeloCama.updateMatrix();
				modeloCama.translateX(100);
				modeloCama.rotateY(-90 * Math.PI/180);

				objetos.add(modeloCama);
			});
		});
		
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
