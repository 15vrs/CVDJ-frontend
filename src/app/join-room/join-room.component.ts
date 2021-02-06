import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  @ViewChild('errorAlert') errorAlert: ElementRef;
  error: boolean = false;
  options: NgbModalOptions = {
    centered: true,
    size: 'xl',
  }

  constructor(
    private backend: BackendService,
    private router: Router,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
  }

  onClick(roomId: string) {
    this.backend.getJoinRoom(roomId)
    .subscribe(response => {
        console.log("join room response", response);
        this.backend.setRoomId(roomId);
        this.backend.setUserId(response.body.userId);
        this.backend.setPlaylistUri(response.body.playlistUri);
        this.router.navigate(["/connect"]);
      },
        error => {
          console.log("join room error", error.status, error);
          if (error.status >= 400) {
            this.error = true;
            this.modalService.open(this.errorAlert, this.options);
            console.log("return error value", this.error);
          }
        });
  }

  modalClick() {
    this.modalService.dismissAll();
    this.router.navigate["/create"];
  }

}
