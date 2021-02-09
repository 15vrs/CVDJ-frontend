import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'user-camera',
  templateUrl: './user-camera.component.html',
  styleUrls: ['./user-camera.component.css']
})
export class UserCameraComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  cameraConnected: boolean;

  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  };

  constructor(
    private renderer: Renderer2, 
    private cameraService: CameraService,) { }

  ngOnInit(): void {
    // display webcam on page first time
    this.cameraService.connectClicked
      .subscribe(event => {
        this.getCameraState();
        this.startCamera();
        // take snapshots every 20s
        interval(15000).subscribe(() => {
          this.takeSnapshot();
        })
      })
    // when revisiting page, check if webcam was previously connected
    this.getCameraState();
    if (this.cameraConnected) {
      this.startCamera();
    }
  }

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

  handleError(error): void {
    console.log('Error: ', error);
  }
  
  attachVideo(stream): void {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
  }

  takeSnapshot() {
    const _video = this.videoElement.nativeElement;
    var _canvas = this.canvas.nativeElement;
    _canvas.width = _video.videoWidth ? _video.videoWidth : 640;
    _canvas.height = _video.videoHeight ? _video.videoHeight : 480; 

    // paint snapshot image to canvas

    _canvas.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);

    // create blob to send to the backend
    _canvas.toBlob(blob => this.cameraService.updateImageUrl(blob),'image/jpeg', 0.92);
  }
}
