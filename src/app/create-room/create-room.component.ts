import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.backend.getLogin()
    .subscribe(response => {
      let popup = window.open(response.url, "_blank")
      popup.addEventListener( "message", event => {
        console.log("popup", event)
      });
      setTimeout(() => {
        popup.close();
      }, 2000); // close after successful login instead of 2s
      this.backend.getRoomId();
    }); 
    // show loading spinner before calling the BE for more info and loading the main page
    // after successful login, we should auto join the room and navigate user to main page
  }

}
