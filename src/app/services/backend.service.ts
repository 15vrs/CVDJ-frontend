import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FacialEmotions, Music, Room } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  @Output() musicStateUpdated = new EventEmitter<Music>();

  private backendApiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private facialEmotionsState: FacialEmotions = {
    anger: 0,
    contempt: 0,
    disgust: 0,
    fear: 0,
    happiness: 0,
    neutral: 0,
    sadness: 0,
    surprise: 0,
  }

  private roomState: Room = {
    userId: undefined,
  }

  private musicState: Music = {
    playing: false,
    song: undefined,
    artist: undefined,
    albumArt: undefined
  }

  /**
   * CALLS TO DOWNSTREAM
   */

  // POST screenshot (blob) to backend
  postImageUrl(payload: any) {
    this.http.post<any>(this.backendApiUrl + '/emotion/' + this.roomState.userId, payload)
    .pipe(
      catchError(this.handleError<FacialEmotions>('postImageUrl'))
    )
    .subscribe(response => {
      const data = JSON.parse(response.replace(/'/g, '"'));
      this.facialEmotionsState.anger = data.anger;
      this.facialEmotionsState.contempt = data.contempt;
      this.facialEmotionsState.disgust = data.disgust;
      this.facialEmotionsState.fear = data.fear;
      this.facialEmotionsState.happiness = data.happiness;
      this.facialEmotionsState.neutral = data.neutral;
      this.facialEmotionsState.sadness = data.sadness;
      this.facialEmotionsState.surprise = data.surprise;
    })
  }

  // GET get userId and playlistID by calling /join with roomId
  getJoinRoom(roomId: string):  Observable<any>{
    return this.http.get<any>(this.backendApiUrl + '/join/' + roomId, { observe: 'response' });
    // response processed in join-room component
  }

  // Login to Spotify via backend service
  getTokens(url: string, redirectUri: string): Observable<any> {
    return this.http.post<any>(this.backendApiUrl + '/callback/' + url, redirectUri, { observe: 'response' });
  }

  // Create room
  getCreateRoom(id: string): Observable<any> {
    return this.http.get<any>(this.backendApiUrl + '/create_room/' + id, { observe: 'response' });
  }

  // Send browser device IDs to backend
  setSpotifyDevices(id: string) {
    const payload = {
      deviceId: id,
      userId: this.roomState.userId,
      roomId: this.roomState.roomId
    };
    this.http.post<any>(this.backendApiUrl + '/add_device', payload)
    .pipe(
      catchError(this.handleError<FacialEmotions>('setSpotifyDevices'))
    ).subscribe();
  }

  // play music
  playMusic() {
    // only call backend to play if music not already playing
    if (!this.musicState.playing){
      this.http.get<any>(this.backendApiUrl + '/play/' + this.roomState.roomId)
      .pipe(
        catchError(this.handleError<FacialEmotions>('playMusic'))
      ).subscribe(response => {
        this.musicState.playing = true;
        if (response.albumArt != this.musicState.albumArt){
          this.updateMusicDetails(response);
        }
      });
    }
  }

  // pause music
  pauseMusic() {
    this.http.get<any>(this.backendApiUrl + '/pause/' + this.roomState.roomId)
    .pipe(
      catchError(this.handleError<FacialEmotions>('pauseMusic'))
    ).subscribe(() => {
      this.musicState.playing = false;
    });
  }

  // skip song
  skipSong() {
    this.http.get<any>(this.backendApiUrl + '/next/' + this.roomState.roomId)
    .pipe(
      catchError(this.handleError<FacialEmotions>('skipSong'))
    ).subscribe(response => {
      if (response.albumArt != this.musicState.albumArt){
        this.updateMusicDetails(response);
      }
    });
  }

  // skip song
  previousSong() {
    this.http.get<any>(this.backendApiUrl + '/previous/' + this.roomState.roomId)
    .pipe(
      catchError(this.handleError<FacialEmotions>('previousSong'))
    ).subscribe(response => {
      if (response.albumArt != this.musicState.albumArt){
        this.updateMusicDetails(response);
      } 
    });
  }

  /**
   * helper methods
   */
  
  private updateMusicDetails(response) {
    this.musicState.albumArt = response.albumArt;
    this.musicState.song = response.song;
    this.musicState.artist = response.artist;
    this.musicStateUpdated.emit(this.musicState);
  }

  /**
   * METHODS TO ACCESS STATES
   */

  getFacialEmotions(): FacialEmotions {
    return this.facialEmotionsState;
  }

  getRoomInfo(): Room {
    return this.roomState;
  }

  public getAccessToken(): string {
    return this.roomState.accessToken;
  }

  setRoomId(response) {
    this.roomState.roomId = response;
  }

  setUserId(response) {
    this.roomState.userId = response;
  }

  setPlaylistUri(response) {
    this.roomState.playlistUri = response;
  }

  setAccessToken(response) {
    this.roomState.accessToken = response;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}