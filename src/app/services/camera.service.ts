import { EventEmitter, Injectable, Output } from '@angular/core';
import { Camera } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private cameraState: Camera = {
    cameraConnected: false,
    imageUrl: undefined
  }
  @Output() connectClicked = new EventEmitter<boolean>();

  constructor() { }

  getCameraState(): Camera {
    return this.cameraState;
  }

  updateCameraConnected(payload: boolean): void {
    this.cameraState.cameraConnected = payload;
  }

  connectCameraClicked() {
    this.updateCameraConnected(true);
    this.connectClicked.emit(true);

  }
}
