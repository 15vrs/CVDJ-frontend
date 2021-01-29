import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { faceAttributes, FacialEmotions } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendApiUrl = 'https://cvdj.azurewebsites.net'; //test with fake server

  constructor(private http: HttpClient) { }


  // POST emotion data from backend - this may change to PUT
  getFacialEmotions(): Observable<faceAttributes> {
    return this.http.post<faceAttributes>(this.backendApiUrl + '/emotion',{ responseType: 'text' })
       .pipe(
         catchError(this.handleError<faceAttributes>('getFacialEmotions'))
       )
  }

  // PUT screenshot (blob) to backend
  putImageUrl(payload: Blob): void {
    this.http.put<Blob>(this.backendApiUrl + '/face', payload)
      .pipe(
        catchError(this.handleError<FacialEmotions>('postImageUrl'))
      )
      .subscribe()
  }

  // where to put userId in subsequent requests? 
  // can't send GET request with body so may have to send in header
  getUserId(): Observable<string> {
    return this.http.get<string>(this.backendApiUrl + '/userId')
    .pipe(
      catchError(this.handleError<string>('getUserId'))
    )
  }

  getRoomId(): Observable<string> {
    return this.http.get<string>(this.backendApiUrl + '/roomId')
    .pipe(
      catchError(this.handleError<string>('getRoomId'))
    )
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