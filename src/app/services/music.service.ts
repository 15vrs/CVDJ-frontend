import { Injectable } from '@angular/core';
import { Music } from '../models';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private musicState: Music = {
    playing: false,
    currentlyPlaying: undefined,
    skipForward: false,
    skipBackward: false,
  };

  constructor(private backend: BackendService) { }

  getCurrentlyPlaying(): string {
    this.updateAlbumArt;
    return this.musicState.currentlyPlaying;
  }

  updateAlbumArt(): void {
    console.log("update album art music service")
    this.backend.getAlbumArt()
      .subscribe(response => {
        this.musicState.currentlyPlaying = response;
        console.log(response)
      })
  }
}
