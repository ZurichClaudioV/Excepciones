import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig, MatPaginatorIntl } from '@angular/material';
import { Excepcion } from 'src/app/models/excepcion.model';
import { DialogoService } from 'src/app/services/dialogo.service';
import { ExcepcionService } from 'src/app/services/excepcion.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ExcepcionComponent } from '../excepcion/excepcion.component';

@Component({
  selector: 'app-lista-excepciones',
  templateUrl: './lista-excepciones.component.html',
  styleUrls: ['./lista-excepciones.component.css']
})
export class ListaExcepcionesComponent extends MatPaginatorIntl implements OnInit {

  constructor(public service: ExcepcionService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private dialogoService: DialogoService) {
                super();
               }

  listData: MatTableDataSource<any>;
  datos: Excepcion[];
  isLoadingResults = true;

  // Configuración de paginador, cambio de idioma utilizando MatPaginatorIntl
  itemsPerPageLabel = 'Excepciones por página'; // Texto de items en la tabla
  nextPageLabel = 'Siguiente página'; // tooltip siguiente página
  previousPageLabel = 'Página anterior'; // tooltip página anterior
  lastPageLabel = 'Última página'; // tooltip última página
  firstPageLabel = 'Primera página'; // tooltip primera página

  displayedColumns: string[] = ['NUM_EXCEP', 'NUM_SOLIC', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.refrescarData();
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' de ' + length;
  }

  refrescarData() {
    this.service.listaExcepciones().subscribe(res => {
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
  dialogConfig.maxWidth = "80%";
  dialogConfig.maxHeight = "80%";
  this.dialog.open(ExcepcionComponent, dialogConfig).afterClosed().subscribe(res => {
    this.refrescarData();
  });
}

onEdit(row) {
  this.service.populateForm(row);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.maxWidth = "80%";
  dialogConfig.maxHeight = "80%";
  this.dialog.open(ExcepcionComponent, dialogConfig).afterClosed().subscribe(res => {
    this.refrescarData();
  });
}

onDelete(RowId) {
  this.dialogoService.abrirConfirmarDialogo('¿Desea eliminar el registro?')
  .afterClosed().subscribe(res => {
    if (res) {
      this.service.eliminarExcepcion(RowId.toString()).subscribe(() => {
        this.refrescarData();
    });
      this.notificationService.warn('Registro eliminado satisfactoriamente');
    }
  });
}

}
