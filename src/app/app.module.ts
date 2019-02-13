import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { ExcepcionesComponent } from './components/excepciones/excepciones/excepciones.component';
import { ExcepcionComponent } from './components/excepciones/excepcion/excepcion.component';
import { ListaExcepcionesComponent } from './components/excepciones/lista-excepciones/lista-excepciones.component';
import { ExcepcionesPolizaComponent } from './components/excepciones-poliza/excepciones-poliza/excepciones-poliza.component';
import { ExcepcionPolizaComponent } from './components/excepciones-poliza/excepcion-poliza/excepcion-poliza.component';
import { ListaExcepcionesPolizaComponent } from './components/excepciones-poliza/lista-excepciones-poliza/lista-excepciones-poliza.component';
import { ExcepcionPolizaService } from './services/excepcion-poliza.service';
import { ExcepcionService } from './services/excepcion.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { APP_ROUTING } from './app.routes';
import { InicioComponent } from './components/inicio/inicio.component';
import { MatPaginatorIntl } from '@angular/material';
import { ExcepcionesPrimaProyectadaComponent } from './components/excepciones-prima-proyectada/excepciones-prima-proyectada/excepciones-prima-proyectada.component';
import { ListaExcepcionesCapitalComponent } from './components/excepciones-prima-proyectada/lista-excepciones-capital/lista-excepciones-capital.component';
import { ExcepcionCapitalComponent } from './components/excepciones-prima-proyectada/excepcion-capital/excepcion-capital.component';
import { ExcepcionEdadComponent } from './components/excepciones-prima-proyectada/excepcion-edad/excepcion-edad.component';
import { ListaExcepcionesEdadComponent } from './components/excepciones-prima-proyectada/lista-excepciones-edad/lista-excepciones-edad.component';
import { ExcepcionPrimaProyectadaService } from './services/excepcion-prima-proyectada.service';
import { AdminComponent } from './pages/dashboard/admin/admin.component';
import { LectorComponent } from './pages/dashboard/lector/lector.component';
import { SupervisorComponent } from './pages/dashboard/supervisor/supervisor.component';
import { AdminRoutingModule } from './pages/dashboard/admin/admin-routing.module';
import { LectorRoutingModule } from './pages/dashboard/lector/lector-routing.module';
import { SupervisorRoutingModule } from './pages/dashboard/supervisor/supervisor-routing.module';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    MatConfirmDialogComponent,
    ExcepcionesComponent,
    ExcepcionComponent,
    ListaExcepcionesComponent,
    ExcepcionesPolizaComponent,
    ExcepcionPolizaComponent,
    ListaExcepcionesPolizaComponent,
    NavbarComponent,
    InicioComponent,
    ExcepcionesPrimaProyectadaComponent,
    ListaExcepcionesCapitalComponent,
    ExcepcionCapitalComponent,
    ExcepcionEdadComponent,
    ListaExcepcionesEdadComponent,
    AdminComponent,
    LectorComponent,
    SupervisorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING,
    AdminRoutingModule,
    LectorRoutingModule,
    SupervisorRoutingModule,
    AppRoutingModule
  ],
  providers: [ExcepcionPrimaProyectadaService , ExcepcionPolizaService, ExcepcionService, DatePipe, {provide: MatPaginatorIntl, useClass: ListaExcepcionesCapitalComponent}, {provide: MatPaginatorIntl, useClass: ListaExcepcionesEdadComponent}, {provide: MatPaginatorIntl, useClass: ListaExcepcionesPolizaComponent}, {provide: MatPaginatorIntl, useClass: ListaExcepcionesComponent}],
  bootstrap: [AppComponent],
  entryComponents: [ExcepcionCapitalComponent, ExcepcionEdadComponent, ExcepcionPolizaComponent, ExcepcionComponent, MatConfirmDialogComponent] // se utiliza para asignar un popup de componente formulario
})
export class AppModule { }
