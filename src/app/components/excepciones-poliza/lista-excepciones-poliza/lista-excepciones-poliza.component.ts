import { Component, OnInit, ViewChild } from '@angular/core';
import { ExcepcionPolizaService } from '../../../services/excepcion-poliza.service';
import { MatTableDataSource, MatSort, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ExcepcionPolizaComponent } from '../excepcion-poliza/excepcion-poliza.component';
import { NotificationService } from '../../../services/notification.service';
import { ExcepcionPoliza } from 'src/app/models/excepcion-poliza.model';
import { DialogoService } from 'src/app/services/dialogo.service';


@Component({
  selector: 'app-lista-excepciones-poliza',
  templateUrl: './lista-excepciones-poliza.component.html',
  styleUrls: ['./lista-excepciones-poliza.component.css']
})
export class ListaExcepcionesPolizaComponent extends MatPaginatorIntl implements OnInit  {

  constructor(public service: ExcepcionPolizaService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private dialogoService: DialogoService) {
                super();
               }

  listData: MatTableDataSource<ExcepcionPoliza>;
  datos: ExcepcionPoliza[];
  isLoadingResults = true;

  // Configuración de paginador, cambio de idioma utilizando MatPaginatorIntl
  itemsPerPageLabel = 'Excepciones-Póliza por página'; // Texto de items en la tabla
  nextPageLabel = 'Siguiente página'; // tooltip siguiente página
  previousPageLabel = 'Página anterior'; // tooltip página anterior
  lastPageLabel = 'Última página'; // tooltip última página
  firstPageLabel = 'Primera página'; // tooltip primera página

  displayedColumns: string[] = ['POL_SERIE', 'POL_NRO', 'FEC_INICIO', 'GTO_PR_BAS', 'TP_GTOPRBAS', 'GTO_X_PAGO', 'TP_GTOXPAGO', 'GTO_PR_REC', 'TP_GTOPRREC', 'PREMIO_PERM', 'TP_PREM_PER', 'GTO_X_TRASP', 'TP_GTO_TRAS', 'CAR_RES_TOT', 'CAR_RES_PAR', 'CARGO_FIJO', 'GTO_FONDOS', 'actions'];
  // displayedColumns: string[] = ['POL_SERIE', 'POL_NRO', 'FEC_INICIO', 'IND_GTO_PBS', 'GTO_PR_BAS', 'TP_GTOPRBAS', 'IND_GTO_PAG', 'GTO_X_PAGO', 'TP_GTOXPAGO', 'IND_GTO_PRR', 'GTO_PR_REC', 'TP_GTOPRREC', 'IND_PREM_PE', 'PREMIO_PERM', 'TP_PREM_PER', 'IND_GTO_TRA', 'GTO_X_TRASP', 'TP_GTO_TRAS', 'IND_CAR_RES', 'CAR_RES_TOT', 'IND_CAR_REP', 'CAR_RES_PAR', 'IND_CAR_FIJ', 'CARGO_FIJO', 'IND_GTO_FON', 'GTO_FONDOS', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  // ngOnChanges() {
  //   this.service.listaExcepcionesPoliza().subscribe(res => {
  //     this.datos = res;
  //     this.listData = new MatTableDataSource(this.datos);
  //     this.listData.sort = this.sort;
  //     this.listData.paginator = this.paginator;
  //     this.listData.filterPredicate = (data, filter) => {
  //       return this.displayedColumns.some(ele => {
  //         return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
  //       });
  //     };
  //   }, err => {
  //     console.log(err);
  //     this.isLoadingResults = false;
  //   });
  // }

  ngOnInit() {
      this.refrescarData();
      //   this.service.listaExcepcionesPoliza().subscribe(res => {
      //   this.datos = res;
      //   this.listData = new MatTableDataSource(this.datos);
      //   this.listData.sort = this.sort;
      //   this.listData.paginator = this.paginator;
      //   this.listData.filterPredicate = (data, filter) => {
      //     return this.displayedColumns.some(ele => {
      //       return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
      //     });
      //   };
      // }, err => {
      //   console.log(err);
      //   this.isLoadingResults = false;
      // });

      // this.listData = new MatTableDataSource<ExcepcionPoliza>(lista);
      // this.listData.sort = this.sort;
      // this.listData.paginator = this.paginator;
      // this.listData.filterPredicate = (data, filter) => {
      //   return this.displayedColumns.some(ele => {
      //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
      //   });
      // };
    }

    // Formatea el conteo de los items contados de 'of' a 'de'
    getRangeLabel = (page: number, pageSize: number, length: number) => {
      return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' de ' + length;
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
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.disableClose = true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.maxWidth = "80%";
    dialogoConfig.maxHeight = "80%";
    this.dialog.open(ExcepcionPolizaComponent, dialogoConfig).afterClosed().subscribe(res => {
      this.refrescarData();
    });
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.disableClose = true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.maxWidth = "80%";
    dialogoConfig.maxHeight = "80%";
    this.dialog.open(ExcepcionPolizaComponent, dialogoConfig).afterClosed().subscribe(res => {
      this.refrescarData();
    });
  }

  onDelete(RowId) {
    this.dialogoService.abrirConfirmarDialogo('¿Desea eliminar el registro?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.eliminarExcepcionPoliza(RowId.toString()).subscribe(() => {
          this.refrescarData();
      });
        this.notificationService.warn('Registro eliminado satisfactoriamente');
      }
    });
  }

  refrescarData() {
    this.service.listaExcepcionesPoliza().subscribe(res => {
      this.datos = res;
      this.listData = new MatTableDataSource(this.datos);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
        });
      };
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
}


}
