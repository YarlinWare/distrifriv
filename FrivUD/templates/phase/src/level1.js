var score = 0;/* Defino esta variable para los puntos y cambiar de escena  */
var level1 = new Phaser.Class({/* Instancia una clase que hereda de escenas de phaser */

    Extends: Phaser.Scene,initialize:

    function level1(){
        /* Creo el constructor */
        Phaser.Scene.call(this,{key:'level1'});/* Defino el nombre clave como se llamaran los objetos de la clase */
    },
    preload:function(){

        /* Cargo las imagenes de los elementos en cache */
        this.load.image('ice','resources/ice.png');/* Nombre y ruta */
        this.load.image('iceCorner','resources/iceCorner.png');
        this.load.image('iceCornerB','resources/iceCornerB.png');   
        this.load.image('hielo','resources/hielo.png');

        this.load.image('sky', 'resources/sky.png');
        this.load.image('star', 'resources/star.png');

        /* Cargo el sprite del personaje */
        this.load.spritesheet('dude', 
            'resources/dude.png',/* Ruta y tamaño */
            { frameWidth: 32, frameHeight: 48 }
        );
    },

    create:function(){

        this.add.image(400,300,'sky');/* Cargo el fondo */
        console.log(game.scene);/* Imprimo en consola */

        /*  las siguientes lineas crean un grupo con fisica pre definidas para los cubos de las plataformas
        donde defino la posición y la escala además se refesca el cuerpo del elemento*/ 
        ice = this.physics.add.staticGroup();        
        ice.create(-29,565,'ice').setScale(.5).refreshBody();
        ice.create(37,565,'ice').setScale(.5).refreshBody();
        ice.create(103,565,'ice').setScale(.5).refreshBody();
        ice.create(169,565,'ice').setScale(.5).refreshBody();
        ice.create(235,565,'ice').setScale(.5).refreshBody();
        ice.create(301,565,'ice').setScale(.5).refreshBody();
        ice.create(367,565,'ice').setScale(.5).refreshBody();
        ice.create(433,565,'ice').setScale(.5).refreshBody();
        ice.create(499,565,'ice').setScale(.5).refreshBody();
        ice.create(565,565,'ice').setScale(.5).refreshBody();
        ice.create(631,565,'ice').setScale(.5).refreshBody();
        ice.create(697,565,'ice').setScale(.5).refreshBody();
        ice.create(763,565,'ice').setScale(.5).refreshBody();
        ice.create(829,565,'ice').setScale(.5).refreshBody();
        ice.create(-29,430,'iceCorner').setScale(.5).refreshBody();
        ice.create(37,430,'iceCorner').setScale(.5).refreshBody();
        ice.create(103,430,'ice').setScale(.5).refreshBody();
        ice.create(169,430,'ice').setScale(.5).refreshBody();
        ice.create(235,430,'ice').setScale(.5).refreshBody();
        /* ice.create(301,430,'ice').setScale(.5).refreshBody(); */
        ice.create(433 ,361,'hielo').setScale(.5).refreshBody();
        ice.create(367,430,'ice').setScale(.5).refreshBody();
        ice.create(433,430,'ice').setScale(.5).refreshBody();
        ice.create(499,430,'ice').setScale(.5).refreshBody();
        ice.create(565,430,'ice').setScale(.5).refreshBody();
        ice.create(631,430,'iceCornerB').setScale(.5).refreshBody();
        ice.create(-29,295,'ice').setScale(.5).refreshBody();
        ice.create(37,295,'ice').setScale(.5).refreshBody();
        ice.create(103,295,'ice').setScale(.5).refreshBody();
        ice.create(238,299,'ice').setScale(.5).refreshBody();
        ice.create(304,299,'ice').setScale(.5).refreshBody();
        ice.create(561,299,'ice').setScale(.5).refreshBody();
        ice.create(627,299,'ice').setScale(.5).refreshBody();
        ice.create(693,299,'ice').setScale(.5).refreshBody();
        ice.create(759,299,'ice').setScale(.5).refreshBody();
        ice.create(825,299,'ice').setScale(.5).refreshBody();
        ice.create(-29,163,'ice').setScale(.5).refreshBody();
        ice.create(37,163,'ice').setScale(.5).refreshBody();
        ice.create(103,163,'ice').setScale(.5).refreshBody();
        ice.create(238,163,'ice').setScale(.5).refreshBody();
        ice.create(304,163,'ice').setScale(.5).refreshBody();
        ice.create(370,163,'ice').setScale(.5).refreshBody();
        ice.create(436,163,'ice').setScale(.5).refreshBody();
        ice.create(502,163,'ice').setScale(.5).refreshBody();
        ice.create(630,170,'hielo').setScale(.5).refreshBody();
        ice.create(820,158,'ice').setScale(.5).refreshBody();

        /* Se crea de manera similar un grupo para las estrellas */
        star = this.physics.add.group();
        star.create(Phaser.Math.FloatBetween(37,500),100,'star').setScale(1);
        star.create(Phaser.Math.FloatBetween(37,500),240,'star').setScale(1);
        star.create(Phaser.Math.FloatBetween(37,820),500,'star').setScale(1);
        star.create(Phaser.Math.FloatBetween(37,820),500,'star').setScale(1);
        star.create(Phaser.Math.FloatBetween(37,820),500,'star').setScale(1);    
        star.create(Phaser.Math.FloatBetween(37,820),500,'star').setScale(1);
        star.create(Phaser.Math.FloatBetween(630,700),350,'star').setScale(1);
        star.create(Phaser.Math.FloatBetween(735,790),250,'star').setScale(1);
        star.create(Phaser.Math.FloatBetween(630,650),50,'star').setScale(1);
        star.create(Phaser.Math.FloatBetween(20,700),20,'star').setScale(1);

        var scoreText;/* Variable para mostrar el texto en pantalla */
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        /* posición/ texto, tamano y color */

        this.physics.add.collider(star, ice);/* Agrego coliccion entre las entrellas y el hielo */


        /* Las siguientes lineas muestran la creación del persona */
        player = this.physics.add.sprite(60, 500, 'dude');/* Defino el sprite y la posicion incial */
        player.setBounce(0);/* Que no halla reboto */
        player.setCollideWorldBounds(true);/* Que no salga de los limites de la pantalla */
        player.body.setGravityY(300);/* Una gravedad en Y para que sea atraido al suelo */

        this.physics.add.collider(player, ice);/* Creo una colision para las plataformas */

        cursors = this.input.keyboard.createCursorKeys();/* Añado metodos y eventos del cursos */
        this.physics.add.overlap(player,star,collectStar,null,this);/* Define que cuando halla colision entre personajes 
        y estrellas este desaparezca */

        function collectStar (player, star){
            star.disableBody(true, true);/* Se elimina el cuerpo osea ya no se ve */
            score += 10;/* sumo 10 puntos a lo que llevo */
            scoreText.setText('Score: ' + score);/* Muestro el nuevo puntaje */
        }

        this.anims.create({/* Define la animacion en posicion izquierda */
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({/* Crea la imagen para cuando el elemento estara quito  */
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({/* Crea la animación para cuando el personaje se mueve  */
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    },

    update:function(time,delta){/* Función que actuliza
        donde time es el tiempo en ejecución milisegundo y dellta la variación del cambio */
        

        /* Las siguientes lineas muestran como se mueve el jugador con las teclas activas  */
        if (cursors.left.isDown){
            player.setVelocityX(-160);/* Defino la velocidad a la izquierda */
            player.anims.play('left', true);
        }

        else if (cursors.right.isDown){
            player.setVelocityX(160);
            player.anims.play('right', true);
        }

        else{
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-290);
        }

        /* Cuando hallan 100 puntos inicia el nivel dos */
        if(score==100){
            this.scene.start('level2');
        }
    }
});
