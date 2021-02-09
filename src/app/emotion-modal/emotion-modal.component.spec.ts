import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmotionModalComponent } from './emotion-modal.component';

describe('EmotionModalComponent', () => {
  let component: EmotionModalComponent;
  let fixture: ComponentFixture<EmotionModalComponent>;

 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule, RouterTestingModule ],
     providers: [EmotionModalComponent]
   });
   fixture = TestBed.createComponent(EmotionModalComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should create', () => {
   expect(component).toBeDefined();
 });
});