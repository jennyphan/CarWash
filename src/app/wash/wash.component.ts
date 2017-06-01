import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../shared/services/index';
import { Vehicle } from '../shared/model/vehicle';

@Component({
    selector: 'app-wash',
    templateUrl: './wash.component.html',
    styleUrls: ['./wash.component.css'],
    providers: []
})

export class WashComponent implements OnInit {
    model: any = {};
    vehicles: any[] = JSON.parse(localStorage.getItem('vehicles')) || [];
    loading = false;
    stolenVehicleId = '1111111';
    stolenVehicleMsg = 'The vehicle you entered is stolen, please enter another vehicle to wash';
    truckBedLetDownMsg = 'We do not wash trucks that have a bed that is let down';
    vehicleTruck = 'Truck';
    vehicleCar = 'Car';
    carPrice = 5;
    truckPrice = 10;
    mudInBedPrice = 2;
    existingCustomer = false;
    existingCustomerDiscount = '(50% discount, existing customer)';


    constructor(
        private router: Router,
        private alertService: AlertService) { }

    ngOnInit() {
        this.model.bedUp = '';
        this.model.mudInBed = '';
        this.model.vehicleType = '';
        this.model.price = 0;
        this.model.vehicleId = '';

    }

    isVehicleStolen(vehicleId) {
        if (vehicleId === this.stolenVehicleId) {
            return true;
        }
        return false;
    }

    vehicleIdChanged(vehicleId) {
        if (this.isVehicleStolen(vehicleId)) {
            this.alertService.error(this.stolenVehicleMsg);
        } else {
            this.alertService.clearMessage();
        }
    }

    isExistingCustomer() {
        console.log(this.existingCustomer);
        return this.existingCustomer;
    }


    onBlurVehicleId(id) {
        if (this.wasVehicleWashedBefore(this.vehicles, id)) {
            this.existingCustomer = true;
        } else {
            this.existingCustomer = false;
        }
        this.setVehicleCost();

    }

    isVehicleValid() {
        if (this.model.vehicleId && this.model.vehicleId.length > 0) {
            if (!this.isVehicleStolen(this.model.vehicleId)) {
                return true;
            }
        }
        return false;
    }

    isCar() {
        if (this.model.vehicleType === this.vehicleCar) {
            return true;
        }
        return false;
    }
    isTruck() {
        if (this.model.vehicleType === this.vehicleTruck) {
            return true;
        }
        return false;
    }

    setVehicleType(vehicleType) {
        this.model.vehicleType = vehicleType;
        this.setVehicleCost();
    }

    setVehicleCost() {
        if (this.isCar()) {
            this.model.price = this.carPrice;
        }

        if (this.isTruck()) {
            this.model.price = this.truckPrice;
        }

        if (this.isTruck() && this.model.mudInBed === 'Y') {
            this.model.price = this.model.price + this.mudInBedPrice;
        }

        if (this.existingCustomer) {
            this.model.price = this.model.price / 2;
        }
    }

    isVehicleTypeSet() {
        if (this.isCar() || this.isTruck()) {
            return true;
        }
        return false;
    }

    isTruckBedUpSet() {
        if (this.model.bedUp === 'Y' || this.model.bedUp === 'N') {
            return true;
        }
        return false;
    }

    isMudInBedSet() {
        if (this.model.mudInBed === 'Y' || this.model.mudInBed === 'N') {
            return true;
        }
        return false;
    }

    setTruckBedUpValue(bedUp) {
        this.model.bedUp = bedUp;
        this.setTruckBedAlertIfInvalid();
    }

    isTruckBedDown() {
        if (this.model.bedUp === 'N') {
            return true;
        }
        return false;
    }

    setTruckBedAlertIfInvalid() {
        if (this.isTruckBedDown()) {
            this.alertService.error(this.truckBedLetDownMsg);
        } else {
            this.alertService.clearMessage();
        }
    }

    valid() {
        if (!this.isVehicleTypeSet()) {
            return false;
        }

        if (!this.isVehicleValid()) {
            return false;
        }

        if (this.isTruck()) {
            if (!this.validTruck()) {
                return false;
            }
        }

        return true;
    }

    validTruck() {
        if (!this.isMudInBedSet()) {
            return false;
        }

        if (!this.isTruckBedUpSet()) {
            return false;
        }

        if (this.isTruckBedDown()) {
            return false;
        }
        return true;
    }


    setTruckBedMudValue(bedHasMud) {
        this.model.mudInBed = bedHasMud;
        this.setVehicleCost();
    }

    wash() {
        this.loading = true;
        this.saveVehicleForWash();
        this.loading = false;
        this.router.navigate(['/complete']);
    }

    wasVehicleWashedBefore(vehicles: Vehicle[], vehicleId: string) {
        let doesVehicleExist = false;
        for (const existingVehicle of vehicles) {
            console.log(existingVehicle.vehicleId + ' ' + vehicleId);
            if (existingVehicle.vehicleId.toString() === vehicleId.toString()) {
                doesVehicleExist = true;
            }
        }
        console.log('does exist ' + doesVehicleExist);
        return doesVehicleExist;
    }

    saveVehicleForWash() {
        this.vehicles.push(this.model);
        localStorage.setItem('vehicles', JSON.stringify(this.vehicles));
    }
}
