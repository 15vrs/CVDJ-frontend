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
    this.backend.getLogin(); 
    // after successful login, we should auto join the room and navigate user to main page
  }

}
