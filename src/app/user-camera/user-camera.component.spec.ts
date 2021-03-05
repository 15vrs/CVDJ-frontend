import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserCameraComponent } from './user-camera.component';

describe('UserCameraComponent', () => {
  let component: UserCameraComponent;
  let fixture: ComponentFixture<UserCameraComponent>;

 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule, RouterTestingModule ],
     providers: [UserCameraComponent]
   });
   fixture = TestBed.createComponent(UserCameraComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should create', () => {
   expect(component).toBeDefined();
 });
});