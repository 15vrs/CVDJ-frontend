import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private room: RoomService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.room.getUserId();
  }

}
