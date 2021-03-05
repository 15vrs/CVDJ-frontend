import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CameraService } from './camera.service';

describe('CameraService', () => {
  let service: CameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule ]
    });
    service = TestBed.inject(CameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('updateCameraConnected should change the cameraState', () => {
    service.updateCameraConnected(true);
    expect(service.getCameraState().cameraConnected).toEqual(true);
  });

  it('connectCameraClicked should change cameraConnected to true ', () => {
    service.connectCameraClicked();
    expect(service.getCameraState().cameraConnected).toEqual(true);
  });
});
