import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Excepcion } from '../models/excepcion.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { selectDistintoCero } from '../shared/validator';

@Injectable({
  providedIn: 'root'
})
export class ExcepcionService {

  constructor(private http: HttpClient) { }


  form: FormGroup = new FormGroup ({
    RowId: new FormControl(null),
    NUM_EXCEP: new FormControl([0], [Validators.required, selectDistintoCero]),
    NUM_COTIZ: new FormControl(''),
    NUM_SOLIC: new FormControl('', Validators.required),
    NUM_POLIZ: new FormControl(''),
    SER_POLIZ: new FormControl(''),

    // no es necesario
    FILLER: new FormControl(''),
  });


  initializeFormGroup() {
    this.form.setValue({
      RowId: null,
      NUM_EXCEP: [0],
      NUM_COTIZ: '',
      NUM_SOLIC: '',
      NUM_POLIZ: '',
      SER_POLIZ: '',

      // no es necesario
      FILLER: ''
    });
  }

  ingresarExcepcion(formData): Observable<Excepcion> {
    formData.RowId = 0;
    formData.NUM_COTIZ = formData.NUM_SOLIC;
    formData.NUM_POLIZ = formData.NUM_SOLIC;
    formData.SER_POLIZ = ' ';
    formData.FILLER = ' ';
    return this.http.post<Excepcion>(environment.apiUrl + '/Excepciones', formData);
  }

  listaExcepciones(): Observable<Excepcion[]> {
    return this.http.get<Excepcion[]>(environment.apiUrl + '/Excepciones');
   }

   obtenerExcepcionPorId(RowId: string): Observable<Excepcion> {
    return this.http.get<Excepcion>(environment.apiUrl + '/Excepciones/' + RowId);
   }

  modificarExcepcion(formData): Observable<Excepcion> {
    formData.NUM_COTIZ = formData.NUM_SOLIC;
    formData.NUM_POLIZ = formData.NUM_SOLIC;
    formData.SER_POLIZ = ' ';
    formData.FILLER = ' ';
    return this.http.put<Excepcion>(environment.apiUrl + '/Excepciones/' + formData.RowId.toString(), formData);
  }

  eliminarExcepcion(RowId: string): Observable<Excepcion> {
    return this.http.delete<Excepcion>(environment.apiUrl + '/Excepciones/' + RowId);
  }

  populateForm(excepcion) {
    this.form.setValue(_.omit(excepcion, 'EXCEPCONDL0', 'EXCEPCONDL1', 'EXCEPCONDL2', 'EXCEPCONDL3'));
  }

}
