import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Camera, FacialEmotions } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private cameraState: Camera = {
    cameraConnected: false,
    imageUrl: undefined
  }

  @Output() connectClicked = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  getCameraState(): Camera {
    return this.cameraState;
  }

  updateCameraConnected(payload: boolean): void {
    this.cameraState.cameraConnected = payload;
  }

  updateImageUrl(payload: string): void {
    this.cameraState.imageUrl = payload;
  }

  connectCameraClicked() {
    this.updateCameraConnected(true);
    this.connectClicked.emit(true);
  }
}
