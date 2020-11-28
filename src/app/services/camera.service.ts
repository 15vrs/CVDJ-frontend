import { Injectable } from '@angular/core';
import { Camera } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private cameraState: Camera = {
    cameraConnected: false,
    imageUrl: undefined
  }

  constructor() { }

  getCameraState(): Camera {
    return this.cameraState;
  }

  updateCameraConnected(payload: boolean): void {
    this.cameraState.cameraConnected = payload;

  }
}
