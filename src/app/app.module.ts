import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LandingComponent } from './landing/landing.component';
import { ConnectComponent } from './connect/connect.component';
import { MainComponent } from './main/main.component';
import { SongInfoComponent } from './song-info/song-info.component';
import { EmotionModalComponent } from './emotion-modal/emotion-modal.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { UserCameraComponent } from './user-camera/user-camera.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LandingComponent,
    ConnectComponent,
    MainComponent,
    SongInfoComponent,
    EmotionModalComponent,
    MusicPlayerComponent,
    UserCameraComponent,
    JoinRoomComponent,
    CreateRoomComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
