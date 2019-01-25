import { Component, OnInit, ViewChild } from '@angular/core';
import { ExcepcionPolizaService } from '../../shared/excepcion-poliza.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ExcepcionPolizaComponent } from '../excepcion-poliza/excepcion-poliza.component';
import { NotificationService } from '../../shared/notification.service';
import { ExcepcionPoliza } from 'src/app/models/excepcion-poliza.model';
import { DialogoService } from 'src/app/shared/dialogo.service';


@Component({
  selector: 'app-lista-excepciones-poliza',
  templateUrl: './lista-excepciones-poliza.component.html',
  styleUrls: ['./lista-excepciones-poliza.component.css']
})
export class ListaExcepcionesPolizaComponent implements OnInit {

  constructor(private service: ExcepcionPolizaService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private dialogoService: DialogoService) { }

  listData: MatTableDataSource<any>;
  datos: ExcepcionPoliza[];
  isLoadingResults = true;

  displayedColumns: string[] = ['POL_SERIE', 'POL_NRO', 'FEC_INICIO', 'IND_GTO_PBS', 'GTO_PR_BAS', 'TP_GTOPRBAS', 'IND_GTO_PAG', 'GTO_X_PAGO', 'TP_GTOXPAGO', 'IND_GTO_PRR', 'GTO_PR_REC', 'TP_GTOPRREC', 'IND_PREM_PE', 'PREMIO_PERM', 'TP_PREM_PER', 'IND_GTO_TRA', 'GTO_X_TRASP', 'TP_GTO_TRAS', 'IND_CAR_RES', 'CAR_RES_TOT', 'IND_CAR_REP', 'CAR_RES_PAR', 'IND_CAR_FIJ', 'CARGO_FIJO', 'IND_GTO_FON', 'GTO_FONDOS', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
        this.service.listaExcepcionesPoliza().subscribe(res => {
        this.datos = res;
        this.listData = new MatTableDataSource(this.datos);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

      // this.listData = new MatTableDataSource<ExcepcionPoliza>(lista);
      // this.listData.sort = this.sort;
      // this.listData.paginator = this.paginator;
      // this.listData.filterPredicate = (data, filter) => {
      //   return this.displayedColumns.some(ele => {
      //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
      //   });
      // };
    }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "80%";
    this.dialog.open(ExcepcionPolizaComponent, dialogConfig);
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "80%";
    this.dialog.open(ExcepcionPolizaComponent, dialogConfig);
  }

  onDelete(RowId) {
    // if (confirm('Are you sure to delete this record?')) {
    //   this.service.deleteEmployee($key);
    //   this.notificationService.warn('! Deleted successfully');
    // }
    this.dialogoService.abrirConfirmarDialogo('¿Desea eliminar el registro?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.eliminarExcepcionPoliza(RowId);
        this.notificationService.warn('Registro eliminado satisfactoriamente');
      }
    });
  }


}
