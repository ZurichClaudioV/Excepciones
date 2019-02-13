import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorIntl, MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { ExcepcionPrimaProyectadaService } from 'src/app/services/excepcion-prima-proyectada.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogoService } from 'src/app/services/dialogo.service';
import { ExcepcionPrimaProyectada } from 'src/app/models/excepcion-prima-proyectada.model';
import { ExcepcionEdadComponent } from '../excepcion-edad/excepcion-edad.component';

@Component({
  selector: 'app-lista-excepciones-edad',
  templateUrl: './lista-excepciones-edad.component.html',
  styleUrls: ['./lista-excepciones-edad.component.css']
})
export class ListaExcepcionesEdadComponent extends MatPaginatorIntl implements OnInit {

  constructor(public service: ExcepcionPrimaProyectadaService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private dialogoService: DialogoService) {
                super();
               }

  listData: MatTableDataSource<any>;
  datos: ExcepcionPrimaProyectada[];
  isLoadingResults = true;

  // Configuración de paginador, cambio de idioma utilizando MatPaginatorIntl
  itemsPerPageLabel = 'Excepciones Capital por página'; // Texto de items en la tabla
  nextPageLabel = 'Siguiente página'; // tooltip siguiente página
  previousPageLabel = 'Página anterior'; // tooltip página anterior
  lastPageLabel = 'Última página'; // tooltip última página
  firstPageLabel = 'Primera página'; // tooltip primera página

  displayedColumns: string[] = ['NombrePlan', 'Capital', 'PrimaAnual', 'PrimaMensual', 'actions'];
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
    this.service.listaExcepcionesEdad().subscribe(res => {
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
    this.service.initializeFormGroupCapital();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "80%";
    dialogConfig.maxHeight = "80%";
    this.dialog.open(ExcepcionEdadComponent, dialogConfig).afterClosed()
    .subscribe(() => {
      this.refrescarData();
    });
  }

  onEdit(row) {
    this.service.populateFormCapital(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "80%";
    dialogConfig.maxHeight = "80%";
    this.dialog.open(ExcepcionEdadComponent, dialogConfig).afterClosed()
    .subscribe(() => {
      this.refrescarData();
    });
  }

  onDelete(RowId) {
    this.dialogoService.abrirConfirmarDialogo('¿Desea eliminar el registro?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.eliminarExcepcionCapital(RowId.toString()).subscribe(() => {
          this.refrescarData();
          this.notificationService.success(':: Registro eliminado satisfactoriamente');
      }, err => {
        console.log(err);
        this.notificationService.warn(':: Se ha producido un error');
      });
      }
    });
  }

}
