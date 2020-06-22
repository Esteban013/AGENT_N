//-- ------------x--------------- ESCENA 1L ------------------------x------------------ 
//-- ------------x--------------- Variables Globales ------------------------x------------------ 
//Estas variables se estaran utilizando a lo largo de las diferentes escenas
var heroe;
var cursors;
var backgroundLevel;
var ground;
var scoreText;
var score=0;
var book;
var book2;
var book3;
var enemies;
var bullet;
var spacebar;
var jumpCount=0;
var right;
var left;
var up;
var shoot;
var buttonLeft;
var buttonRight;
var buttonUp;
var buttonShoot;

class level1 extends Phaser.Scene {
    
    constructor(){
        super("level1"); //Cargando el constructor del padre obteniendo todas las caracteristica  de als escenas de Phaser
    }
    preload () {
        //-- ------------x---------------  Carga de imagenes ------------------------x------------------ 
        this.load.image("background2", "images/back1.jpg");
        this.load.image("ground", "images/ground2.png");
        this.load.image("bullet", "images/bullet.png");
        this.load.atlas("player", "images/agent.png", "images/agent.json"); //archivo que permite la creacion del jugador a partir de diferentes png
        this.load.atlas("book", "images/book.png", "images/book.json"); //archivo que permite la creacion del libro a partir de diferentes png
        //Imagenes de los botones
        this.load.image("left", "images/left.png");
        this.load.image("right", "images/right.png");
        this.load.image("up", "images/up.png");
        this.load.image("shoot", "images/shoot.png");
    }
    
    create() {
        //-- ------------x---------------  Background ------------------------x------------------
        backgroundLevel = this.add.tileSprite(0, 0,game.config.width, game.config.height ,"background2"); //imagen del fondo con repeticion
        backgroundLevel.tileScaleY = 0.8;
        backgroundLevel.setOrigin(0,0);
        //-- ------------x---------------  Score ------------------------x------------------
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });        
        //-- ------------x---------------  Piso ------------------------x------------------  
        ground=this.physics.add.staticGroup();        
        ground.create(0,385, "ground").setOrigin(0,0).refreshBody();
         //-- ------------x---------------  Book ------------------------x------------------
        //Se instancia 3 libros 
        book=this.physics.add.sprite(0,0,"book");
        book.setScale(0.1);
        book.setFlipX(1);
        
        book2=this.physics.add.sprite(0,0,"book");
        book2.setScale(0.15);
        book2.setFlipX(1);
        
        book3=this.physics.add.sprite(0,0,"book");
        book3.setScale(0.13);
        book3.setFlipX(1);

        //Se crea un grupo con los libros, que colisionaran con nuestro personaje y balas
        enemies=this.physics.add.group()
        enemies.add(book); 
        enemies.add(book2);
        enemies.add(book3);

         //-- ------------x---------------  Heroe ------------------------x------------------
        heroe=this.physics.add.sprite(0,300,"player");
        heroe.setCollideWorldBounds(true); //habilita la colision con el borde de la escena
        heroe.setScale(0.12);
        heroe.body.setGravityY(400);

         //-- ------------x---------------  Colisiones ------------------------x------------------
        this.physics.add.collider(heroe, ground);
        this.physics.add.overlap(heroe,enemies,this.hurtHeroe,null,this); //permite que cuando haya colision con los dos objetos
                                                                            // y ejecute la funcion hurtHeroe


         //-- ------------x---------------  Animaciones ------------------------x------------------
        // Animacion para el libro
         this.anims.create({
            key: "ldle_z",
            frames: this.anims.generateFrameNames("book", {
                prefix: "book-",
                suffix: ".png",
                start: 0,
                end: 15,
                zeroPad:1,           
            }), //busca los pngs que componen su animacion 
            repeat:-1,  //para una repeticion infinita
            frameRate: 10   //velocidad de reproduccion
        });
        book.play("ldle_z");  //agregar animacion al libro
        book2.play("ldle_z");
        book3.play("ldle_z");

        //Animacion para el personaje en descanso   
        this.anims.create({
            key: "ldle",
            frames: this.anims.generateFrameNames("player", {
                prefix: "1_police_Idle_",
                suffix: ".png",
                start: 0,
                end: 7,
                zeroPad:3,           
            }),
            repeat:-1,
            frameRate: 10
        });
        //Animacion para el personaje caminando 
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNames("player", {
                prefix: "1_police_Run_",
                suffix: ".png",
                start: 1,
                end: 6,
                zeroPad:3,           
            }),
            repeat:-1,
            frameRate: 10
        });
        //Animacion para el personaje disparando
        this.anims.create({
            key: "attack",
            frames: this.anims.generateFrameNames("player", {
                prefix: "1_police_attack_Attack_000_",
                suffix: ".png",
                start: 0,
                end: 4,
                zeroPad:3,           
            }),
            repeat:-1,
            frameRate: 20
        });
        //-- ------------x--------------- Botones - Keyboards ------------------------x------------------
        cursors= this.input.keyboard.createCursorKeys();  //obtenemos las principales teclas del teclado
        spacebar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //creamos la tecla espacio, esto a que necesitamos generar solo un pulso con la tecla espacio
        
        //-- ------------x---------------  Botones - Moviles------------------------x------------------
        //Creación de los botones left, right, up, shoot para dispositivos moviles
        buttonLeft = this.add.image(50 , 335, "left"); //se crea el boton para jugar
        buttonLeft.setScale(0.3);
        buttonLeft.setAlpha(0.5); //opacidad
        buttonLeft.setInteractive();
        buttonLeft.setOrigin(0.5);

        buttonRight = this.add.image(750, 335, "right"); //se crea el boton para jugar
        buttonRight.setScale(0.3);
        buttonRight.setAlpha(0.5);
        buttonRight.setInteractive();
        buttonRight.setOrigin(0.5);

        buttonShoot = this.add.image(750, 235, "shoot"); //se crea el boton para jugar
        buttonShoot.setScale(0.3);
        buttonShoot.setAlpha(0.5);
        buttonShoot.setInteractive();
        buttonShoot.setOrigin(0.5);

        buttonUp = this.add.image(50, 235, "up"); //se crea el boton para jugar
        buttonUp.setScale(0.3);
        buttonUp.setAlpha(0.5);
        buttonUp.setInteractive();
        buttonUp.setOrigin(0.5);
        buttonUp.on('pointerdown', this.up.bind(this)); //realiza la función up al oprimirse 

        //Permite el multitouch, es decir, que se puede oprimir al mismo tiempo 2 teclas
        this.input.addPointer(2);

        //Asignación de movimientos al momento de presionar cada boton

        buttonLeft.on('pointerdown', function () {
            left=true;
        });
        buttonLeft.on('pointerup', function () {
            left=false;
        });       

        buttonRight.on('pointerdown', function () {
            right=true;
        });
        buttonRight.on('pointerup', function () {
            right=false;
        });
        
        buttonShoot.on('pointerdown', function () {
            shoot=true;
        });
        buttonShoot.on('pointerup', function () {
            shoot=false;
        });

    }
    
    update(){  
        //-- ------------x---------------  Movimiento Books------------------------x------------------
        this.moveBook(book,7); //se envia el objeto y velocidad 
        this.moveBook(book2,5);
        this.moveBook(book3,3);
        //-- ------------x---------------  Movimiento Heroe------------------------x------------------
        //Movimiento a la derecha
        if(cursors.right.isDown || right==true){ //si se oprime con el teclado o touch
            backgroundLevel.tilePositionX+=2;   //se mueve el fondo en sentido contrario al heroe
            heroe.setVelocityX(200);
            heroe.setFlipX(0);                  // si es 0 no se realiza, si es 1 es reflejado
            heroe.play("walk",true);            //habilita la animacion caminar
            if(Phaser.Input.Keyboard.JustDown(spacebar) || shoot==true) {   //permite disparar mientras camina
                heroe.anims.play("attack",true); 
                this.shoot(300);
            }else if(cursors.space.isDown){ //permite la animacion si se continua oprimiendo espacio
                heroe.play("attack",true);
            }
        //Movimiento a la izquierda
        }else if(cursors.left.isDown || left==true){
            backgroundLevel.tilePositionX-=2;
            heroe.setFlipX(1);
            heroe.setVelocityX(-200);
            heroe.play("walk", true);
            if(Phaser.Input.Keyboard.JustDown(spacebar) || shoot==true) {
                heroe.anims.play("attack",true); 
                this.shoot(-300);       //el signo negativo es para darle sentido a la velocidad acorde al mvimiento
            }else if(cursors.space.isDown){
                heroe.play("attack",true);
            }
        //Disparo si se esta estacionario   
        }else if(Phaser.Input.Keyboard.JustDown(spacebar) || shoot==true){
            heroe.setVelocityX(0);
            heroe.setFlipX(0);
            heroe.play("attack",true);
            this.shoot(300);   
        //Disparo si se esta estacionario mateniendo la tecla espacio       
        }else if(cursors.space.isDown){
            heroe.play("attack",true);
        //Modo estacionario del personaje
        }else{
            heroe.setVelocityX(0);
            heroe.play("ldle",true);
        }
        //Salto
        //Permite mas salto en el aire
        if(Phaser.Input.Keyboard.JustDown(cursors.up) && cursors.up.isDown ){
            if(heroe.body.touching.down && jumpCount==0){   //si esta en el piso y no ha saltado, permite primer salto 
                heroe.setVelocityY(-300);
                jumpCount+=1;            
            }else if((!heroe.body.touching.down) && jumpCount<2){  //comprueba que el personaje esta en el aire y solo ha realizado un salto
                heroe.setVelocityY(-300); 
                jumpCount+=1;
            }else{
                jumpCount=0;
            }
        }

        //Permite la animacion de ataque mientras se encuentra en el aire
        if(heroe.body.velocity.y !== 0){
            if(cursors.space.isDown) {
                heroe.anims.play("attack",true); 
            }
        }

        //-- ------------x---------------  Cambio de Escena------------------------x------------------
        //Puntaje requerido para pasar a la otra escena
        if(score==20){
            score=0;
            this.scene.stop("level1");
            this.scene.start("level2");
        //Si nuestro heroe se choca con los libros, se pierde y resetea score, y cambia a la escena LOSE
        }else if(score==-1){
            score=0;
            this.scene.stop("level1");
            this.scene.start("lose");
        }
    }    

    //-- ------------x---------------  Funciones------------------------x------------------
    //Encargada de dar la habilitacion de perdida y resete la posicion de los enemigos
    hurtHeroe(heroe, enemy){
        this.resetBookPos(enemy);   
        score=-1;
    }
    //Encargada de realizar el disparo 
    shoot(speed){             
        bullet = this.physics.add.sprite(heroe.x + 150,heroe.y + 130,"bullet"); //agrega la imagen del disparo
        bullet.setAngle(90); //cambia la orientacion ya que la bala se encuentra vertical
        bullet.setScale(0.2);    
        bullet.setVelocityX(speed);
        bullet.enableBody=true;  //Permite que se activa su fisica
        this.physics.add.overlap(bullet,enemies,this.killEnemies,null,this); //permite ejecutar la funcion de Killenemies entre los enemigos y el disparo  
    }
    //Encargada de matar a los enemigos
    killEnemies(bullet,enemy){
        score+=1;        //por cada muerte se agrega 1 al score
        scoreText.setText('Score: ' + score);        //muestra el valor del score
        this.resetBookPos(enemy);   //reinicia la posicion de los enemigos
        bullet.destroy();     //destruye la bala
    }
    //Encargada de realizar la funcion saltar para el boton - movil
    up(){
        if(heroe.body.touching.down && jumpCount==0){
            heroe.setVelocityY(-300);
            jumpCount+=1;            
        }else if((!heroe.body.touching.down) && jumpCount<2){
            heroe.setVelocityY(-300);
            jumpCount+=1;
        }else{
            jumpCount=0;
        }
    }
    //Encargada de aplicar el movimiento a los libro y resetearlos si su posicion se sale de la pantalla
    moveBook(target, speed) {
        target.x-=speed;
        if(target.x < 0){
            this.resetBookPos(target);
        }
    }
    //Encarfa de resetear la posicion de los libro
    resetBookPos(target){
        target.x=config.width;   //posicion X al final de la escena 
        var randomY= Phaser.Math.Between(100, config.height-70); 
        target.y=randomY;   //posicion Y, numero aleatorio
    }    
}
