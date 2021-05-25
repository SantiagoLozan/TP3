class Scene2 extends Phaser.Scene {
    constructor() {
      super('juego');
    }
    preload(){
    
    this.load.audio('coin', 'assets/coin.mp3'); 
    }
    create ()
    {
    
        //sonido estrella
        this.beamSound= this.sound.add("coin");


        //  A simple background for our game
        this.add.image(400, 300, 'sky');
        
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();
       

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        
        //  Now let's create some ledges
        
        platforms.create(600, 450, 'ground');
        platforms.create(50, 350, 'ground');
        platforms.create(750, 280, 'ground');
        

        //plat movible.
        movingPlatform = this.physics.add.image(400, 150, 'ground').setScale(0.8);
        movingPlatform.setImmovable(true);
        movingPlatform.body.allowGravity = false;
        movingPlatform.setVelocityX(100);

        //bordes para que no se pierdan las estrellas
        platforms2 =  this.physics.add.image(800, 600, 'plataformaN').setDisplaySize(10, 1200);
        platforms3 =  this.physics.add.image(0, 600, 'plataformaN').setDisplaySize(5, 1200);
        platforms2.setImmovable(true);
        platforms2.body.allowGravity = false;
        platforms3.setImmovable(true);
        platforms3.body.allowGravity = false;
        
        

        
        
       // borde.rotation = 1.56;
        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(0.5);

        //  Input Events
        if (cursors =! undefined){
            cursors = this.input.keyboard.createCursorKeys();
            
        }
            

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 20, y: 0, stepX: 65 }
            
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            
            child.setBounceY(Phaser.Math.FloatBetween(1, 1));
            child.x += Phaser.Math.FloatBetween(-15, 15) 
            if (Phaser.Math.FloatBetween(0, 1) > 0.5){
                child.score = 15;
                child.setTint(0x001590);
            } 
            else
            {
                child.score = 10;
            }
            

        });
        
        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(20, 550, 'Puntuacion: 0', { fontFamily: 'Times New Roman', fontSize: '32px', fill: '#0004ff' });


        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms3);
        this.physics.add.collider(stars, platforms3);
        this.physics.add.collider(bombs, platforms3);
        this.physics.add.collider(player, platforms2);
        this.physics.add.collider(stars, platforms2);
        this.physics.add.collider(bombs, platforms2);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(stars, movingPlatform);
        this.physics.add.collider(player, movingPlatform);
        this.physics.add.collider(bombs, movingPlatform);
        
        


        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        // Inicializacion de variables.
        score = 0;
        gameOver = false;

        // Si no junta las estrellas en 30 segundas --> Game Over
        initialTime = 30
        //timedEvent = this.time.delayedCall(1000, this.onSecond, [], this, true);
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
        timeText = this.add.text(400, 20, '', {fontFamily: 'Times New Roman', fontSize: '32px', fill: '#ff0000' });

        this.jumps = 0;

        

    }

    update ()
    {
        if (gameOver)
        {     
            return 
            
        }
        //reinicio 
        if  (cursors.space.isDown){
            this.scene.resume();
            this.registry.destroy();
            this.events.off();
            this.scene.restart();
            score = 0;
        }

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-330);
        }
        if (movingPlatform.x >= 500)
    {
        movingPlatform.setVelocityX(-150);
    }
        else if (movingPlatform.x <= 300)
    {
        movingPlatform.setVelocityX(150);
    }
    
}
    collectStar (player, star)
    {
        star.disableBody(true, true);
        this.beamSound.play();

        //  Add and update the score
        score += star.score //10;
        scoreText.setText('Puntuacion: ' + score);

        if (stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

             
            // Cada ronda se suma un nivel y se le resta un segundo al tiempo inicial
            level += 1
            initialTime = 30 - level;
        }
    }


    hitBomb (player, bomb)
    {
        this.gameOver();
    }


    gameOver() {        
        gameOver = true;
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');        

        var gameOverButton = this.add.text(700, 500, 'Game Over. Haga Click aqui para finalizar', { fontFamily: 'Arial', fontSize: 24, color: '#ff0000' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('creditos'));
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600));    
    }
    
    onSecond() {
        if (! gameOver)
        {       
            initialTime = initialTime - 1; // One second
            timeText.setText( + initialTime);
            if (initialTime == 0) {
                timedEvent.paused = true;
                this.gameOver()
            }            
        }

    }



}