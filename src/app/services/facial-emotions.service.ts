import { Injectable } from '@angular/core';
import { FacialEmotions } from '../models';
import { BackendService } from './backend.service';

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

  constructor(private backend: BackendService) { }

  private getFacialEmotions() {
    this.backend.getFacialEmotions()
      .subscribe(response => {
        this.facialEmotionsState.anger = response.emotion.anger;
        this.facialEmotionsState.contempt = response.emotion.contempt;
        this.facialEmotionsState.disgust = response.emotion.disgust;
        this.facialEmotionsState.fear = response.emotion.fear;
        this.facialEmotionsState.happiness = response.emotion.happiness;
        this.facialEmotionsState.neutral = response.emotion.neutral;
        this.facialEmotionsState.sadness = response.emotion.sadness;
        this.facialEmotionsState.surprise = response.emotion.surprise;
      });
  }

  getFacialEmotionsState(): FacialEmotions {
    this.getFacialEmotions();
    return this.facialEmotionsState;
  }

}
