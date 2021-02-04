import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  constructor(
    private backend: BackendService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    var url = 'https://accounts.spotify.com/authorize?client_id=ce5b366904544b58beb4a235b44ffc6c' + 
    '&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallback%2F' + 
    '&scope=user-read-playback-state+user-modify-playback-state+streaming+user-read-email' + 
    '+user-read-private+playlist-modify-private+playlist-modify-public';

    window.open(url, '_self');
  }

  async onClick() {
    this.login();
    // this.backend.getLogin()
    // .subscribe(response => {
    //   let popup = window.open(response.url, "_blank");
    //   setTimeout(() => {
    //     popup.close();
    //   }, 2000); // close after successful login instead of 2s
    //   // navigate to connect page without reloading
    //   console.log(popup);
    //   this.router.navigate(['/connect']);
    // }); 
    // // call BE to get additional info
    // this.backend.getRoomId(); 
  }

}
