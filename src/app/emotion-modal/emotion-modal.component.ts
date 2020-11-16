import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'emotion-modal',
  templateUrl: './emotion-modal.component.html',
  styleUrls: ['./emotion-modal.component.css']
})
export class EmotionModalComponent implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    // this.element.nativeElement.addEventListener('click', () => {
    //   this.close()
    // })
  }

  // close() {
  //   this.element.nativeElement.classList.remove('show')
  //   this.element.nativeElement.classList.add('hidden')
  // }

}
