import * as Phaser from 'phaser';
import { cwd } from 'process';
import { timer } from 'rxjs';

export class Scene1 extends Phaser.Scene {
    // Pájaro.
    bird: Phaser.Physics.Arcade.Sprite;
    velBird: integer;
    
    // Globos.
    ballRed: Phaser.Physics.Arcade.Image;
    ballBlue: Phaser.Physics.Arcade.Image;
    ballGreen: Phaser.Physics.Arcade.Image;
    ballGold: Phaser.Physics.Arcade.Image;

    // Control de spawn de Globos por tipo.
    spawnHigh: integer;
    spawnMid: integer;
    spawnLow: integer;
    spawnGold: integer;
    
    // Puntuación.
    score: integer;
    textScore: Phaser.GameObjects.Text;

    // Timeout.
    timmer: Phaser.GameObjects.Text;
    timeLeft: integer;
    timeEvent;

    // Game over.
    gameOver: Phaser.GameObjects.Text;

    constructor(){
        super('scene1');
    }

    preload()
    {
        // Jugador.
        this.load.spritesheet('bird', 'assets/images/birdsprite.png', {
            frameWidth: 35,
            frameHeight: 33
        });

        // Botones.
        this.load.image('but-right', 'assets/images/arrow-right.png');
        this.load.image('but-left', 'assets/images/arrow-left.png');

        // Globos.
        this.load.image('ballRed', 'assets/images/balloon-red.png');
        this.load.image('ballBlue', 'assets/images/balloon-blue.png');
        this.load.image('ballGreen', 'assets/images/balloon-green.png');
        this.load.image('ballGold', 'assets/images/balloon-star.png');
    }

    create(){
        // Se crea el jugador con physicas centrado en el medio de la pantalla y con su velocidad predeterminada.
        this.bird = this.physics.add.sprite(innerWidth/2, innerHeight/2, 'bird');
        this.velBird = 200;

        // Este y el segundo párrafo crea animaciones de volar a la derecha e izquierda.
        this.anims.create({
            key: 'fly-right',
            frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 13}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'fly-left',
            frames: this.anims.generateFrameNumbers('bird', { start: 14, end: 27}),
            frameRate: 10,
            repeat: -1
        });
        
        // Activa animación volar a la derecha.
        this.bird.anims.play('fly-right', true);
        //this.bird.setVelocityX(this.velBird);

        // Botones.
        let butRight = this.add.image(360, 800, 'but-right').setInteractive();
        let butLeft = this.add.image(30, 800, 'but-left').setInteractive();

        // Interacciones con botones.
        butLeft.on('pointerdown', function(){
            this.bird.anims.play('fly-left', true);
            this.bird.setVelocityX(-this.velBird);
            //this.bird.setVelocityY(-52);
        }, this);

        butRight.on('pointerdown', function(){
            this.bird.anims.play('fly-right', true);
            this.bird.setVelocityX(this.velBird);
            //this.bird.setVelocityY(-52);
        }, this);

        butLeft.on('pointerup', function(){
            this.bird.anims.play('fly-left', true);
            this.bird.setVelocityX(0);
            this.bird.setVelocityY(0);
        }, this);

        butRight.on('pointerup', function(){
            this.bird.anims.play('fly-right', true);
            this.bird.setVelocityX(0);
            this.bird.setVelocityY(0);
        }, this);
     
        // Establecemos los valores de respawn, sin estos no nuynca saldrían globos.
        this.spawnHigh = 0;
        this.spawnMid = 0;
        this.spawnLow = 0;       
        this.spawnGold = 0;       
        
        // inicializamos puntuación.
        this.data.set('higherScore', 0);
        this.score = 0;
        //this.score = Number(localStorage.getItem('higherScore'));
        const scoreText = this.add.text(10, 10, "Score: ");
        this.textScore = this.add.text(73, 10, "0");        
        this.textScore.setText(String(this.score));

        // Temporizador.        
        this.timeLeft = 300;
        this.timmer = this.add.text(10, 25, "Cuenta atrás: " + String(this.timeLeft));
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.onEvent,
            callbackScope: this,
            repeat: this.timeLeft - 1
        });

        // Game over text.
        this.gameOver = this.add.text(innerWidth/2, innerHeight/2, "");
    }    

    onEvent(){
        console.log("Restando segundos al timeLeft...");
        this.timeLeft--;
        this.timmer.setText("Cuenta atrás: " + String(this.timeLeft));
        
        if (this.timeLeft == 0){
            console.log("El tiempo ha llegado a 0");
            this.gameOver.setText("Game over");
            setTimeout(() => {
                console.log("Ejecutando timeout para cambiar de Scene");
                this.scene.start("scene2");
            }, 3000);
        }
    }

    // Funciones que controlan los globos petados
    petarGloboRed(ball){
        this.score += 3;
        this.textScore.setText(String(this.score));
        console.log("He petado un globo rojo: 3p");
        console.log("Tienes un total de: ", this.score, " puntos");
        ball.destroy();

        if (Number(localStorage.getItem('higherScore')) < this.score ) localStorage.setItem('higherScore', String(this.score));
    }

    petarGloboBlue(ball){
        this.score += 10;
        this.textScore.setText(String(this.score));
        console.log("He petado un globo azul: 10p");
        console.log("Tienes un total de: ", this.score, " puntos");
        ball.destroy();

        if (Number(localStorage.getItem('higherScore')) < this.score ) localStorage.setItem('higherScore', String(this.score));
    }

    petarGloboGreen(ball){        
        this.score += 50;
        this.textScore.setText(String(this.score));
        console.log("He petado un globo verde: 50p");
        console.log("Tienes un total de: ", this.score, " puntos");
        ball.destroy();

        if (Number(localStorage.getItem('higherScore')) < this.score ) localStorage.setItem('higherScore', String(this.score));
    }

    petarGloboGold(ball){        
        this.velBird *= 2;
        console.log("He petado un globo dorado: estoy a tope!");
        console.log("Tienes un total de: ", this.score, " puntos");
        ball.destroy();

        setTimeout(()=>{
            this.velBird /= 2;
            console.log("Ya se me ha pasado el subidón");
        }, 3000);
    }
    
    update() {                
        // Settea el tiempo restante.
        //this.timmer.setText(this.timeEvent.getProgress().toString().substr(0, 4));

        // Mantiene el pájaro dentro de los límites.
        if (this.bird.x >= 370 || this.bird.x <= 16) {
            this.bird.setVelocityX(0);
            //this.bird.anims.stop(); si el pájaro se queda quito y no cae no tiene sentido.
        }

        // Esto es para añadir movidas randoms que no deberían estar, a la vez controla límites del pájaro.
        if (this.bird.y <=0) this.bird.setVelocityY(500);
        if (this.bird.y >=800) this.bird.setVelocityY(-500);    
        
        // Control de cantidad de Globos creados por tipo.
        this.spawnHigh++;

        if (this.spawnHigh == 300){            
            this.spawnHigh = 0;

            // Creación del balón ligado a una función overlap para cada balón creado.
            this.ballRed = this.physics.add.image(Math.random() * (360 - 30) + 30, 900, 'ballRed').setInteractive();
            this.ballRed.setVelocityY(-150);        
            this.physics.add.overlap(this.ballRed, this.bird, this.petarGloboRed, null, this);

            this.spawnMid++;
            
            if (this.spawnMid == 2){
                this.spawnMid = 0;
                
                this.ballBlue = this.physics.add.image(Math.random() * (360 - 30) + 30, 900, 'ballBlue').setInteractive();
                this.ballBlue.setVelocityY(-220);
                this.physics.add.overlap(this.ballBlue, this.bird, this.petarGloboBlue, null, this);

                this.spawnLow++;

                if(this.spawnLow == 3){
                    this.spawnLow = 0;

                    this.ballGreen = this.physics.add.image(Math.random() * (360 - 30) + 30, 1000, 'ballGreen').setInteractive();
                    this.ballGreen.setVelocityY(-330);                    
                    this.physics.add.overlap(this.ballGreen, this.bird, this.petarGloboGreen, null, this);

                    this.spawnGold++;

                    if(this.spawnGold == 2) {
                        console.log("Estoy generando un globo dorado");
                        this.spawnGold = 0;

                        this.ballGold = this.physics.add.image(Math.random() * (360 - 30) + 30, 1000, 'ballGold').setInteractive();
                        this.ballGold.setVelocityY(-360);                    
                        this.physics.add.overlap(this.ballGold, this.bird, this.petarGloboGold, null, this);
                    }
                }
            }

        }     
        
    }
}