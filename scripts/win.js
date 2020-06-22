//-- ------------x--------------- WIN ------------------------x------------------ 
//-- ------------x--------------- Variables Globales ------------------------x------------------ 
//Estas variables se estaran utilizando a lo largo de las diferentes escenas
class win extends Phaser.Scene {

    constructor(){
        super("win"); //Cargando el constructor del padres obteniendo todas las caracteristica  de als escenas de Phaser
    }
    preload () {
        //-- ------------x---------------  Carga de imagenes ------------------------x------------------
        this.scale.startFullscreen;
        this.load.image("backgroundWin", "images/backWin.png");
        this.load.image("play", "images/playButton.png");
        this.load.atlas("playerWin", "images/agentWin.png", "images/agentWin.json");
    }

    create() {
        //-- ------------x---------------  Background ------------------------x------------------
        backgroundImg = this.add.image(-10, -5, "backgroundWin"); //imagen del fondo
        backgroundImg.setScale(0.98);
        backgroundImg.setOrigin(0,0);
        //-- ------------x---------------  Boton ------------------------x------------------
        buttonPlay = this.add.image(600, 280, "play"); //se crea el boton para jugar
        buttonPlay.setScale(0.3);
        buttonPlay.setInteractive();
        buttonPlay.setOrigin(0.5);
        buttonPlay.on('pointerdown',this.reset.bind(this));
        //-- ------------x---------------  Texto - Boton------------------------x------------------
        scoreText = this.add.text(600, 275, 'MENU', { fontFamily: "Rockwell Condensed",fontSize: '32px', fill: '#000' });
        scoreText.setOrigin(0.5);
        //-- ------------x---------------  Heroe ------------------------x------------------
        heroe=this.physics.add.sprite(250,200,"playerWin");
        heroe.setScale(0.2);
        //-- ------------x---------------  Animaciones ------------------------x------------------
        this.anims.create({
            key: "win",
            frames: this.anims.generateFrameNames("playerWin", {
                prefix: "1_police_attack_Attack3_",
                suffix: ".png",
                start: 0,
                end: 5,
                zeroPad:3,           
            }),
            repeat:0,
            frameRate: 8
        });
        heroe.play("win");
    }
    //-- ------------x--------------- FUNCIONES ------------------------x------------------ 
    reset() {
        //Se cambia al menu
        this.scene.stop("win");
        this.scene.start("menu");
    }

}
