import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FacialEmotions, Room } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendApiUrl = 'http://localhost:8080'; //test with wiremock
  // private backendApiUrl = 'http://127.0.0.1:5000'; //test with local backend
  // private backendApiUrl = 'https://cvdj.azurewebsites.net'; //connect to backend server

  constructor(
    private http: HttpClient, 
    private router: Router) { }

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

  /**
   * CALLS TO DOWNSTREAM
   */

  // POST screenshot (blob) to backend
  postImageUrl(payload: any) {
    this.http.post<any>(this.backendApiUrl + '/emotion', payload)
    .pipe(
      catchError(this.handleError<FacialEmotions>('postImageUrl'))
    )
    .subscribe(response => {
      this.parseEmotionInfo(response);
    })
  }

  // POST roomID to join, get full info block back
  joinRoom(roomId: string) {
    this.http.post<any>(this.backendApiUrl + '/join/' + roomId, {})
    .pipe(
      catchError(this.handleError<string>('joinRoom'))
    )
    .subscribe(response => {
      this.parseRoomInfo(response);
    })
  }

  // scaffold getting an image from URL
  // getAlbumArt(): Observable<string> {
  //   return this.http.get<string>(this.backendApiUrl + '/albumArt')
  //   .pipe(
  //     catchError(this.handleError<string>('getAlbumArt'))
  //   )
  // }

  // Login to Spotify via backend service
  // change to post and send a Frontend ID 
  getLogin(): Observable<any> {
    return this.http.get(this.backendApiUrl + '/login', { responseType: 'text', observe: 'response',})
    .pipe(
      catchError(this.handleError<string>('login'))
    )
  }

  // call to create room with [TODO] frontend ID
  getRoomId() {
    this.http.post<any>(this.backendApiUrl + '/create_room', {})
    .pipe(
      catchError(this.handleError<string>('getRoomInfo'))
    )
    .subscribe(response => {
      // parse response to get roomID, userID, playlist URI before calling main page
      this.parseRoomInfo(response);
    })
  }

  /**
   * PARSE DOWNSTREAM RESPONSE
   */

  private parseRoomInfo(response) {
    this.roomState.userId = response.userId;
    this.roomState.roomId = response.roomId;
    this.roomState.playlistUri = response.playlistUri;
  }

  private parseEmotionInfo(response) {
    this.facialEmotionsState.anger = response.emotion.anger;
    this.facialEmotionsState.contempt = response.emotion.contempt;
    this.facialEmotionsState.disgust = response.emotion.disgust;
    this.facialEmotionsState.fear = response.emotion.fear;
    this.facialEmotionsState.happiness = response.emotion.happiness;
    this.facialEmotionsState.neutral = response.emotion.neutral;
    this.facialEmotionsState.sadness = response.emotion.sadness;
    this.facialEmotionsState.surprise = response.emotion.surprise;
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