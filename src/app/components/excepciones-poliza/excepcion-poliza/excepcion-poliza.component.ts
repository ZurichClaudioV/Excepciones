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
    } else {
      // Descomponemos la fecha obtenida de la fila para luego formatearla
      let year = this.service.form.get('FEC_INICIO').value.toString().substring(0, 4);
      let month = this.service.form.get('FEC_INICIO').value.toString().substring(4, 6);
      let day = this.service.form.get('FEC_INICIO').value.toString().substring(6, 8);

      // Creamos una variable date con nuestro string formateado y procedemos a naturalizar su valor con el de su respectivo timezone
      // ya que sin hacer esto el datepicker quedara un día diferenciado según la diferencia por defecto con la de la nueva zona horaria.
      let dateSet = new Date(`${year}-${month}-${day}`);
      dateSet.setMinutes(dateSet.getMinutes() + dateSet.getTimezoneOffset());
      this.service.form.get('FEC_INICIO').setValue(dateSet);
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
    if (this.service.form.controls[`${controlPadre}`].value) {
      this.service.form.controls[`${controlPadre}`].setValue(1);

      if (controlHijoDos != null) {
        this.service.form.controls[`${controlHijoUno}`].enable();
        this.service.form.controls[`${controlHijoDos}`].enable();
      } else {
        this.service.form.controls[`${controlHijoUno}`].enable();
      }
    } else {
      this.service.form.controls[`${controlPadre}`].setValue(0);

      if (controlHijoDos != null) {
        this.service.form.controls[`${controlHijoUno}`].disable();
        this.service.form.controls[`${controlHijoUno}`].value('');
        this.service.form.controls[`${controlHijoDos}`].disable();
        this.service.form.controls[`${controlHijoDos}`].value('');
      } else {
        this.service.form.controls[`${controlHijoUno}`].disable();
        this.service.form.controls[`${controlHijoUno}`].value('');
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
