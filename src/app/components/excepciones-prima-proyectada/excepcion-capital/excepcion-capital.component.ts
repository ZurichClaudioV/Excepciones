import { Component, OnInit } from '@angular/core';
import { ExcepcionPrimaProyectadaService } from '../../../services/excepcion-prima-proyectada.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef } from '@angular/material';
import { ExcepcionPrimaProyectada } from 'src/app/models/excepcion-prima-proyectada.model';

@Component({
  selector: 'app-excepcion-capital',
  templateUrl: './excepcion-capital.component.html',
  styleUrls: ['./excepcion-capital.component.css']
})
export class ExcepcionCapitalComponent implements OnInit {

  constructor(public service: ExcepcionPrimaProyectadaService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ExcepcionCapitalComponent>) { }

listaPlan: ExcepcionPrimaProyectada[];
selected;
seleccione = 'Seleccione';

  ngOnInit() {
    this.populateListaPlan();
    if (!this.service.formCapital.get('RowId').value) {
        this.service.formCapital.reset();
        this.service.initializeFormGroupCapital();
        this.service.formCapital.get('Capital').enable();
    } else {
      this.selected = this.service.formCapital.get('Plan').value;
      this.service.formCapital.get('Capital').disable();
      // this.onSelectedChange(this.selected);
    }
  }

  onClear() {
    this.service.formCapital.reset();
    this.service.initializeFormGroupCapital();
  }


  async onSubmit() {
    if (this.service.formCapital.valid) {
      if (!this.service.formCapital.get('RowId').value) {
        // Entra acá si es un ingreso nuevo
        this.service.ingresarCapital(this.service.formCapital.value);
        this.service.formCapital.reset();
        this.service.initializeFormGroupCapital();
        this.notificationService.success(':: Excepción capital ingresada exitosamente');
        this.onClose();
      } else {
        // Entra acá si viene con key y corresponde a un update
        await this.service.modificarExcepcionCapital(this.service.formCapital.getRawValue());
        this.service.formCapital.reset();
        this.service.initializeFormGroupCapital();
        this.notificationService.success(':: Excepción capital modificada exitosamente');
        this.onClose();
      }
    }
  }

  onClose() {
    this.service.formCapital.reset();
    this.service.initializeFormGroupCapital();
    this.dialogRef.close();
  }

  populateListaPlan() {
      this.service.listaExcepcionCapital().subscribe(res => {
      this.listaPlan = res;
    });
  }
}
