import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcepcionService } from 'src/app/services/excepcion.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ExcepcionPolizaService } from '../../../services/excepcion-poliza.service';
import { ExcepcionPoliza } from 'src/app/models/excepcion-poliza.model';


@Component({
  selector: 'app-excepcion',
  templateUrl: './excepcion.component.html',
  styleUrls: ['./excepcion.component.css']
})
export class ExcepcionComponent implements OnInit {

  constructor(public service: ExcepcionService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<ExcepcionComponent>,
              private servicePoli: ExcepcionPolizaService) { }

  listaNumExc: Number[];
  selected2;
  seleccione = 'Seleccione';

  listData: MatTableDataSource<ExcepcionPoliza>;
  datos: ExcepcionPoliza[] = [];
  isVisible = false;
  isLoadingResults = true;

  displayedColumns: string[] = ['GTO_PR_BAS', 'TP_GTOPRBAS', 'GTO_X_PAGO', 'TP_GTOXPAGO', 'GTO_PR_REC', 'TP_GTOPRREC', 'PREMIO_PERM', 'TP_PREM_PER', 'GTO_X_TRASP', 'TP_GTO_TRAS', 'CAR_RES_TOT', 'CAR_RES_PAR', 'CARGO_FIJO', 'GTO_FONDOS'];

  ngOnInit() {

    this.populateListaNumExc();

    if (!this.service.form.get('RowId').value) {
      this.service.form.reset();
      this.service.initializeFormGroup();
    } else {
      this.selected2 = this.service.form.get('NUM_EXCEP').value;
      this.onSelectedChange(this.selected2);
      // this.service.form.controls['NUM_EXCEP'].setValue(this.service.form.);
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
        this.service.ingresarExcepcion(this.service.form.value).subscribe();
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Excepción ingresada exitosamente');
        this.onClose();
      } else {
        // Entra acá si viene con key y corresponde a un update
        this.service.modificarExcepcion(this.service.form.value).subscribe();
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Excepción modificada exitosamente');
        this.onClose();
      }
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onSelectedChange(selected2: Number) {

    if (selected2 != 0) {
      this.servicePoli.obtenerExcepcionPolizaPorNumExc(selected2).subscribe(res => {
        if (res != null) {
          this.datos = [];
          this.isVisible = true;
          this.datos.push(res);
          this.listData = new MatTableDataSource(this.datos);
        } else {
          this.isVisible = false;
        }
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    } else {
      this.selected2 = 0;
      this.datos = [];
      this.isVisible = false;
    }
  }

  populateListaNumExc() {
    this.servicePoli.listaNumExc().subscribe(res => {
      this.listaNumExc = res;
    });
  }

}
