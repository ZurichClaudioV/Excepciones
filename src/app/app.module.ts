import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee/employee.component';
import { EmployeeService } from './shared/employee.service';
import { environment } from '../environments/environment';
import { DepartmentService } from './shared/department.service';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { ExcepcionesComponent } from './excepciones/excepciones/excepciones.component';
import { ExcepcionComponent } from './excepciones/excepcion/excepcion.component';
import { ListaExcepcionesComponent } from './excepciones/lista-excepciones/lista-excepciones.component';
import { ExcepcionesPolizaComponent } from './excepciones-poliza/excepciones-poliza/excepciones-poliza.component';
import { ExcepcionPolizaComponent } from './excepciones-poliza/excepcion-poliza/excepcion-poliza.component';
import { ListaExcepcionesPolizaComponent } from './excepciones-poliza/lista-excepciones-poliza/lista-excepciones-poliza.component';
import { ExcepcionPolizaService } from './shared/excepcion-poliza.service';



@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    MatConfirmDialogComponent,
    ExcepcionesComponent,
    ExcepcionComponent,
    ListaExcepcionesComponent,
    ExcepcionesPolizaComponent,
    ExcepcionPolizaComponent,
    ListaExcepcionesPolizaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    HttpClientModule
  ],
  providers: [EmployeeService, ExcepcionPolizaService, DepartmentService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeComponent, ExcepcionPolizaComponent, MatConfirmDialogComponent] // se utiliza para asignar un popup de componente formulario
})
export class AppModule { }
