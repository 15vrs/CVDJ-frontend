import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {

    error: boolean = false;
  
    constructor(
        private backend: BackendService,
        private router: Router) { }

    ngOnInit(): void {
        this.backend.getTokens(window.location.search)
        .subscribe(
            response => {
                this.backend.setUserId(response.body);

                // Nested call to create room.
                this.backend.getCreateRoom(response.body)
                .subscribe(
                    response => {
                        this.backend.setRoomId(response.body.roomId);
                        this.backend.setPlaylistUri(response.body.playlistUri);
                        this.backend.setAccessToken(response.body.accessToken);
                        this.router.navigate(["/connect"]);
                    },
                    error => {
                        if (error.status >= 400) {
                        this.error = true;
                        }
                    }
                );
                // End of call to create new room.
            },
            error => {
                if (error.status >= 400) {
                    this.error = true;
                }
            }
        );
    }
}