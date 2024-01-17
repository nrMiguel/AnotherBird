import * as Phaser from 'phaser';

export class Scene2 extends Phaser.Scene {
    constructor(){
        super('scene2');
    }

    preload(){
        //this.load.image('logo', 'assets/logo.png'); Está totalmente copiado no es funcional!!
    }

    create(){
        this.add.text(innerWidth/2, innerHeight/2, "Record: " + localStorage.getItem('higherScore'));
    }
}