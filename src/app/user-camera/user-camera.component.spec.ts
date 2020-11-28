import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCameraComponent } from './user-camera.component';

describe('UserCameraComponent', () => {
  let component: UserCameraComponent;
  let fixture: ComponentFixture<UserCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
