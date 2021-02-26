import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
  }

  play() {
    this.backend.playMusic();
  }

  pause() {
    this.backend.pauseMusic();
  }

  skip() {
    this.backend.skipSong();
  }

  previous() {
    this.backend.previousSong();
  }

}
