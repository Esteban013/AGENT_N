//-- ------------x--------------- ESCENA 2L ------------------------x------------------ 
//-- ------------x--------------- Variables Globales ------------------------x------------------ 
//Estas variables se estaran utilizando a lo largo de las diferentes escenas
var food;
var platforms;
var platform1;
var platform2;
var platform3;
var platform4;
var bombs;
var zoneLeft;


class level2 extends Phaser.Scene {
    
    constructor(){
        super("level2"); //Cargando el constructor del padres obteniendo todas las caracteristica  de als escenas de Phaser
    }
    preload () {
        //-- ------------x---------------  Carga de imagenes ------------------------x------------------ 
        this.load.image("background3", "images/back2.jpg");
        this.load.image("ground2", "images/platform.PNG");
        this.load.atlas("player", "images/agent.png", "./images/agent.json");
        this.load.image("dessert", "images/dessert.png");
        this.load.image("bomb", "images/bomb.png");
        this.load.image("left2", "images/left2.png");
        this.load.image("right2", "images/right2.png");
        this.load.image("up2", "images/up2.png");
    }
    
    create() {
        //-- ------------x---------------  Background ------------------------x------------------
        backgroundLevel = this.add.tileSprite(0, 0,game.config.width, game.config.height ,"background3"); //imagen del fondo
        backgroundLevel.setScale(1);
        backgroundLevel.setOrigin(0,0);
        //-- ------------x---------------  Score ------------------------x------------------
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        //-- ------------x---------------  Piso ------------------------x------------------    
        ground=this.physics.add.staticGroup();        
        ground.create(0,370, "ground2").setScale(1.1,1).setOrigin(0,0).refreshBody();
        //-- ------------x---------------  Plataformas ------------------------x------------------  
        //Se instancia cada plataforma        
        platform1 = this.physics.add.image(550,100, "ground2").setScale(0.2,0.4).setOrigin(0,0);
        platform2 = this.physics.add.image(300,250, "ground2").setScale(0.3,0.4).setOrigin(0,0);
        platform3 = this.physics.add.image(100,120, "ground2").setScale(0.3,0.4).setOrigin(0,0);
        //Se crea un grupo dinamico con las plataformas
        platforms=this.physics.add.group()
        platforms.add(platform1); 
        platforms.add(platform2);
        platforms.add(platform3);
        //Para cada uno de las plataformas, se habilita la colision con la escena 
        platforms.children.iterate(function (child) {
            child.setCollideWorldBounds(true);
            child.setImmovable(true);
        });
        //-- ------------x---------------  Primera Bomba ------------------------x------------------
        //Se realiza este codigo para encontrar una primera bomba en la primera tanta de postres         
        bombs=this.physics.add.group();
        var bomb = bombs.create(500, 16, 'bomb').setScale(0.1).setOrigin(0,0);
        bomb.setBounce(1); //rebote
        bomb.setGravityY(500);
        bomb.setCollideWorldBounds(true); //colisiones con el borde
        bomb.setVelocity(Phaser.Math.Between(-400, 400), 20); //velocidad aleatoria
        //-- ------------x---------------  Postres ------------------------x------------------        
        //Se crea un grupo de postres distanciado en el eje X con el eje Y=0
        food = this.physics.add.group({
            key: "dessert",
            repeat: 7,  //cantidad
            setXY: { x: 12, y: 0, stepX: 100 },
            setScale: {
                x:0.2,
                y:0.2
            },
        });
        //Para cada uno de los postres se da un rebote aleatorio, graves y colision
        food.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));  
            child.setGravityY(500);     
            child.setCollideWorldBounds(true);
        });
        //-- ------------x---------------  Heroe ------------------------x------------------
        //se crea el personaje
        heroe=this.physics.add.sprite(0,300,"player");
        heroe.setCollideWorldBounds(true);
        heroe.setScale(0.1);
        heroe.body.setGravityY(400);
        //-- ------------x--------------- Colisiones ------------------------x------------------
        this.physics.add.collider(heroe, ground);
        this.physics.add.collider(heroe, platforms);
        this.physics.add.collider(food, ground);
        this.physics.add.collider(food, platforms);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(bombs, ground);
        this.physics.add.overlap(heroe,food,this.collectFood,null,this);
        this.physics.add.overlap(heroe,bombs,this.hurtHeroe,null,this);
        //-- ------------x---------------  Animaciones ------------------------x------------------
        //Movimiento en descanso
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
        //Movimiento de caminar
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
        //-- ------------x---------------  Botones - Teclado ------------------------x------------------
        cursors= this.input.keyboard.createCursorKeys();
        //-- ------------x---------------  Botones - Moviles ------------------------x------------------
        //Creación de los botones left, right, up, shoot para dispositivos moviles
        buttonLeft = this.add.image(50 , 335, "left2"); //se crea el boton para jugar
        buttonLeft.setScale(0.3);
        buttonLeft.setAlpha(0.5);
        buttonLeft.setInteractive();
        buttonLeft.setOrigin(0.5);

        buttonRight = this.add.image(750, 335, "right2"); //se crea el boton para jugar
        buttonRight.setScale(0.3);
        buttonRight.setAlpha(0.5);
        buttonRight.setInteractive();
        buttonRight.setOrigin(0.5);

        buttonUp = this.add.image(400, 335, "up2"); //se crea el boton para jugar
        buttonUp.setScale(0.3);
        buttonUp.setAlpha(0.5);
        buttonUp.setInteractive();
        buttonUp.setOrigin(0.5);
        buttonUp.on('pointerdown', this.up.bind(this));

        //Permite el multitouch, es decir, que se puede oprimir al mismo tiempo 2 teclas
        this.input.addPointer(2);

        //Asignación de movimientos al momento de presionar cada boton
        buttonLeft.on('pointerdown', function () {
            left=true;
        }.bind(this));
        buttonLeft.on('pointerup', function () {
            left=false;
        }.bind(this));      

        buttonRight.on('pointerdown', function () {
            right=true;
        }.bind(this));
        buttonRight.on('pointerup', function () {
            right=false;
        }.bind(this));
    }

    update(){  
         //-- ------------x---------------  Movimiento Heroe------------------------x------------------
        //Movimiento a la derecha
        if(cursors.right.isDown || right==true)    {
            heroe.setVelocityX(200);
            heroe.setFlipX(0);
            heroe.play("walk",true); 
        //Movimiento a la izquierda    
        }else if(cursors.left.isDown || left==true)    {
            heroe.setFlipX(1);
            heroe.setVelocityX(-200);
            heroe.play("walk", true);
        //Movimiento en reposo            
        }else{
            heroe.setVelocityX(0);
            heroe.play("ldle",true);
        }
        //Salto
        if(Phaser.Input.Keyboard.JustDown(cursors.up) && cursors.up.isDown){
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
        //-- ------------x---------------  Cambio de Escena------------------------x------------------
        //Puntaje requerido para pasar a la otra escena
        if(score==160){
            score=0;
            this.scene.stop("level2");
            this.scene.start("level3");
         //Si nuestro heroe se choca con las bombas, se pierde y resetea score, y cambia a la escena LOSE
        }else if(score==-1){
            score=0;
            this.scene.stop("level2");
            this.scene.start("lose");
        }
    }    

    //-- ------------x---------------  Funciones------------------------x------------------
    //Encargada de dar la habilitacion de perdida y resete la posicion de los enemigos
    hurtHeroe(heroe, enemy){
        score=-1;
    }
    //Encargada de recolectar y generacion de postres y generacion de bombas
    collectFood(target,dessert){
        dessert.disableBody(true, true);
        score += 10; //suma 10 puntos por cada ostre
        scoreText.setText('Score: ' + score);        
        if (food.countActive() === 0){  //verifica si el grupo de postres esta vacio, si lo esta genera nuevamenete desde un Eje Y=0
            food.children.iterate(function (child) {
                var x = Phaser.Math.Between(0, game.config.width); // ya posicion en X aleatorio
                child.enableBody(true, x, 0, true, true); //crea nuevamente los postres
            });
            //creacion de una nueva bomba
            var x = (target.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = bombs.create(x, 16, 'bomb').setScale(0.1).setOrigin(0,0);
            bomb.setBounce(1);
            bomb.setGravityY(500);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-300, 300), 100);
        }
    }
    //Encargada del salto para el boton . movil
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
}
