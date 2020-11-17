import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConnectComponent } from './connect/connect.component';
import { MainComponent } from './main/main.component';
import { SongInfoComponent } from './song-info/song-info.component';
import { EmotionModalComponent } from './emotion-modal/emotion-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LandingComponent,
    ConnectComponent,
    MainComponent,
    SongInfoComponent,
    EmotionModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
