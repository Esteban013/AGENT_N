//-- ------------x--------------- PRINCIPAL ------------------------x------------------ 
//El codigo realizado en cada uno de los .js son realizados a partir del Phaser 3 por 
//lo cual la estructura cambia ligeramente con respecto al Phaser 2 que fue el enseñado
//en el curso 
//-- ------------x--------------- Configuración del juego ------------------------x------------------ 
var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 400,
    parent:"game", //la etiqueta id para referenciarlo en el index.html
    scale: {
        //permite realizar el Responsive
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        //habilita la fisica
        default: "arcade",
    }
}
//-- ------------x--------------- Escenas ------------------------x------------------ 
//se agregan las escenas del juego y creación del juego
var game = new Phaser.Game(config); 
game.scene.add("menu",menu);
game.scene.add("level1",level1); 
game.scene.add("lose",lose);
game.scene.add("level2",level2);  
game.scene.add("level3",level3);
game.scene.add("win",win);    
game.scene.start("menu");