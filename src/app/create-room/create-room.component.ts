import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  constructor(private room: RoomService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.room.getRoomId(); // add BE call
    // after successful login, we should auto join the room and navigate user to main page
  }

}
