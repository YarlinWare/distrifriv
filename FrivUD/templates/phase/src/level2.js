var puntaje = 0;
var level2  = new Phaser.Class({/* Instancio objeto de una clase */

    Extends: Phaser.Scene,initialize:/* Hereda de escena de phaser */

    function level2(){
        Phaser.Scene.call(this,{key:'level2'});/* Creo el constructor */
    },
    
    preload:function(){
        /* cargo en cache las imagenes de los elementos */
        this.load.image('fondo','resources/fondo.jpg');
        this.load.image('stone','resources/stone.png');
        this.load.image('star', 'resources/star.png');
        this.load.image('stoneA','resources/stoneA.png');
        this.load.image('stoneB','resources/stoneB.png');
        this.load.image('nave','resources/purple.png');

        this.load.spritesheet('dude', 
            '../resources/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    },

    create:function(){
        this.add.image(400,600,'fondo');
        this.add.image(260,50,'nave').setScale(.2);
        
        stone = this.physics.add.staticGroup();
        stone.create(-28,579,'stone').setScale(.5).refreshBody();
        stone.create(29,579,'stone').setScale(.5).refreshBody();
        stone.create(86,579,'stone').setScale(.5).refreshBody();
        stone.create(143,579,'stone').setScale(.5).refreshBody();
        stone.create(200,579,'stone').setScale(.5).refreshBody();
        stone.create(257,579,'stone').setScale(.5).refreshBody();
        stone.create(314,579,'stone').setScale(.5).refreshBody();
        stone.create(371,579,'stone').setScale(.5).refreshBody();
        stone.create(428,579,'stone').setScale(.5).refreshBody();
        stone.create(485,579,'stone').setScale(.5).refreshBody();
        stone.create(542,579,'stone').setScale(.5).refreshBody();
        stone.create(599,579,'stone').setScale(.5).refreshBody();
        stone.create(656,579,'stone').setScale(.5).refreshBody();
        stone.create(713,579,'stone').setScale(.5).refreshBody();
        stone.create(770,579,'stone').setScale(.5).refreshBody();
        stone.create(827,579,'stone').setScale(.5).refreshBody();
        stone.create(884,579,'stone').setScale(.5).refreshBody();
        stone.create(-28,470,'stone').setScale(.5).refreshBody();
        stone.create(29,470,'stone').setScale(.5).refreshBody();
        stone.create(86,470,'stone').setScale(.5).refreshBody();
        stone.create(143,470,'stone').setScale(.5).refreshBody();
        stone.create(29,362,'stoneA').setScale(.5).refreshBody();
        stone.create(86,362,'stone').setScale(.5).refreshBody();
        stone.create(143,362,'stone').setScale(.5).refreshBody();
        stone.create(200,362,'stone').setScale(.5).refreshBody();
        stone.create(257,362,'stone').setScale(.5).refreshBody();
        stone.create(314,362,'stone').setScale(.5).refreshBody();
        stone.create(371,362,'stone').setScale(.5).refreshBody();
        stone.create(480,362,'stone').setScale(.5).refreshBody();
        stone.create(536,362,'stone').setScale(.5).refreshBody();
        stone.create(592,362,'stone').setScale(.5).refreshBody();
        stone.create(648,362,'stone').setScale(.5).refreshBody();
        stone.create(704,362,'stone').setScale(.5).refreshBody();
        stone.create(760,362,'stoneB').setScale(.5).refreshBody();
        stone.create(428,470,'stone').setScale(.5).refreshBody();
        stone.create(485,470,'stone').setScale(.5).refreshBody();
        stone.create(542,470,'stone').setScale(.5).refreshBody();
        stone.create(599,470,'stone').setScale(.5).refreshBody();
        stone.create(656,470,'stone').setScale(.5).refreshBody();
        stone.create(713,470,'stone').setScale(.5).refreshBody();
        stone.create(770,470,'stone').setScale(.5).refreshBody();
        stone.create(827,470,'stone').setScale(.5).refreshBody();
        stone.create(29,200,'stone').setScale(.5).refreshBody();
        stone.create(780,200,'stone').setScale(.5).refreshBody();
        stone.create(2,100,'stone').setScale(.5).refreshBody();
        stone.create(244,100,'stone').setScale(.5).refreshBody();
        stone.create(300,100,'stone').setScale(.5).refreshBody();
        stone.create(580,100,'stone').setScale(.5).refreshBody();
        stone.create(800,120,'stone').setScale(.5).refreshBody();
        stone.create(700,-15,'stone').setScale(.5).refreshBody();
        stone.create(600,250,'stone').setScale(.5).refreshBody();

        star = this.physics.add.group();
        star.create(50,100,'star');
        star.create(80,200,'star');
        star.create(90,300,'star');
        star.create(50,530,'star');
        star.create(250,530,'star');
        star.create(300,530,'star');
        star.create(400,530,'star');
        star.create(690,530,'star');
        star.create(650,530,'star');
        star.create(50,100,'star');
        star.create(50,300,'star');
        star.create(50,420,'star');
        star.create(400,420,'star');
        star.create(500,420,'star');
        star.create(600,420,'star');
        star.create(700,420,'star');
        star.create(700,320,'star');
        star.create(600,320,'star');
        star.create(500,320,'star');
        star.create(400,320,'star');
        star.create(300,320,'star');
        star.create(100,320,'star');
        star.create(200,320,'star');
        star.create(600,200,'star');
        star.create(200,320,'star');
        star.create(760,160,'star');
        star.create(780,70,'star');
        star.create(580,50,'star');
        star.create(20,50,'star');
        star.create(100,50,'star');

        stoneFloats = this.physics.add.group({
            key:'stone',
            repeat:3,
            setXY: { x: 0, y: 30, stepY: 70 }
        });
        stoneFloats.create(29,300,'stone');
        stoneFloats.children.iterate(function (child) {
            child.setScale(.5);
            child.setVelocityX(Phaser.Math.FloatBetween(60,200));
            child.setBounceX(1);
            child.setBounceY(0);
            child.setCollideWorldBounds(true);
        });

        player = this.physics.add.sprite(60, 500, 'dude');
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        player.body.setGravityY(300);

        var scoreText;
        scoreText = this.add.text(350, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.overlap(player,star,collectStar,null,this);

        function collectStar (player, star){
            star.disableBody(true, true);
            puntaje += 10;
            scoreText.setText('Score: ' + puntaje);
        }

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(player,stone);
        this.physics.add.collider(player,stoneFloats);
        this.physics.add.collider(stone,stoneFloats);
        this.physics.add.collider(stoneFloats,stoneFloats);

        cursors = this.input.keyboard.createCursorKeys();
    },

    update:function(time,delta){
        
        if (cursors.left.isDown){
            player.setVelocityX(-160);
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

        if(puntaje == 300){
            this.scene.start('level3');
        }
    }

});