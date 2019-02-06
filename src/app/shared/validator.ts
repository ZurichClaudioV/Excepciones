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

    // export function mayorCero(control: AbstractControl) {

    //     if (control && (control.value != null || control.value != undefined)) {
    //         const now = new Date();
    //         let year = now.getFullYear();
    //         let month = now.getMonth() + 1;
    //         let textMonth = (month < 10) ? "0" + month : month.toString();
    //         let day = new Date(year, month, 0).getDate();
    //         let fechaFormateadaHoy = +(year.toString() + textMonth + day.toString())
    //         // let xd = datep.transform(<Date>control.value, "yyyy-MM-dd");
    //         // console.log(xd);
    //         // console.log(fechaFormateadaHoy);
    //         // console.log(control.value);
    //         if (+(control.value) > fechaFormateadaHoy) {
    //           return {
    //               isError: true
    //           };
    //         }
    //     }

    //     return null;
    // }

    // export function validaFechaMenorQueHoy(control: AbstractControl) {

    //     if (control && (control.value != null || control.value != undefined)) {
    //         const now = new Date();
    //         let year = now.getFullYear();
    //         let month = now.getMonth() + 1;
    //         let textMonth = (month < 10) ? "0" + month : month.toString();
    //         let day = new Date(year, month, 0).getDate();
    //         let fechaFormateadaHoy = +(year.toString() + textMonth + day.toString());

    //         // let datep: DatePipe;
    //         console.log(control.value);
    //         // let xd = datep.transform(<Date>control.value, "yyyy-MM-dd");
    //         // console.log(xd);
    //         // console.log(fechaFormateadaHoy);
    //         // console.log(control.value);
    //         if (+(control.value) > fechaFormateadaHoy) {
    //           return {
    //               isError: true
    //           };
    //         }
    //     }

    //     return null;
    // }

//   export function zipcodeValidator(control: AbstractControl) {

//     if (control && (control.value !== null || control.value !== undefined)) {
//         const regex = new RegExp('^[0-9]{6}$');

//         if (!regex.test(control.value)) {
//             return {
//                 isError: true
//             };
//         }
//     }

//     return null;
// }

// export function passValidator(control: AbstractControl) {
//     if (control && (control.value !== null || control.value !== undefined)) {
//         const cnfpassValue = control.value;

//         const passControl = control.root.get('password'); // magic is this
//         if (passControl) {
//             const passValue = passControl.value;
//             if (passValue !== cnfpassValue || passValue === '') {
//                 return {
//                     isError: true
//                 };
//             }
//         }
//     }

//     return null;
// }
