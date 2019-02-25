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
    return this.http.post(environment.apiUrl + '/PrimaProyectada/', formData).toPromise();
  }

  listaExcepcionCapital(): Observable<ExcepcionPrimaProyectada[]> {
    return this.http.get<ExcepcionPrimaProyectada[]>(environment.apiUrl + '/PrimaProyectada/Capital');
  }

  cargarCombobox(): Observable<ExcepcionPrimaProyectada[]> {
    return this.http.get<ExcepcionPrimaProyectada[]>(environment.apiUrl + '/PrimaProyectada/Planes');
  }

  modificarExcepcionCapital(formData) {
    return this.http.put(environment.apiUrl + '/PrimaProyectada/' + formData.RowId.toString(), formData).toPromise();
  }

  eliminarExcepcionCapital(RowId): Observable<ExcepcionPrimaProyectada> {
    return this.http.delete<ExcepcionPrimaProyectada>(environment.apiUrl + '/PrimaProyectada/' + RowId);
  }

  populateFormCapital(excepcionCapital) {
    this.formCapital.setValue(_.omit(excepcionCapital, 'Edad'));
  }

  // Obtiene la lista para cargar combobox form Edad

  listaExcepcionesEdad(): Observable<ExcepcionPrimaProyectada[]> {
    return this.http.get<ExcepcionPrimaProyectada[]>(environment.apiUrl + '/PrimaProyectada/Edad');
  }
}
