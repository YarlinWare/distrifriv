var end  = new Phaser.Class({/* instancio objeto que hereda de escenas de phaser */

    Extends: Phaser.Scene,initialize:

    function end(){
        Phaser.Scene.call(this,{key:'end'});/* defino el constructor y una clave para el objeto ya creado */
    },
    preload:function(){
        /* Funcion para cargar el cache */
        this.load.image('win','resources/win.png');/* Cargo la imagen del  trofeo  */
    },
    create:function(){
        /* Funcion para mostar en pantalla */
        this.add.image(400,300,'win').setScale(.5);/* Creo la imagen del trofeo */
    },
    update:function(){/* Funcion que contiene un hilo para que se corra de manera continua */}
});
