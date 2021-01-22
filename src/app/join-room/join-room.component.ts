import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.backend.getUserId(); // add BE call
  }

}
