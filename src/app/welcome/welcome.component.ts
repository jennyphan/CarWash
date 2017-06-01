import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../shared/services/index';
import { Vehicle } from '../shared/model/vehicle';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent {



    constructor(
        private router: Router,
        private alertService: AlertService) { }


}
