import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css'],
  preserveWhitespaces: true
})
export class JoinRoomComponent implements OnInit {

  error: boolean = false;
  loading: boolean = false;

  constructor(
    private backend: BackendService,
    private router: Router) { }

  ngOnInit(): void {
  }

  submit(roomId: string) {
    this.loading = true;
    this.backend.getJoinRoom(roomId)
    .subscribe(
      response => {
        this.router.navigate(["/connect"]);
        this.backend.setRoomId(roomId);
        this.backend.setUserId(response.body.userId);
        this.backend.setPlaylistUri(response.body.playlistUri);
        this.backend.setAccessToken(response.body.accessToken);
      },
      error => {
        if (error.status >= 400) {
          this.error = true;
        }
      }
    );
  }

}
