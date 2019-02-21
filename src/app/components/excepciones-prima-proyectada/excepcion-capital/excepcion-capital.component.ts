import { Component, OnInit } from '@angular/core';
import { ExcepcionPrimaProyectadaService } from '../../../services/excepcion-prima-proyectada.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef, TooltipPosition } from '@angular/material';
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
      // console.log(this.selected);
      this.service.formCapital.get('Plan').disable();
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
      let plan = this.service.formCapital.get('Plan').value;
      let capital = this.service.formCapital.get('Capital').value;
      let existe = this.listaPlan.filter(x => x.Plan == plan && x.Capital == capital)[0];

      if (!this.service.formCapital.get('RowId').value) {
        // Entra acá si es un ingreso nuevo
        if (existe == undefined || existe == null) {
          await this.service.ingresarCapital(this.service.formCapital.value);
          this.service.formCapital.reset();
          this.service.initializeFormGroupCapital();
          this.notificationService.success(':: Excepción capital ingresada exitosamente');
          this.onClose();
        } else {
          this.notificationService.warn(':: Excepción capital ya existe');
        }
      } else {
        // Entra acá si viene con key y corresponde a un update, no se requiere validar existencia puesto que no se puede modificar
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
      this.service.cargarCombobox().subscribe(res => {
      this.listaPlanCombo = res;
    });
  }

  get userName() {
    return this.service.formCapital.get('userName');
  }
}
