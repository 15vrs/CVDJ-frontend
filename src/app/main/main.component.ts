import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loading: boolean = true;
  description: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  currentAlbumArt: string;
  
  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.getAlbumArt()
  }

  async getAlbumArt() {
    this.currentAlbumArt = this.musicService.getCurrentlyPlaying();
    console.log(this.currentAlbumArt)
  }

}
