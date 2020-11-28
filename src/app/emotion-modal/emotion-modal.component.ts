import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FacialEmotions } from '../models';
import { CameraService } from '../services/camera.service';
import { FacialEmotionsService } from '../services/facial-emotions.service';
@Component({
  selector: 'emotion-modal',
  templateUrl: './emotion-modal.component.html',
  styleUrls: ['./emotion-modal.component.css']
})
export class EmotionModalComponent implements OnInit {

  emotions: FacialEmotions;

  constructor(private facialEmotionsService: FacialEmotionsService) { }
  
  ngOnInit(): void {
    this.getFacialEmotionsState(); 
    //need to access this conditionally
    // or access onInit but use ngIf in template to conditionally display text
  }

  getFacialEmotionsState(): void {
    this.emotions = this.facialEmotionsService.getFacialEmotionsState();
  }

}
