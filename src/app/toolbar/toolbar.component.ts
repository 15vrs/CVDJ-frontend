import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  options: NgbModalOptions = {
    centered: true,
    size: 'xl',
  }

  constructor(
    private modalService: NgbModal,
    private cameraService: CameraService
    ) { }

  cameraConnected = false;

  ngOnInit(): void {
    this.cameraService.connectClicked.subscribe(event => {
      this.cameraConnected = true;
    })
  }

  openModal(content) {
    this.modalService.open(content, this.options);
  }


}
