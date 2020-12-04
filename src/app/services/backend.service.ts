import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { FacialEmotions } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendApiUrl = 'http://localhost:8080'; //test with fake server

  constructor(private http: HttpClient) { }

  // GET emotion data from backend - this may change to PUT
  getFacialEmotions(): Observable<FacialEmotions> {
    return this.http.get<FacialEmotions>(this.backendApiUrl + '/emotions')
      .pipe(
        retry(3),
        catchError(this.handleError<FacialEmotions>('getFacialEmotions'))
      )
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

  private getApiResponse(): void {
    // return this.http.get('/api/user')
    //   .map((res: Response) => res.json().response);
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