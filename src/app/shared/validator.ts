import { AbstractControl, FormGroup, FormControl, ValidatorFn } from '@angular/forms';

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

    export function limiteCapital(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { limiteCapital: true };
            }
            return null;
        };
    }

    export function limiteEdad(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { limiteEdad: true };
            }
            return null;
        };
    }
