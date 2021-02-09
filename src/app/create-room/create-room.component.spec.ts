import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateRoomComponent } from './create-room.component';

describe('CreateRoomComponent', () => {
  let component: CreateRoomComponent;
  let fixture: ComponentFixture<CreateRoomComponent>;

 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule, RouterTestingModule ],
     providers: [CreateRoomComponent]
   });
   fixture = TestBed.createComponent(CreateRoomComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should create', () => {
   expect(component).toBeDefined();
 });
});