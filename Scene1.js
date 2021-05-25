class Scene1 extends Phaser.Scene {
    constructor() {
      super('inicio');
    }

    preload ()
    {
      this.load.image('flechas', 'assets/flechas.png')
      this.load.image('logo', 'assets/logo.png');
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star1.png');
      this.load.image('bomb', 'assets/bomb.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.image('plataformaN', 'assets/blackplatform.png');
      this.load.audio('coin', 'assets/coin.mp3');     
    }

    create() {

      //crear boton para cambiar escena
      if (cursors =! undefined){
        cursors = this.input.keyboard.createCursorKeys();
        
        
    }

      //  Our player animations, turning, walking left and walking right.
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

      // var logo = this.add.image(400, 300, 'logo').setScale(0.26)
      // logo.setInteractive()
      // logo.on('pointerdown', () => this.scene.start('juego') );
      

      this.add.image(400, 300, 'flechas');
    

      
      // Funcion FLECHA
      // (param1, param2, …, paramN) => { sentencias }
      // (param1, param2, …, paramN) => expresion
      // Equivalente a: () => { return expresion; }
    }

    update(){

      //cambio de escena
      if (cursors.space.isDown)
        {
        this.scene.start('juego');
    }
}
}
