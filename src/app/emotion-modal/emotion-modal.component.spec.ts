import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionModalComponent } from './emotion-modal.component';

describe('EmotionModalComponent', () => {
  let component: EmotionModalComponent;
  let fixture: ComponentFixture<EmotionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmotionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
