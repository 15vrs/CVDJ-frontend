import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {

    error = false;

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
                    res => {
                        this.backend.setRoomId(res.body.roomId);
                        this.backend.setPlaylistUri(res.body.playlistUri);
                        this.backend.setAccessToken(res.body.accessToken);
                        this.router.navigate(['/connect']);
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