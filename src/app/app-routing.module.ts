import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'main', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
