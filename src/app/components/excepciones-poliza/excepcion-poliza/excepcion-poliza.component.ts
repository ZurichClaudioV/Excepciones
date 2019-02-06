import { Component, OnInit } from '@angular/core';
import { ExcepcionPolizaService } from '../../../services/excepcion-poliza.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-excepcion-poliza',
  templateUrl: './excepcion-poliza.component.html',
  styleUrls: ['./excepcion-poliza.component.css']
})
export class ExcepcionPolizaComponent implements OnInit {


  minDate = new Date;

  constructor(public service: ExcepcionPolizaService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<ExcepcionPolizaComponent>) { }


  ngOnInit() {
    if (!this.service.form.get('RowId').value) {
      this.service.form.reset();
      this.service.initializeFormGroup();
    }
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }


  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('RowId').value) {
        // Entra acá si es un ingreso nuevo
        // console.log(this.service.form.value);
        this.service.ingresarExcepcionPoliza(this.service.form.value).subscribe();
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Excepción póliza ingresada exitosamente');
        this.onClose();
      } else {
        // Entra acá si viene con key y corresponde a un update
        this.service.modificarExcepcionPoliza(this.service.form.value).subscribe();
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Excepción póliza modificada exitosamente');
        this.onClose();
      }
    }
  }


  setValorCheck(controlPadre: string, controlHijoUno: string, controlHijoDos?: string) {
    // console.log(formControl);
    // console.log(this.service.form.controls[`${formControl}`].value);
    // console.log(this.service.form.controls[`${controlPadre}`].value);
    if (this.service.form.controls[`${controlPadre}`].value) {
      this.service.form.controls[`${controlPadre}`].setValue(1);

      if (controlHijoDos != null) {
        this.service.form.controls[`${controlHijoUno}`].enable();
        this.service.form.controls[`${controlHijoDos}`].enable();
      } else {
        this.service.form.controls[`${controlHijoUno}`].enable();
      }

      // console.log(this.service.form.controls[`${formControl}`].value);
    } else {
      this.service.form.controls[`${controlPadre}`].setValue(0);

      if (controlHijoDos != null) {
        this.service.form.controls[`${controlHijoUno}`].disable();
        this.service.form.controls[`${controlHijoDos}`].disable();
      } else {
        this.service.form.controls[`${controlHijoUno}`].disable();
      }
    }
  }


  // onChecked(controlPadre: string, controlHijoUno: string, controlHijoDos?: string) {
  //   if (this.service.form.controls[`${controlPadre}`].value) {
  //   if (controlHijoDos != null) {
  //     this.service.form.controls[`${controlHijoUno}`].enable();
  //     this.service.form.controls[`${controlHijoDos}`].enable();
  //     } else {
  //       this.service.form.controls[`${controlHijoUno}`].enable();
  //     }
  //   } else {
  //     if (controlHijoDos != null) {
  //       this.service.form.controls[`${controlHijoUno}`].disable();
  //       this.service.form.controls[`${controlHijoDos}`].disable();
  //     } else {
  //       this.service.form.controls[`${controlHijoUno}`].disable();
  //     }
  //   }
  // }


  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
