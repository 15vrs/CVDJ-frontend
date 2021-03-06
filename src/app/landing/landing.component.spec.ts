import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule, RouterTestingModule ],
     providers: [LandingComponent]
   });
   fixture = TestBed.createComponent(LandingComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should create', () => {
   expect(component).toBeDefined();
 });
});