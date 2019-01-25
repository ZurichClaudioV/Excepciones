import { Component, OnInit } from '@angular/core';
import { ExcepcionPolizaService } from '../../shared/excepcion-poliza.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-excepcion-poliza',
  templateUrl: './excepcion-poliza.component.html',
  styleUrls: ['./excepcion-poliza.component.css']
})
export class ExcepcionPolizaComponent implements OnInit {

  constructor(private service: ExcepcionPolizaService,
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
        this.service.ingresarExcepcionPoliza(this.service.form.value);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Ingresed successfully');
        this.onClose();
      } else {
        // Entra acá si viene con key y corresponde a un update
        this.service.modificarExcepcionPoliza(this.service.form.value);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Updated successfully');
        this.onClose();
      }
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
