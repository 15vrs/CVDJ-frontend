import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { ConnectComponent } from './connect/connect.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'create', component: CreateRoomComponent },
  { path: 'join', component: JoinRoomComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'main', component: MainComponent },
  { path: 'callback', component: CallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
