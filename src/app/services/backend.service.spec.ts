import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendService } from './backend.service';
import { FacialEmotions } from '../models';

describe('BackendService', () => {
  let service: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule ]
    });
    service = TestBed.inject(BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getJoinRoom should return an Object', () => {
    expect(service.getJoinRoom('1')).toEqual(jasmine.any(Object));
  });

  it('getFacialEmotions should return an Object', () => {
    expect(service.getFacialEmotions()).toEqual(jasmine.any(Object));
  });

  it('setUserId should change the roomState', () => {
    service.setUserId('1234');
    expect(service.getRoomInfo().userId).toEqual('1234');
  });

  it('setRoomId should change the roomState', () => {
    service.setRoomId('12');
    expect(service.getRoomInfo().roomId).toEqual('12');
  });

  it('setPlaylistUri should change the roomState', () => {
    service.setPlaylistUri('fakeURI.site');
    expect(service.getRoomInfo().playlistUri).toEqual('fakeURI.site');
  });
});
