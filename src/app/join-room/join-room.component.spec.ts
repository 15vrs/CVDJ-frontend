 import { ComponentFixture, TestBed } from '@angular/core/testing';
 import { HttpClientTestingModule } from '@angular/common/http/testing';
 import { RouterTestingModule } from '@angular/router/testing';
 import { JoinRoomComponent } from './join-room.component';

describe('JoinRoomComponent', () => {
   let component: JoinRoomComponent;
   let fixture: ComponentFixture<JoinRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule ],
      providers: [JoinRoomComponent]
    });
    fixture = TestBed.createComponent(JoinRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});