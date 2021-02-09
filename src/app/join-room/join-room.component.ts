import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  error: boolean = false;

  constructor(
    private backend: BackendService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onClick(roomId: string) {
    this.backend.getJoinRoom(roomId);
    this.router.navigate(["/connect"]);
    // .subscribe(
    //   response => {
    //     this.backend.setRoomId(roomId);
    //     this.backend.setUserId(response.body.userId);
    //     this.backend.setPlaylistUri(response.body.playlistUri);
    //     this.router.navigate(["/connect"]);
    //   },
    //   error => {
    //     if (error.status >= 400) {
    //       this.error = true;
    //     }
    //   }
    // );
  }

}
