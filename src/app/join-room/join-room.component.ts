import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  constructor(private room: RoomService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.room.getUserId();
  }

}
