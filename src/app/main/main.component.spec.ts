import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule, RouterTestingModule ],
     providers: [MainComponent]
   });
   fixture = TestBed.createComponent(MainComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should create', () => {
   expect(component).toBeDefined();
 });
});