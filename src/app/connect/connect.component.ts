import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
// import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'connect-webcam',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  static connectCamera: boolean = false;
  
  constructor(private renderer: Renderer2) { }
  
  ngOnInit(): void {
    if (ConnectComponent.connectCamera) {
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
    ConnectComponent.connectCamera = true;
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
