import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Music, Room } from '../models';
import { BackendService } from '../services/backend.service';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input() loading = true; // default to true so no access to random room; TODO router guards
  description: string;
  currentAlbumArt: string;
  roomInfo: Room;
  baseUrl = 'https://open.spotify.com/embed/playlist/';
  playlistUrl: SafeResourceUrl;
  songHistory: Music[];

  temp1 = {
    song: "golden",
    artist: "harry styles"
  };
  temp2 = {
    song: "starboy",
    artist: "the weeknd"
  }

  constructor(
    private musicService: MusicService,
    private backend: BackendService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.roomInfo = this.backend.getRoomInfo();
    // once FE receives room info, stop loading
    if (this.roomInfo.userId != null) {
      this.loading = false;
      this.playlistUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + this.roomInfo.playlistUri);

      this.musicService.addSpotifyPlaybackSdk();
    }

    this.backend.musicStateUpdated
      .subscribe(state => {
        this.currentAlbumArt = state.albumArt;
        this.description = state.song + ' by ' + state.artist;
      });

  }

  @HostListener('window:beforeunload', [ '$event' ])
  onBeforeUnload($event: any) {
    if (this.backend.getRoomInfo().roomId !== undefined ) {
      $event.returnValue = false;
      this.backend.postLeaveRoom();
    };
  }
}
