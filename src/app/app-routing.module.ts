import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'join', component: JoinRoomComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'main', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
