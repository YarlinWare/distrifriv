var puntos=0;/* Variable para los puntos */
var level3 = new Phaser.Class({/* Instancia un nuevo objeto */

    Extends: Phaser.Scene,initialize:/* Hereda de la superclase scena de phaser */

    function level3(){
        Phaser.Scene.call(this,{key:'level3'});        /* defino en el constructor el nombre clave del obejto */
    },
    preload:function(){
        /* Cargo imagenes de los elementos del nivel  */
        this.load.image('ship','resources/nave.png');
        this.load.image('fondo3','resources/Fondo.jfif');
        this.load.image('asteroide','resources/asteroid.png');
        this.load.image('laser','resources/laser.png');
    },
    create:function(){

        /* creo el fondo y la escala para que se muestra en este nivel */
        this.add.image(400,400,'fondo3').setScale(.8);

        /* Creo un elemento asteroide y que se repita 14 veces osea total 15 
        posicion y el espacio entre cada uno*/
        asteroids = this.physics.add.group({
            key: 'asteroide',
            repeat: 14,
            setXY: { x: 0, y: 10, stepY: 30 }
        });

        /* Con esta iteracion (recorro el arreglo de los asteroides) defino las propiedades */
        asteroids.children.iterate(function (child) {
            child.setScale(.125);/* escala */
            child.setVelocityX(Phaser.Math.FloatBetween(360,560));/* Velocidad randon para que cada una sea diferentes */
            child.setBounce(1);/* Revote con la misma fuerza */
            child.setCollideWorldBounds(true);/* Que no salgan de los limites del juego */

        });

        
        var scoreText;/* variable que muestra el texto */
        scoreText = this.add.text(35, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
        /* posicion, texto,tamano, color */


        /* Nave */
        ship = this.physics.add.image(100,500,'ship');/* Posicion e imagen  */
        ship.setScale(.2);/* Escalas */
        ship.setCollideWorldBounds(true);/* No sale de los limites */
        ship.setGravityY(200);/* Gravedad para que este abajo siempre */
        console.log(asteroids);
        
        balas = this.physics.add.group();/* Creo un grupo de n Balas */
        
        /* con este creo las balas al disparar en tiempo de ejecución  */
        function disparar(){
            var bala  = balas.create(ship.x+40,ship.y,'laser');/* doy la posición de la bala1 */
            bala.setScale(.3);/* escala de la bala */
            bala.setVelocityY(-700);/* Velocidad inicial de las balas */
            bala.setGravityY(-800);/* si choca con algo la bala seguira subiendo con esta propeidad */
            /* Bala gemela solo cambia la posición  */
            var balaA = balas.create(ship.x-40,ship.y,'laser');
            balaA.setScale(.3);
            bala.setGravityY(-800);
            balaA.setVelocityY(-700);
        }

        this.physics.add.collider(asteroids,ship);/* Creo coliscion por si las dudas con la nave */
        this.physics.add.overlap(balas,asteroids,collectAsteroid,null,this);/* Cuando las balas tocan el asteroide este se borra */
        this.physics.add.collider(asteroids,asteroids);/* que choquen entre ellos mismo */

        function collectAsteroid(bala,asteroid){
            asteroid.disableBody(true, true);/* borro el meteoro */
            puntos += 10;/* Sumo puntos por cada meteoro roto */
            scoreText.setText('Score: ' + puntos);/* Muestro los puntos */
        }


        /* Metodo con las teclas para mover la nave */
        /* cada vez que espicho una tecla esta mme asigna una correcta velocidad segun la direccion  */
        this.input.keyboard.on('keydown_RIGHT',()=>{
            ship.setVelocityX(200);
        });

        this.input.keyboard.on('keydown_LEFT',()=>{
            ship.setVelocityX(-200);
        });

        this.input.keyboard.on('keydown_SPACE',()=>{
            disparar();
        });

        this.cursor = this.input.keyboard.createCursorKeys();
    },

    update:function(){
        if(puntos ==150){/* cuando hay 150 se acaba el juego */
            this.scene.start('end');
        }
    }

});

