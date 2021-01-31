import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Room } from '../models';
import { BackendService } from '../services/backend.service';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input() loading: boolean = true;
  description: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  currentAlbumArt: string;
  roomInfo: Room;
  baseUrl = "https://open.spotify.com/embed/playlist/";
  playlistUrl: SafeResourceUrl;
  
  constructor(
    private musicService: MusicService,
    private backend: BackendService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // this.getAlbumArt()

    this.roomInfo = this.backend.getRoomInfo();
    // once FE receives room info, stop loading
    if (this.roomInfo.userId != null) {
      this.loading = false;
      this.playlistUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + this.roomInfo.playlistUri);
    }
  }

  async getAlbumArt() {
    this.currentAlbumArt = this.musicService.getCurrentlyPlaying();
    console.log(this.currentAlbumArt)
  }

}
