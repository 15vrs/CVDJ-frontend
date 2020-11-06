import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.css']
})
export class SongInfoComponent implements OnInit {
  @Input() heading: string;
  @Input() description: string;
  constructor() { }

  ngOnInit(): void {
  }

}
