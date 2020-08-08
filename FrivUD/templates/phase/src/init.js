const config = {  /* Creo una constante para enviar como parametro al constructor de Phaser */
    type: Phaser.AUTO,/* El navegador escogera el modo más adecuado (Canvas,WebGl entro otros) */
    width: 800,/* Defino el ancho */
    height: 600,/* Defino el alto */
    backgroundColor: '#392542',/* Escojo un color de Fondo */
    physics:{
        default:"Arcade"/* Llamo la física usual para el videojuego */
    },
    scene:[level1,level2,level3,end]/* Creo la lista de escenas*/
}

var game = new Phaser.Game(config);/* Instancia un objeto juego en la variable game */
