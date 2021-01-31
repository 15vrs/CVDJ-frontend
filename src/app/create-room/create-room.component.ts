import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  constructor(
    private backend: BackendService,
    private router: Router) { }

  ngOnInit(): void {
  }

 async onClick() {
    this.backend.getLogin()
    .subscribe(response => {
      let popup = window.open(response.url, "_blank");
      setTimeout(() => {
        popup.close();
      }, 2000); // close after successful login instead of 2s
      // navigate to connect page without reloading
      this.router.navigate(['/connect']);
    }); 
    // call BE to get additional info
    this.backend.getRoomId(); 
  }

}
