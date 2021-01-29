import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { FacialEmotions } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  // private backendApiUrl = 'http://localhost:8080'; //test with wiremock
  private backendApiUrl = 'http://127.0.0.1:5000'; //test with local BE

  constructor(private http: HttpClient) { }


  // GET emotion data from backend - may not need this, emotions returned as part of PUT /emotion
  getFacialEmotions(): Observable<FacialEmotions> {
    return this.http.get<FacialEmotions>(this.backendApiUrl + '/emotions')
      .pipe(
        catchError(this.handleError<FacialEmotions>('getFacialEmotions'))
      )
  }

  // POST screenshot (blob) to backend
  postImageUrl(payload: any) {
    console.log(payload)
    this.http.post<any>(this.backendApiUrl + '/emotion', payload) 
      .pipe(
        catchError(this.handleError<FacialEmotions>('postImageUrl'))
      )
      .subscribe()
  }

  // where to put userId in subsequent requests? 
  // can't send GET request with body so may have to send in header or use PUT
  getUserId() {
    this.http.get<string>(this.backendApiUrl + '/userId')
    .pipe(
      catchError(this.handleError<string>('getUserId'))
    )
    .subscribe(response => {
      // parse response to get userID
    })
  }

  // scaffold getting an image from URL
  getAlbumArt(): Observable<string> {
    return this.http.get<string>(this.backendApiUrl + '/albumArt')
    .pipe(
      catchError(this.handleError<string>('getAlbumArt'))
    )
  }

  // method allows user to login to Spotify via backend service
  // change to post and send a Frontend ID 
  getLogin(): Observable<any> {
    return this.http.get(this.backendApiUrl + '/login', { responseType: 'text', observe: 'response',})
    .pipe(
      catchError(this.handleError<string>('login'))
    )
  }

  getRoomId() {
    this.http.get<string>(this.backendApiUrl + '/create_room')
    .pipe(
      catchError(this.handleError<string>('getUserId'))
    )
    .subscribe(response => {
      // parse response to get roomID, userID, playlist URI before calling main page
      this.router.navigateByUrl('/main');
    })
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