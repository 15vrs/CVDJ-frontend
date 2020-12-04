import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Camera, FacialEmotions } from '../models';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private cameraState: Camera = {
    cameraConnected: false,
    imageUrl: undefined
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
    this.cameraState.imageUrl = blob;
    this.backend.putImageUrl(blob);
  }

  connectCameraClicked() {
    this.updateCameraConnected(true);
    this.connectClicked.emit(true);
  }
}
