import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

declare global {
  interface window {
    onSpotifyWebPlaybackSDKReady: () => void;
    spotifyReady: Promise<void>;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private backend: BackendService) { }

  addSpotifyPlaybackSdk() {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = this.backend.getAccessToken();
      const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
      });
    
      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });
    
      // Playback status updates
      player.addListener('player_state_changed', state => { 
        // console.log(state);
        console.log(this.backend.getRoomInfo());
      });
    
      // Ready
      player.addListener('ready', ({ device_id }) => {
        // console.log('Ready with Device ID', device_id);
        this.backend.setSpotifyDevices(device_id)
      });
    
      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
    
      // Connect to the player!
      player.connect();
    };

    // async function waitForSpotifyWebPlaybackSDKToLoad () {
    //   return new Promise(resolve => {
    //     if (window.Spotify) {
    //       resolve(window.Spotify);
    //     } else {
    //       window.onSpotifyWebPlaybackSDKReady = () => {
    //         const player = new Spotify.Player({
    //           name: 'Web Playback SDK Quick Start Player',
    //           getOAuthToken: cb => { cb(token); }
    //         });
  
    //         // Error handling
    //         player.addListener('initialization_error', ({ message }) => { console.error(message); });
    //         player.addListener('authentication_error', ({ message }) => { console.error(message); });
    //         player.addListener('account_error', ({ message }) => { console.error(message); });
    //         player.addListener('playback_error', ({ message }) => { console.error(message); });
  
    //         // Playback status updates
    //         player.addListener('player_state_changed', state => { 
    //           console.log(state); 
    //           // console.log(this.backend.getRoomInfo());
    //         });
  
    //         // Ready
    //         player.addListener('ready', ({ device_id }) => {
    //           console.log('Ready with Device ID', device_id);
    //         });
  
    //         // Not Ready
    //         player.addListener('not_ready', ({ device_id }) => {
    //           console.log('Device ID has gone offline', device_id);
    //         });
  
    //         // Connect to the player!
    //         player.connect();
    //       };
    //     }
    //   });
    // };
    // (async () => {
    //   const { } = await waitForSpotifyWebPlaybackSDKToLoad();
    //   console.log("The Web Playback SDK has loaded.");
    // })();
  }
}
