import { Component, OnInit } from '@angular/core';
import { Room } from '../models';
import { BackendService } from '../services/backend.service';
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
  roomInfo: Room;
  
  constructor(
    private musicService: MusicService,
    private backend: BackendService) { }

  ngOnInit(): void {
    // this.getAlbumArt()
    
    this.roomInfo = this.backend.getRoomInfo();
    // once FE receives room info, stop loading
    if (this.roomInfo.userId != null) {
      this.loading = false;
    }

  }

  async getAlbumArt() {
    this.currentAlbumArt = this.musicService.getCurrentlyPlaying();
    console.log(this.currentAlbumArt)
  }

}
