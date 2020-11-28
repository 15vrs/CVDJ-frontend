import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Camera } from '../models';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'connect-webcam',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  cameraConnected: boolean;
  
  constructor(private renderer: Renderer2, private cameraService: CameraService) { }
  
  ngOnInit(): void {
    this.getCameraState();
    if (this.cameraConnected) {
      this.startCamera();
    }
  }

  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  };

  getCameraState(): void {
    this.cameraConnected = this.cameraService.getCameraState().cameraConnected;
  }
  
  startCamera() {
    this.cameraService.updateCameraConnected(true);
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { 
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }
  
  handleError(error) {
    console.log('Error: ', error);
  }
  
  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
  }
  
}
