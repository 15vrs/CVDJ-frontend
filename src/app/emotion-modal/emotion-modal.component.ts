import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FacialEmotions } from '../models';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'emotion-modal',
  templateUrl: './emotion-modal.component.html',
  styleUrls: ['./emotion-modal.component.css']
})
export class EmotionModalComponent implements OnInit {

  emotions: FacialEmotions;

  constructor(private backend: BackendService) { }
  
  ngOnInit(): void {
    this.emotions = this.backend.getFacialEmotions();
    //need to access this conditionally
    // or access onInit but use ngIf in template to conditionally display text
  }

}
