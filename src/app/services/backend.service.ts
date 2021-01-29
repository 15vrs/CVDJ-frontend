import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { faceAttributes, FacialEmotions } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  // private backendApiUrl = 'http://localhost:8080'; //test with wiremock
  private backendApiUrl = 'http://127.0.0.1:5000'; //test with local BE
  // private backendApiUrl = 'https://cvdj.azurewebsites.net'; //connect to backend server

  constructor(
    private http: HttpClient, 
    private router: Router) { }


  // POST emotion data from backend - this may change to PUT
  getFacialEmotions(): Observable<faceAttributes> {
    return this.http.post<faceAttributes>(this.backendApiUrl + '/emotion',{ responseType: 'text' })
       .pipe(
         catchError(this.handleError<faceAttributes>('getFacialEmotions'))
       )
  }

  // POST screenshot (blob) to backend
  postImageUrl(payload: any) {
    this.http.post<any>(this.backendApiUrl + '/emotion', payload) 
      .pipe(
        catchError(this.handleError<FacialEmotions>('postImageUrl'))
      )

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