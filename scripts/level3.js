//-- ------------x--------------- ESCENA 3L ------------------------x------------------ 
//-- ------------x--------------- Variables Globales ------------------------x------------------ 
//Estas variables se estaran utilizando a lo largo de las diferentes escenas
var timer=0;
var obstacles=[];
var x=0;

class level3 extends Phaser.Scene {
    
    constructor(){
        super("level3"); //Cargando el constructor del padres obteniendo todas las caracteristica  de als escenas de Phaser
    }
    preload () {
        //-- ------------x---------------  Carga de imagenes ------------------------x------------------
        this.load.image("background4", "images/back3.jpg");
        this.load.atlas("player", "images/agent.png", "images/agent.json");
        this.load.image("pipe", "images/pipe.png");
        this.load.image("up3", "images/up3.png");
    }
    
    create() {
        //-- ------------x---------------  Background ------------------------x------------------
        backgroundLevel = this.add.tileSprite(0, 0,game.config.width, game.config.height ,"background4"); //imagen del fondo
        backgroundLevel.tileScaleY = 0.8;
        backgroundLevel.setOrigin(0,0);
        //-- ------------x---------------  Score ------------------------x------------------
        scoreText = this.add.text(16, 16, 'Score: 0 km', { fontSize: '32px', fill: '#000' });
        //-- ------------x---------------  Heroe ------------------------x------------------
        heroe=this.physics.add.sprite(200,200,"player");
        heroe.setCollideWorldBounds(true);
        heroe.setScale(0.15);
        heroe.body.setGravityY(400);
        //-- ------------x---------------  Colisiones ------------------------x------------------
        this.physics.add.collider(heroe, ground);
        this.physics.add.overlap(heroe,obstacles,this.hurtHeroe,null,this);
        //-- ------------x---------------  Animaciones------------------------x------------------
        //Movimiento caminando 
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
        heroe.play("walk");
        //-- ------------x---------------  Botones - Keyboard------------------------x------------------
        cursors= this.input.keyboard.createCursorKeys();
        //-- ------------x---------------  Botones - Movil------------------------x------------------
        //Saltar
        buttonUp = this.add.image(750, 335, "up3"); 
        buttonUp.setScale(0.3);
        buttonUp.setInteractive();
        buttonUp.setOrigin(0.5);
        buttonUp.setAlpha(0.5);
        buttonUp.on('pointerdown', this.up.bind(this));
    }

    update(){  
         //-- ------------x---------------  Timer------------------------x------------------        
        timer++;
         //-- ------------x---------------  Movimiento fondo------------------------x------------------
        backgroundLevel.tilePositionX+=2;
         //-- ------------x---------------  Movimiento tuberias------------------------x------------------
        for(var i=0; i<obstacles.length;i++){
            obstacles[i].x-=5;
        }
         //-- ------------x---------------  Movimiento Heroe------------------------x------------------
        //Salto
        if(Phaser.Input.Keyboard.JustDown(cursors.up) && cursors.up.isDown ){
            if(heroe.body.touching.down && jumpCount==0){
                heroe.setVelocityY(-500);
                jumpCount+=1;            
            }else if((!heroe.body.touching.down) && jumpCount<2){
                heroe.setVelocityY(-300);
                jumpCount+=1;
            }else{
                jumpCount=0;
            }
        }
         //-- ------------x---------------  Score------------------------x------------------
        if(timer/50 % 1 == 0 && timer != 0){            
            score+=1;       //Cada 0.5 seg obtenemos un 1 punto en score, en este caso KM
            scoreText.setText('Score: ' + score + " km");
         }
         //-- ------------x---------------  Aparicion de Tuberias------------------------x------------------           
        //Genera un valor aleatorio el cual sera en el encargado de generar un tiempo aleatorio para la aparicion de tuberias
         if(timer/100 % 1 == 0){            
           x = Phaser.Math.Between(100, 200);
        }
        //Generacion de tuberias en el tiempo aleatorio
        if(timer/x % 1 == 0 && timer != 0){       
            obstacles[i]=this.physics.add.image(1200,760,"pipe").setScale(0.1);
        }
        //-- ------------x---------------  Cambio de Escena------------------------x------------------
        //Puntaje requerido para pasar a a escena WIN
        if(score==20){
            score=0;
            timer=0;
            x=0;
            obstacles=[];
            this.scene.stop("level3");
            this.scene.start("win");
        //Si nuestro heroe se choca con las tuberias, se pierde y resetea score, y cambia a la escena LOSE
        }else if(score==-1){
            score=0;
            timer=0;
            x=0;
            this.scene.stop("level3");
            this.scene.start("lose");
        }
    }
    //-- ------------x---------------  Funciones------------------------x------------------
    //Encargada de dar la habilitacion de perdida y resete la posicion de los enemigos
    hurtHeroe(heroe, enemy){
        score=-1;
    }
    //Encargada del salto para el boton - movil
    up(){
        if(heroe.body.touching.down && jumpCount==0){
            heroe.setVelocityY(-500);
            jumpCount+=1;            
        }else if((!heroe.body.touching.down) && jumpCount<2){
            heroe.setVelocityY(-300);
            jumpCount+=1;
        }else{
            jumpCount=0;
        }
    }    
}
