import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
// import { DatePipe } from '@angular/common';

    export function selectDistintoCero(control: AbstractControl) {
        if (control && (control.value != null || control.value != undefined)) {
            if (control.value == "0") {
                return {
                    selectDistintoCero: true
                    };
            } else {
                return null;
            }
        }
    }
