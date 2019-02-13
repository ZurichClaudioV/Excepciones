import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ExcepcionPrimaProyectada } from '../models/excepcion-prima-proyectada.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { selectDistintoCero, limiteCapital, limiteEdad } from '../shared/validator';

@Injectable({
  providedIn: 'root'
})
export class ExcepcionPrimaProyectadaService {

  constructor(private http: HttpClient) { }

  formCapital: FormGroup = new FormGroup ({
    RowId: new FormControl(''),
    Plan: new FormControl([0], [Validators.required, selectDistintoCero]),
    NombrePlan: new FormControl(''),
    Capital: new FormControl('', [Validators.required, limiteCapital(0, 99999), limiteEdad(1, 99)]),
    PrimaAnual: new FormControl(''),
    PrimaMensual: new FormControl('')
  });

  // Capital

  initializeFormGroupCapital() {
    this.formCapital.setValue({
      RowId: '',
      Plan: [0],
      NombrePlan: '',
      Capital: '',
      PrimaAnual: '',
      PrimaMensual: ''
    });
  }

  ingresarCapital(formData) {
    formData.RowId = '';
    console.log(formData);
    return this.http.post(environment.apiUrl + '/PrimaProyectadas/', formData).toPromise();
  }

  listaExcepcionCapital(): Observable<ExcepcionPrimaProyectada[]> {
    return this.http.get<ExcepcionPrimaProyectada[]>(environment.apiUrl + '/PrimaProyectadas/Capital');
   }

  modificarExcepcionCapital(formData) {
    console.log(formData);
    return this.http.put(environment.apiUrl + '/PrimaProyectadas/' + formData.RowId.toString(), formData).toPromise();
  }

  eliminarExcepcionCapital(RowId): Observable<ExcepcionPrimaProyectada> {
    return this.http.delete<ExcepcionPrimaProyectada>(environment.apiUrl + '/PrimaProyectadas/' + RowId);
  }

  populateFormCapital(excepcionCapital) {
    this.formCapital.setValue(_.omit(excepcionCapital, 'Edad'));
  }

  // Edad

  listaExcepcionesEdad(): Observable<ExcepcionPrimaProyectada[]> {
    return this.http.get<ExcepcionPrimaProyectada[]>(environment.apiUrl + '/PrimaProyectadas/Edad');
   }

  // initializeFormGroupEdad() {
  //   this.formEdad.setValue({
  //     Plan: [0],
  //     NombrePlan: '',
  //     Edad: '',
  //     PrimaAnual: '',
  //     PrimaMensual: ''
  //   });
  // }

  // ingresarEdad(formData): Observable<ExcepcionPrimaProyectada> {
  //   formData.Capital = 0;
  //   return this.http.post<ExcepcionPrimaProyectada>(environment.apiUrl + '/PrimaProyectadas/Edad', formData);
  // }

  // //  obtenerExcepcionPorId(RowId: string): Observable<ExcepcionPrimaProyectada> {
  // //   return this.http.get<ExcepcionPrimaProyectada>(environment.apiUrl + '/Excepciones/' + RowId);
  // //  }

  // modificarExcepcionEdad(formData): Observable<ExcepcionPrimaProyectada> {
  //   formData.Capital = 0;
  //   return this.http.put<ExcepcionPrimaProyectada>(environment.apiUrl + '/PrimaProyectadas/Edad/', formData);
  // }

  // eliminarExcepcionEdad(Plan: string, Edad: string): Observable<ExcepcionPrimaProyectada> {
  //   return this.http.delete<ExcepcionPrimaProyectada>(environment.apiUrl + '/PrimaProyectadas/Edad/' + Plan + '/' + Edad);
  // }

  // populateFormEdad(excepcionEdad) {
  //   this.formEdad.setValue(_.omit(excepcionEdad, 'Capital'));
  // }

}
