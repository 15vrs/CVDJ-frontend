import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Face, FacialEmotions } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendApiUrl = 'https://cvdj.azurewebsites.net'; //test with fake server

  constructor(private http: HttpClient) { }


  // GET emotion data from backend - this may change to PUT
  getFacialEmotions(): Observable<Face> {
    return this.http.post<Face>(this.backendApiUrl + '/emotion',{ responseType: 'text' })
       .pipe(
         retry(3),
         catchError(this.handleError<Face>('getFacialEmotions'))
       )
    // return this.http.get<FacialEmotions>(this.backendApiUrl + '/emotions')
    //   .pipe(
    //     retry(3),
    //     catchError(this.handleError<FacialEmotions>('getFacialEmotions'))
    //   )
  }

  // PUT screenshot (blob) to backend
  putImageUrl(payload: Blob): void {
    this.http.put<Blob>(this.backendApiUrl + '/face', payload)
      .pipe(
        retry(3),
        catchError(this.handleError<FacialEmotions>('postImageUrl'))
      )
      .subscribe()
  }

  // where to put userId in subsequent requests? 
  // can't send GET request with body so may have to send in header
  getUserId(): Observable<string> {
    return this.http.get<string>(this.backendApiUrl + '/userId')
    .pipe(
      retry(3),
      catchError(this.handleError<string>('getFacialEmotions'))
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