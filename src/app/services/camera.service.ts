import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Camera } from '../models';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private cameraState: Camera = {
    cameraConnected: false,
  }

  @Output() connectClicked = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private backend: BackendService) { }

  getCameraState(): Camera {
    return this.cameraState;
  }

  updateCameraConnected(payload: boolean): void {
    this.cameraState.cameraConnected = payload;
  }

  updateImageUrl(blob: Blob): void {
    this.backend.postImageUrl(blob);
  }

  connectCameraClicked() {
    this.updateCameraConnected(true);
    this.connectClicked.emit(true);
  }
}
