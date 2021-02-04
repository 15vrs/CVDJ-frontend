import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
    constructor(
        private backend: BackendService,
        private router: Router) { }

    ngOnInit(): void {
        var id = 0;
        console.log(window.location.search);
        this.backend.getTokens(window.location.search)
        .subscribe(response => {
            // id = response;
            console.log(response);
        })
        this.router.navigate(['/connect']);

        //TODO: connect to getRoomId
        // console.log(id);
        // if(id != 0) {
        //     this.backend.getRoomId(id);
        // }
    }
}