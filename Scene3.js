class Scene3 extends Phaser.Scene {
    constructor() {
      super("creditos");
    }

    preload ()
    {
      this.load.image('logo2D', 'assets/logo2D.png');
      this.load.image('fin', 'assets/fin.png')   
    }
    
    create() {
      if (cursors != undefined)
      //intento de solucionar bug de escena de puntaje
      //if (emitOnRepeat === undefined) { emitOnRepeat = false; };
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      //sin solucionar bug luego de visualizar por primera vez pantalla puntaje. 
      //keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R.setEmitOnRepeat());
      
      //this.input.keyboard.enabled = false
    
    
      this.add.image(400, 300, 'sky');
      this.add.image(400, 568, 'ground').setScale(2)
      
      //this.add.image(400, 100, 'logo2D');
      
       this.add.image(400, 100, 'fin')


      var puntajefinal = this.add.text(0, 0, 'Tu puntaje final es: ' + score,  { fontFamily: 'Arial', fontSize: 70, color: '#000000' });
      
      //scene.add.zone(x, y, width, height)
        // X Y del centro del rectangulo invisible
        // width, height del rectangulo invisible
      Phaser.Display.Align.In.Center(puntajefinal, this.add.zone(400, 300, 800, 600));



      var restartButton = this.add.text(210, 150, 'Perdiste en el nivel ' + level, { fontFamily: 'Arial', fontSize: 40, color: '#ff0000' })

      //.setInteractive()
      //.on('pointerdown', () => this.reiniciar() );
      var pressr = this.add.text(180, 550, 'Presiona R para reiniciar', {fontFamily: 'Times New Roman', fontSize: 40});
    }
    
    update(){
      //cambio de escena logrado con bug
      if (keyR.isDown){ 
        this.scene.start('juego');
    }
  }
}
