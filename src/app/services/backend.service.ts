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

  // private backendApiUrl = 'http://localhost:8080'; //test with wiremock
  // private backendApiUrl = 'http://127.0.0.1:5000'; //test with local backend
  private backendApiUrl = 'https://cvdj.azurewebsites.net'; //connect to backend server

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
    this.http.post<any>(this.backendApiUrl + '/emotion/' + this.roomState.userId, payload)
    .pipe(
      catchError(this.handleError<FacialEmotions>('postImageUrl'))
    )
    .subscribe(response => {
      var data = JSON.parse(response.replace(/'/g, '"'));
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
  getTokens(url: string): Observable<any> {
    return this.http.get<any>(this.backendApiUrl + '/callback/' + url, { observe: 'response' });
  }

  // Create room
  getCreateRoom(id: string): Observable<any> {
    return this.http.get<any>(this.backendApiUrl + '/create_room/' + id, { observe: 'response' });
  }

  // Send browser device IDs to backend
  setSpotifyDevices(id: string) {
    var payload = {
      'deviceId': id,
      'userId': this.roomState.userId,
      'roomId': this.roomState.roomId
    };
    this.http.post<any>(this.backendApiUrl + '/add_device', payload, { observe: 'response' })
    .subscribe(
      response => {
        // Do nothing...?
      },
      error => {
        // Handle error...?
      }
    );
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