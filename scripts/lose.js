//-- ------------x--------------- LoSE ------------------------x------------------ 
//-- ------------x--------------- Variables Globales ------------------------x------------------ 
//Estas variables se estaran utilizando a lo largo de las diferentes escenas
var backgroundImg
var buttonPlay

class lose extends Phaser.Scene {

    constructor(){
        super("lose"); //Cargando el constructor del padres obteniendo todas las caracteristica  de als escenas de Phaser
    }
    preload () {
        //-- ------------x---------------  Carga de imagenes ------------------------x------------------
        this.scale.startFullscreen;
        this.load.image("backgroundLose", "./images/backLose.png");
        this.load.image("play", "images/playButton.png");
        this.load.atlas("playerLose", "./images/agentHurt.png", "./images/agentHurt.json");
    }

    create() {
        //-- ------------x---------------  Background ------------------------x------------------
        backgroundImg = this.add.image(0, -5, "backgroundLose"); //imagen del fondo
        backgroundImg.setOrigin(0,0);
        //-- ------------x---------------  Boton ------------------------x------------------ 
        buttonPlay = this.add.image(580, 280, "play"); //se crea el boton para jugar
        buttonPlay.setScale(0.3);
        buttonPlay.setInteractive();
        buttonPlay.setOrigin(0.5);
        buttonPlay.on('pointerdown',this.reset.bind(this));
        //-- ------------x---------------  Texto - boton ------------------------x------------------ 
        scoreText = this.add.text(580, 275, 'REINTENTAR', { fontFamily: "Rockwell Condensed",fontSize: '25px', fill: '#000' });
        scoreText.setOrigin(0.5);
        //-- ------------x---------------  Heroe ------------------------x------------------ 
        heroe=this.physics.add.sprite(200,200,"playerLose");
        heroe.setScale(0.2);
        //-- ------------x---------------  Animaciones ------------------------x------------------ 
        //Movimiento de perdida
        this.anims.create({
            key: "lose",
            frames: this.anims.generateFrameNames("playerLose", {
                prefix: "1_police_Hurt_",
                suffix: ".png",
                start: 0,
                end: 8,
                zeroPad:3,           
            }),
            repeat:0,
            frameRate: 8
        });
        heroe.play("lose");
    }
    //-- ------------x--------------- FUNCIONES ------------------------x------------------ 
    reset() {
        //Si se pieder, vuelve a la primera escena
        this.scene.start("level1");
    }

}
