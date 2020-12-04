import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
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

  constructor(
    private renderer: Renderer2, 
    private cameraService: CameraService,) { }

  ngOnInit(): void {
    // display webcam on page first time
    this.cameraService.connectClicked
      .subscribe(event => {
        this.startCamera();
      })
    // when revisiting page, check if webcam was previously connected
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

  takeSnapshot(): void {
    const _video = this.videoElement.nativeElement;
    const dimensions = {width: 640, height: 480};
    if (_video.videoWidth) {
      dimensions.width = _video.videoWidth;
      dimensions.height = _video.videoHeight;
    }
    const _canvas = this.canvas.nativeElement;
     _canvas.width = dimensions.width;
    _canvas.height = dimensions.height;

    // paint snapshot image to canvas
    const context2d = _canvas.getContext('2d');
    context2d.drawImage(_video, 0, 0);

    // create blob to send to the backend
    _canvas.toBlob(blob => this.cameraService.updateImageUrl(blob),'image/jpeg', 0.92);

  }

}
