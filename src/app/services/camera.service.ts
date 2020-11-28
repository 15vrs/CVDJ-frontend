import { Injectable } from '@angular/core';
import { Camera } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private cameraState: Camera = {
    cameraConnected: false
  }

  constructor() { }

  getCameraState(): Camera {
    return this.cameraState;
  }

  updateCameraState(state: Camera): void {
    this.cameraState = state;
  }

  updateCameraConnected(payload: boolean): void {
    this.cameraState.cameraConnected = payload;

  }
}
