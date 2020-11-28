import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { FacialEmotions } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FacialEmotionsService {
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

  private faceApiUrl = 'http://localhost:3000/emotion' //test with fake server

  constructor(private http: HttpClient) { }

  getFacialEmotions(): Observable<FacialEmotions> {
    return this.http.get<FacialEmotions>(this.faceApiUrl)
      .pipe(
        catchError(this.handleError<FacialEmotions>('getFacialEmotionsState'))
      );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private getApiResponse(): void {
    // return this.http.get('/api/user')
    //   .map((res: Response) => res.json().response);
  }
}
