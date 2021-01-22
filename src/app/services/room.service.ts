import { Injectable } from '@angular/core';
import { Room } from '../models';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
   roomState: Room = {
    userId: undefined
  }

  constructor(private backend: BackendService) { }

  getUserId() {
    // this.backend.getUserId()
    //   .subscribe(response => {
    //     this.roomState.userId = response;
    //   })
  }

  getRoomId() {
    // this.backend.getRoomId()
    // .subscribe(response => {
    //   this.roomState.roomId = response;
    // })
  }


}
