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
        this.facialEmotionsState.anger = response[0].faceAttributes.emotion.anger;
        this.facialEmotionsState.contempt = response[0].faceAttributes.emotion.contempt;
        this.facialEmotionsState.disgust = response[0].faceAttributes.emotion.disgust;
        this.facialEmotionsState.fear = response[0].faceAttributes.emotion.fear;
        this.facialEmotionsState.happiness = response[0].faceAttributes.emotion.happiness;
        this.facialEmotionsState.neutral = response[0].faceAttributes.emotion.neutral;
        this.facialEmotionsState.sadness = response[0].faceAttributes.emotion.sadness;
        this.facialEmotionsState.surprise = response[0].faceAttributes.emotion.surprise;
      });
  }

  getFacialEmotionsState(): FacialEmotions {
    this.getFacialEmotions();
    return this.facialEmotionsState;
  }

}
