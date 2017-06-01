import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../shared/services/index';
import { Vehicle } from '../shared/model/vehicle';

@Component({
    selector: 'app-wash',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css'],
    providers: []
})

export class HistoryComponent {
    vehicles: any[] = JSON.parse(localStorage.getItem('vehicles')) || [];

    constructor(
        private router: Router,
        private alertService: AlertService) { }


}
