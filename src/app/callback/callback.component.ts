import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
    constructor(
        private backend: BackendService,
        private router: Router) { }

    ngOnInit(): void {
        console.log(window.location.search);
        this.backend.getTokens(window.location.search) 
        this.router.navigate(['/connect']);
    }
}