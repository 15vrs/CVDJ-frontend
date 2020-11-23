import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
@Component({
  selector: 'emotion-modal',
  templateUrl: './emotion-modal.component.html',
  styleUrls: ['./emotion-modal.component.css']
})
export class EmotionModalComponent implements OnInit {

  @ViewChild('video', { static: true }) videoElement: ElementRef;
  static connectCamera: boolean = true; //have it connected by default (refactor to use global state in NgRx later)
  
  constructor(private renderer: Renderer2) { }
  
  ngOnInit(): void {
    if (EmotionModalComponent.connectCamera) {
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
  
  startCamera() {
    EmotionModalComponent.connectCamera = true;
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
