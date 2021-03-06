import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {

  constructor() { }

  encodeUrlData(data) {
    const ret = [];
    for (const d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
  }

  login() {
    const urlData = {
      client_id: 'ce5b366904544b58beb4a235b44ffc6c',
      response_type: 'code',
      redirect_uri: window.location.origin + '/callback/',
      scope: 'user-read-playback-state user-modify-playback-state streaming user-read-email user-read-private playlist-modify-private playlist-modify-public user-read-recently-played'
    }
    const url = 'https://accounts.spotify.com/authorize?' + this.encodeUrlData(urlData);
    window.open(url, '_self');
  }

}
