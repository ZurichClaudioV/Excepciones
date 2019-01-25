import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { ExcepcionPoliza } from '../models/excepcion-poliza.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcepcionPolizaService {

  list: ExcepcionPoliza[];

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup ({
    RowId: new FormControl(null),

    // Campos obligatorios
    POL_SERIE: new FormControl('', Validators.required),
    POL_NRO: new FormControl('', Validators.required),
    FEC_INICIO: new FormControl('', Validators.required),

    // Campos texto utlizados en form excepciones poliza
    GTO_PR_BAS: new FormControl(''), // textbox
    TP_GTOPRBAS: new FormControl(''), // textbox
    GTO_X_PAGO: new FormControl(''), // textbox
    TP_GTOXPAGO: new FormControl(''), // textbox
    GTO_PR_REC: new FormControl(''), // textbox
    TP_GTOPRREC: new FormControl(''), // textbox
    PREMIO_PERM: new FormControl(''), // textbox
    TP_PREM_PER: new FormControl(''), // textbox

    CAR_RES_TOT: new FormControl(''), // textbox
    CAR_RES_PAR: new FormControl(''), // textbox
    GTO_FONDOS: new FormControl(''), // textbox
    CARGO_FIJO: new FormControl(''), // textbox
    TP_GTO_TRAS: new FormControl(''), // textbox

    // Checkbox del formulario
    IND_GTO_FON: new FormControl(false),
    IND_CAR_FIJ: new FormControl(false),
    IND_GTO_PBS: new FormControl(false),
    IND_GTO_PAG: new FormControl(false),
    IND_GTO_PRR: new FormControl(false),
    IND_CAR_RES: new FormControl(false),
    IND_CAR_REP: new FormControl(false),
    IND_PREM_PE: new FormControl(false),
    IND_GTO_TRA: new FormControl(false),

    // Campos enviar sin nada?
    CAR_CMB_MOD: new FormControl(''),
    POL_NUMASEG: new FormControl(''),
    NUM_EXCEP: new FormControl(''),
    TASA_GARANT: new FormControl(''),
    FORMA_CALC: new FormControl(''),
    GTO_CAPITAL: new FormControl(''),

    CAR_AD_PAGO: new FormControl(''),
    MTO_RENTA: new FormControl(''),
    PERIO_RENTA: new FormControl(''),
    GTO_X_TRASP: new FormControl(''),
    IND_GTO_CAP: new FormControl(''),

    FILLER: new FormControl(''),

    CTAFINPOLL0: new FormControl('')

  });

  initializeFormGroup() {
    this.form.setValue({
      RowId: null,

      // Campos obligatorios
      POL_SERIE: '',
      POL_NRO: '',
      FEC_INICIO: '',

      // Campos texto utlizados en form excepciones poliza
      GTO_PR_BAS: '', // textbox
      TP_GTOPRBAS: '', // textbox
      GTO_X_PAGO: '', // textbox
      TP_GTOXPAGO: '', // textbox
      GTO_PR_REC: '', // textbox
      TP_GTOPRREC: '', // textbox
      PREMIO_PERM: '', // textbox
      TP_PREM_PER: '', // textbox

      CAR_RES_TOT: '', // textbox
      CAR_RES_PAR: '', // textbox
      GTO_FONDOS: '', // textbox
      CARGO_FIJO: '', // textbox
      TP_GTO_TRAS: '', // textbox
      GTO_X_TRASP: '',
      // Checkbox del formulario
      IND_GTO_FON: false,
      IND_CAR_FIJ: false,
      IND_GTO_PBS: false,
      IND_GTO_PAG: false,
      IND_GTO_PRR: false,
      IND_CAR_RES: false,
      IND_CAR_REP: false,
      IND_PREM_PE: false,
      IND_GTO_TRA: false,

      // Campos enviar sin nada?
      CAR_CMB_MOD: new FormControl(''),
      POL_NUMASEG: new FormControl(''),
      NUM_EXCEP: new FormControl(''),
      TASA_GARANT: new FormControl(''),
      FORMA_CALC: new FormControl(''),
      GTO_CAPITAL: new FormControl(''),
      CAR_AD_PAGO: new FormControl(''),
      MTO_RENTA: new FormControl(''),
      PERIO_RENTA: new FormControl(''),
      IND_GTO_CAP: new FormControl(''),
      FILLER: new FormControl(''),

      CTAFINPOLL0: new FormControl('')
    });
  }

  ingresarExcepcionPoliza(formData): Observable<ExcepcionPoliza> {
    formData.RowId = 0;
    // Campos enviar sin nada?
    // CAR_CMB_MOD: new FormControl(''),
    // POL_NUMASEG: new FormControl(''),
    // NUM_EXCEP: new FormControl(''),
    // TASA_GARANT: new FormControl(''),
    // FORMA_CALC: new FormControl(''),
    // GTO_CAPITAL: new FormControl(''),

    // CAR_AD_PAGO: new FormControl(''),
    // MTO_RENTA: new FormControl(''),
    // PERIO_RENTA: new FormControl(''),
    // GTO_X_TRASP: new FormControl(''),
    // IND_GTO_CAP: new FormControl(''),

    // FILLER: new FormControl(''),

    // CTAFINPOLL0: new FormControl('')

    return this.http.post<ExcepcionPoliza>(environment.apiUrl + '/ExcepcionesPolizas', formData);
  }

  refreshList(form: FormGroup) {
    // this.http.get(environment.apiUrl + '/ExcepcionesPolizas')
    // .toPromise().then(res => this.list = res as ExcepcionPoliza[]);
    this.form.reset();
  }

  listaExcepcionesPoliza(): Observable<ExcepcionPoliza[]> {
    return this.http.get<ExcepcionPoliza[]>(environment.apiUrl + '/ExcepcionesPolizas');
    // return Observable.create(observer => {
    //   this.http.get(environment.apiUrl + '/ExcepcionesPolizas');
    // });
    // return this.http.get(environment.apiUrl + '/ExcepcionesPolizas')
    // .toPromise().then(res => this.list = res as ExcepcionPoliza[]);
   }

   obtenerExcepcionPolizaPorId(RowId: string): Observable<ExcepcionPoliza> {
    return this.http.get<ExcepcionPoliza>(environment.apiUrl + '/ExcepcionesPolizas/' + RowId);
   }

  modificarExcepcionPoliza(formData): Observable<ExcepcionPoliza> {
    return this.http.put<ExcepcionPoliza>(environment.apiUrl + '/ExcepcionesPolizas/' + formData.RowId.toString(), formData);
  }

  eliminarExcepcionPoliza(formData): Observable<ExcepcionPoliza> {
    return this.http.delete<ExcepcionPoliza>(environment.apiUrl + '/ExcepcionesPolizas/' + formData.RowId.toString());
  }

  populateForm(excepcionPoliza) {
    this.form.setValue(excepcionPoliza);
    //  Usamos lodash para omitir el nombre del departamento para que
    //  al igualar el objeto con info row con el del formulario, no
    //  tengamos problemas por diferencia de templates
  }

}
