import { Scene0 } from './scenes/Scene0';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Component } from '@angular/core';
import * as Phaser from "phaser";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  game: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#40CFFF',
      parent: 'game',
      scene: [Scene0, Scene1, Scene2],
      physics: {
        default: 'arcade',
        arcade:{
          //gravity: {y: 20},
        }
      }
    };
  }

  ngOnInit(): void{
    this.game=new Phaser.Game(this.config);
  }
}
