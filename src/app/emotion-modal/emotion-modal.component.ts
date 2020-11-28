import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { FacialEmotionsService } from '../services/facial-emotions.service';
@Component({
  selector: 'emotion-modal',
  templateUrl: './emotion-modal.component.html',
  styleUrls: ['./emotion-modal.component.css']
})
export class EmotionModalComponent implements OnInit {

  @ViewChild('video', { static: true }) videoElement: ElementRef;
  // static connectCamera: boolean = true; //have it connected by default (refactor to use global state in NgRx later)
  cameraConnected: boolean;

  constructor(
    private renderer: Renderer2, 
    private cameraService: CameraService,
    private facialEmotionsService: FacialEmotionsService) { }
  
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
    let temp = this.facialEmotionsService.getFacialEmotions()
      .subscribe(response => {
        console.log(response);
      });
    console.log(temp);
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
