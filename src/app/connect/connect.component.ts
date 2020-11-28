import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Camera } from '../models';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'connect-webcam',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  @Output() connectClick = new EventEmitter<boolean>();
  cameraConnected: boolean;
  
  constructor(private cameraService: CameraService) { }
  
  ngOnInit(): void {
    this.cameraConnected = this.cameraService.getCameraState().cameraConnected;
  }

  onClick() {
    this.cameraService.connectCameraClicked();
  }

}
