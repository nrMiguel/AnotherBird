import * as Phaser from 'phaser';
import { Scene1 } from './Scene1';

export class Scene0 extends Phaser.Scene { 
    
    constructor(){
        super('scene0');
    }
    
    preload()
    {
        // Logo.
        this.load.image('logo', 'assets/images/logo.png');
    }    

    create()
    {      
        // Se crea un título, se carga el logo y se crea un texto con función para ir a la segunda Scene.  
        const titleGame = this.add.text(0, 0, "Another bird");
        const logo = this.add.image(0, 0, 'logo');
        let textPlay = this.add.text(0, 0, "Play game (click me!)").setInteractive();

        // Para centrar objetos.
        Phaser.Display.Align.In.Center(titleGame, this.add.zone(200, 100, 800, 600));
        Phaser.Display.Align.In.Center(logo, this.add.zone(200, 250, 800, 600));
        Phaser.Display.Align.In.Center(textPlay, this.add.zone(200, 400, 800, 600));

        // Función para cambiar de Scene.
        textPlay.on('pointerdown', function(){
            this.scene.start('scene1');
        }, this)

    }


}