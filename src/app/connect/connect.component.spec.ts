import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConnectComponent } from './connect.component';

describe('ConnectComponent', () => {
  let component: ConnectComponent;
  let fixture: ComponentFixture<ConnectComponent>;

 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule, RouterTestingModule ],
     providers: [ConnectComponent]
   });
   fixture = TestBed.createComponent(ConnectComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should create', () => {
   expect(component).toBeDefined();
 });
});