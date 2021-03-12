import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackendService } from '../services/backend.service';

@Component({
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit, OnDestroy {

    error = false;
    subscription: Subscription;

    constructor(
        private backend: BackendService,
        private router: Router) { }

    ngOnInit(): void {
        // Nested call to create room.
        this.subscription = this.backend.getCreateRoom(window.location.search, window.location.origin)
        .subscribe(
            res => {
                this.router.navigate(['/connect']);
                this.backend.setRoomId(res.body.roomId);
                this.backend.setUserId(res.body.userId);
                this.backend.setAccessToken(res.body.accessToken);
                this.backend.setPlaylistUri(res.body.playlistUri);
            },
            error => {
                if (error.status >= 400) {
                    this.error = true;
                }
            }
        );
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}