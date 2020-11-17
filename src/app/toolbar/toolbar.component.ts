import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal(content) {
    this.modalService.open(content, this.options);
  }


}
