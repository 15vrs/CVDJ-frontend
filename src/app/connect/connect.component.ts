import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'connect-webcam',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  @Output() connectClick = new EventEmitter<boolean>();
  cameraConnected: boolean;
  
  constructor(
    private cameraService: CameraService,
    private router: Router) { }
  
  ngOnInit(): void {
    this.cameraConnected = this.cameraService.getCameraState().cameraConnected;
  }
  
  onClick() {
    this.cameraService.connectCameraClicked();
    this.cameraConnected = true;
    interval(3000).subscribe(() => {
      this.router.navigate(["/main"]);
    });
  }

}
