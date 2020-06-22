//-- ------------x--------------- MENU ------------------------x------------------ 
//-- ------------x--------------- Variables Globales ------------------------x------------------ 
//Estas variables se estaran utilizando a lo largo de las diferentes escenas
var backgroundImg
var buttonPlay

class menu extends Phaser.Scene {

    constructor(){
        super("menu"); //Cargando el constructor del padre obteniendo todas las caracteristica  de las escenas de Phaser
    }
    preload () {
        //-- ------------x---------------  Carga de imagenes ------------------------x------------------ 
        //Se cargan las imagenes necesarias en este caso, la imagen de fondo y el boton play
        this.load.image("background", "images/backMenu.jpg");
        this.load.image("playMenu", "images/playMenu.png");
    }

    create() {
        //-- ------------x---------------  Background ------------------------x------------------ 
        var backgroundImg = this.add.image(0, 0, "background"); //imagen del fondo
        backgroundImg.setScale(0.969);
        backgroundImg.setOrigin(0,0);
        //-- ------------x---------------  Boton ------------------------x------------------ 
        buttonPlay = this.add.image(400, 200, "playMenu"); //se crea el boton para jugar
        buttonPlay.setScale(0.3);
        buttonPlay.setInteractive();  //se habilita la interacción con el boton
        buttonPlay.setOrigin(0.5);
        buttonPlay.on('pointerdown',this.play.bind(this));   //al oprimir el boton con el puntero, se activa la funcion play
        //-- ------------x---------------  Texto Boton ------------------------x------------------ 
        scoreText = this.add.text(400, 200, 'JUGAR', { fontFamily: "Rockwell Condensed",fontSize: '25px', fill: '#000' });
        scoreText.setOrigin(0.5);
    }
    //-- ------------x--------------- FUNCIONES ------------------------x------------------ 
    play() {
        //se encarga de para la escena actual y continuar con el primer nivel del juego 
        this.scene.stop("menu");
        this.scene.start("level3");
    }

}
