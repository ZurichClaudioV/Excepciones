import { Component, OnInit } from '@angular/core';
import { ExcepcionPrimaProyectadaService } from 'src/app/services/excepcion-prima-proyectada.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef, TooltipPosition } from '@angular/material';
import { ExcepcionPrimaProyectada } from 'src/app/models/excepcion-prima-proyectada.model';

@Component({
  selector: 'app-excepcion-edad',
  templateUrl: './excepcion-edad.component.html',
  styleUrls: ['./excepcion-edad.component.css']
})
export class ExcepcionEdadComponent implements OnInit {

  constructor(public service: ExcepcionPrimaProyectadaService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ExcepcionEdadComponent>) { }

listaPlan: ExcepcionPrimaProyectada[];
listaPlanCombo: ExcepcionPrimaProyectada[];
selected;
position: TooltipPosition = 'right';

  ngOnInit() {
    this.populateListaPlan();
    if (!this.service.formCapital.get('RowId').value) {
      this.service.formCapital.reset();
      this.service.initializeFormGroupCapital();
      this.service.formCapital.get('Plan').enable();
      this.service.formCapital.get('Capital').enable();
    } else {
      this.selected = this.service.formCapital.get('Plan').value;
      this.service.formCapital.get('Plan').disable();
      this.service.formCapital.get('Capital').disable();
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
        let plan = this.service.formCapital.get('Plan').value;
        let capital = this.service.formCapital.get('Capital').value;
        let existe = this.listaPlan.filter(x => x.Plan == plan && x.Capital == capital)[0];

        if (existe == undefined || existe == null) {
          this.service.ingresarCapital(this.service.formCapital.value);
          this.service.formCapital.reset();
          this.service.initializeFormGroupCapital();
          this.notificationService.success(':: Excepción edad ingresada exitosamente');
          this.onClose();
        } else {
          this.notificationService.warn(':: Excepción edad ya existe');
        }
      } else {
        // Entra acá si viene con key y corresponde a un update
        await this.service.modificarExcepcionCapital(this.service.formCapital.getRawValue());
        this.service.formCapital.reset();
        this.service.initializeFormGroupCapital();
        this.notificationService.success(':: Excepción edad modificada exitosamente');
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
    this.service.cargarCombobox().subscribe(res => {
        this.listaPlanCombo = res;
    });
  }

}

