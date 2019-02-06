import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import * as _ from 'lodash';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ExcepcionPoliza } from '../models/excepcion-poliza.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcepcionPolizaService {

  constructor(private http: HttpClient,
              public datepipe: DatePipe) {

                this.form = new FormGroup ({
                  RowId: new FormControl(null),

                  // Campos obligatorios
                  POL_SERIE: new FormControl('', Validators.required),
                  POL_NRO: new FormControl('', Validators.required),
                  FEC_INICIO: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]), // validaFechaMenorQueHoy

                  // Campos texto utlizados en form excepciones poliza
                  GTO_PR_BAS: new FormControl({value: '', disabled: true}), // textbox
                  TP_GTOPRBAS: new FormControl({value: '', disabled: true}), // textbox
                  GTO_X_PAGO: new FormControl({value: '', disabled: true}), // textbox
                  TP_GTOXPAGO: new FormControl({value: '', disabled: true}), // textbox
                  GTO_PR_REC: new FormControl({value: '', disabled: true}), // textbox
                  TP_GTOPRREC: new FormControl({value: '', disabled: true}), // textbox
                  PREMIO_PERM: new FormControl({value: '', disabled: true}), // textbox
                  TP_PREM_PER: new FormControl({value: '', disabled: true}), // textbox

                  CAR_RES_TOT: new FormControl({value: '', disabled: true}), // textbox
                  CAR_RES_PAR: new FormControl({value: '', disabled: true}), // textbox
                  GTO_FONDOS: new FormControl({value: '', disabled: true}), // textbox
                  CARGO_FIJO: new FormControl({value: '', disabled: true}), // textbox
                  TP_GTO_TRAS: new FormControl({value: '', disabled: true}), // textbox
                  GTO_X_TRASP: new FormControl({value: '', disabled: true}),

                  // Checkbox del formulario
                  IND_GTO_FON: new FormControl(0),
                  IND_CAR_FIJ: new FormControl(0),
                  IND_GTO_PBS: new FormControl(0),
                  IND_GTO_PAG: new FormControl(0),
                  IND_GTO_PRR: new FormControl(0),
                  IND_CAR_RES: new FormControl(0),
                  IND_CAR_REP: new FormControl(0),
                  IND_PREM_PE: new FormControl(0),
                  IND_GTO_TRA: new FormControl(0),

                  // Campos enviar sin nada?
                  // CAR_CMB_MOD: new FormControl(''),
                  // POL_NUMASEG: new FormControl(''),
                  // NUM_EXCEP: new FormControl('')
                  // TASA_GARANT: new FormControl(''),
                  // FORMA_CALC: new FormControl(''),
                  // GTO_CAPITAL: new FormControl(''),

                  // CAR_AD_PAGO: new FormControl(''),
                  // MTO_RENTA: new FormControl(''),
                  // PERIO_RENTA: new FormControl(''),
                  // IND_GTO_CAP: new FormControl(''),
                  // FILLER: new FormControl(''),

                  // CTAFINPOLL0: new FormControl('')

                });

                this.onChanges();
  }

  form: FormGroup;

  // form: FormGroup = new FormGroup ({
  //   RowId: new FormControl(null),

  //   // Campos obligatorios
  //   POL_SERIE: new FormControl('', Validators.required),
  //   POL_NRO: new FormControl('', Validators.required),
  //   FEC_INICIO: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]), // validaFechaMenorQueHoy

  //   // Campos texto utlizados en form excepciones poliza
  //   GTO_PR_BAS: new FormControl({value: '', disabled: true}), // textbox
  //   TP_GTOPRBAS: new FormControl({value: '', disabled: true}), // textbox
  //   GTO_X_PAGO: new FormControl({value: '', disabled: true}), // textbox
  //   TP_GTOXPAGO: new FormControl({value: '', disabled: true}), // textbox
  //   GTO_PR_REC: new FormControl({value: '', disabled: true}), // textbox
  //   TP_GTOPRREC: new FormControl({value: '', disabled: true}), // textbox
  //   PREMIO_PERM: new FormControl({value: '', disabled: true}), // textbox
  //   TP_PREM_PER: new FormControl({value: '', disabled: true}), // textbox

  //   CAR_RES_TOT: new FormControl({value: '', disabled: true}), // textbox
  //   CAR_RES_PAR: new FormControl({value: '', disabled: true}), // textbox
  //   GTO_FONDOS: new FormControl({value: '', disabled: true}), // textbox
  //   CARGO_FIJO: new FormControl({value: '', disabled: true}), // textbox
  //   TP_GTO_TRAS: new FormControl({value: '', disabled: true}), // textbox
  //   GTO_X_TRASP: new FormControl({value: '', disabled: true}),

  //   // Checkbox del formulario
  //   IND_GTO_FON: new FormControl(0),
  //   IND_CAR_FIJ: new FormControl(0),
  //   IND_GTO_PBS: new FormControl(0),
  //   IND_GTO_PAG: new FormControl(0),
  //   IND_GTO_PRR: new FormControl(0),
  //   IND_CAR_RES: new FormControl(0),
  //   IND_CAR_REP: new FormControl(0),
  //   IND_PREM_PE: new FormControl(0),
  //   IND_GTO_TRA: new FormControl(0),

    // Campos enviar sin nada?
    // CAR_CMB_MOD: new FormControl(''),
    // POL_NUMASEG: new FormControl(''),
    // NUM_EXCEP: new FormControl('')
    // TASA_GARANT: new FormControl(''),
    // FORMA_CALC: new FormControl(''),
    // GTO_CAPITAL: new FormControl(''),

    // CAR_AD_PAGO: new FormControl(''),
    // MTO_RENTA: new FormControl(''),
    // PERIO_RENTA: new FormControl(''),
    // IND_GTO_CAP: new FormControl(''),
    // FILLER: new FormControl(''),

    // CTAFINPOLL0: new FormControl('')

  // });


  // validarAsync(formPadre: FormControl): {[s: string]: boolean} {
  //   if (formPadre.value === 0) {
  //     return {valida: false};
  //   }
  //   return {valida: true};
  // }

  onChanges() {
    this.form.get("IND_GTO_PBS").valueChanges.subscribe(value => {
      if (!value) {
        this.form.get("GTO_PR_BAS").disable();
        this.form.get("TP_GTOPRBAS").disable();
      } else {
        this.form.get("GTO_PR_BAS").enable();
        this.form.get("TP_GTOPRBAS").enable();
      }
    });

    this.form.get("IND_GTO_PAG").valueChanges.subscribe(value => {
      if (!value) {
        this.form.get('GTO_X_PAGO').disable();
        this.form.get('TP_GTOXPAGO').disable();
      } else {
        this.form.get('GTO_X_PAGO').enable();
        this.form.get('TP_GTOXPAGO').enable();
      }
    });

    this.form.get("IND_GTO_PRR").valueChanges.subscribe(value => {
      if (!value) {
        this.form.get('GTO_PR_REC').disable();
        this.form.get('TP_GTOPRREC').disable();
      } else {
        this.form.get('GTO_PR_REC').enable();
        this.form.get('TP_GTOPRREC').enable();
      }
    });

    this.form.get("IND_PREM_PE").valueChanges.subscribe(value => {
      if (!value) {
        this.form.get('PREMIO_PERM').disable();
        this.form.get('TP_PREM_PER').disable();
      } else {
        this.form.get('PREMIO_PERM').enable();
        this.form.get('TP_PREM_PER').enable();
      }
    });

    this.form.get("IND_GTO_TRA").valueChanges.subscribe(value => {
      if (!value) {
        this.form.get('GTO_X_TRASP').disable();
        this.form.get('TP_GTO_TRAS').disable();
      } else {
        this.form.get('GTO_X_TRASP').enable();
        this.form.get('TP_GTO_TRAS').enable();
      }
    });

    this.form.get("IND_CAR_RES").valueChanges.subscribe(value => {
      if (!value) {
        this.form.get('CAR_RES_TOT').disable();
      } else {
        this.form.get('CAR_RES_TOT').enable();
      }
    });

    this.form.get("IND_CAR_REP").valueChanges.subscribe(value => {
      if (!value) {
        this.form.get('CAR_RES_PAR').disable();
      } else {
        this.form.get('CAR_RES_PAR').enable();
      }
    });

    this.form.get("IND_GTO_FON").valueChanges.subscribe(value => {
      if (!value) {
        this.form.get('GTO_FONDOS').disable();
      } else {
        this.form.get('GTO_FONDOS').enable();
      }
    });

    this.form.get("IND_CAR_FIJ").valueChanges.subscribe(value => {
      if (!value) {
        this.form.get('CARGO_FIJO').disable();
      } else {
        this.form.get('CARGO_FIJO').enable();
      }
    });
  }


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
      GTO_X_TRASP: '', // textbox

      // Checkbox del formulario

      IND_GTO_FON: 0,
      IND_CAR_FIJ: 0,
      IND_GTO_PBS: 0,
      IND_GTO_PAG: 0,
      IND_GTO_PRR: 0,
      IND_CAR_RES: 0,
      IND_CAR_REP: 0,
      IND_PREM_PE: 0,
      IND_GTO_TRA: 0,

      // Campos enviar sin nada?
      // CAR_CMB_MOD: ' ',
      // POL_NUMASEG: ' ',
      // NUM_EXCEP: '',
      // TASA_GARANT: ' ',
      // FORMA_CALC: ' ',
      // GTO_CAPITAL: ' ',
      // CAR_AD_PAGO: ' ',
      // MTO_RENTA: ' ',
      // PERIO_RENTA: ' ',
      // IND_GTO_CAP: ' ',
      // FILLER: ' ',

      // CTAFINPOLL0: ' '
    });

      // this.form.get('GTO_PR_BAS').disable();
      // this.form.get('TP_GTOPRBAS').disable();
      // this.form.get('GTO_X_PAGO').disable();
      // this.form.get('TP_GTOXPAGO').disable();
      // this.form.get('GTO_PR_REC').disable();
      // this.form.get('TP_GTOPRREC').disable();
      // this.form.get('PREMIO_PERM').disable();
      // this.form.get('TP_PREM_PER').disable();

      // this.form.get('CAR_RES_TOT').disable();
      // this.form.get('CAR_RES_PAR').disable();
      // this.form.get('GTO_FONDOS').disable();
      // this.form.get('CARGO_FIJO').disable();
      // this.form.get('TP_GTO_TRAS').disable();
      // this.form.get('GTO_X_TRASP').disable();

  }

  ingresarExcepcionPoliza(formData): Observable<ExcepcionPoliza> {
    formData.RowId = 0;
    formData.FEC_INICIO = this.datepipe.transform(formData.FEC_INICIO, 'yyyyMMdd');
    // console.log(formData.FEC_INICIO);
    // console.log(formData);
    // formData.CAR_CMB_MOD = ' ';
    // formData.POL_NUMASEG = ' ';
    // formData.NUM_EXCEP = ' ';
    // formData.TASA_GARANT = ' ';
    // formData.FORMA_CALC = ' ';
    // formData.GTO_CAPITAL = '';

    // formData.CAR_AD_PAGO = ' ';
    // formData.MTO_RENTA = ' ';
    // formData.PERIO_RENTA = ' ';
    // formData.GTO_X_TRASP = ' ';
    // formData.IND_GTO_CAP = ' ';

    // formData.FILLER = ' ';

    // formData.CTAFINPOLL0 = ' ';

    return this.http.post<ExcepcionPoliza>(environment.apiUrl + '/ExcepcionesPolizas', formData);
  }

  // refreshList(form: FormGroup) {
  //   // this.http.get(environment.apiUrl + '/ExcepcionesPolizas')
  //   // .toPromise().then(res => this.list = res as ExcepcionPoliza[]);
  //   this.form.reset();
  // }

  listaExcepcionesPoliza(): Observable<ExcepcionPoliza[]> {
    return this.http.get<ExcepcionPoliza[]>(environment.apiUrl + '/ExcepcionesPolizas');
    // return Observable.create(observer => {
    //   this.http.get(environment.apiUrl + '/ExcepcionesPolizas');
    // });
    // return this.http.get(environment.apiUrl + '/ExcepcionesPolizas')
    // .toPromise().then(res => this.list = res as ExcepcionPoliza[]);
   }

   listaNumExc(): Observable<Number[]> {
    return this.http.get<Number[]>(environment.apiUrl + '/ExcepcionesPolizas/Excepcion/');
    // return Observable.create(observer => {
    //   this.http.get(environment.apiUrl + '/ExcepcionesPolizas');
    // });
    // return this.http.get(environment.apiUrl + '/ExcepcionesPolizas')
    // .toPromise().then(res => this.list = res as ExcepcionPoliza[]);
   }


   obtenerExcepcionPolizaPorNumExc(NUM_EXC: Number): Observable<ExcepcionPoliza> {
    // http://10.117.3.69/WebApplication6/api/ExcepcionesPolizas/Excepcion/1
    return this.http.get<ExcepcionPoliza>(environment.apiUrl + '/ExcepcionesPolizas/Excepcion/' + NUM_EXC);
   }

   obtenerExcepcionPolizaPorId(RowId: string): Observable<ExcepcionPoliza> {
    return this.http.get<ExcepcionPoliza>(environment.apiUrl + '/ExcepcionesPolizas/' + RowId);
   }

  modificarExcepcionPoliza(formData): Observable<ExcepcionPoliza> {
    formData.FEC_INICIO = this.datepipe.transform(formData.FEC_INICIO, 'yyyyMMdd');
    return this.http.put<ExcepcionPoliza>(environment.apiUrl + '/ExcepcionesPolizas/' + formData.RowId.toString(), formData);
  }

  eliminarExcepcionPoliza(RowId: string): Observable<ExcepcionPoliza> {
    return this.http.delete<ExcepcionPoliza>(environment.apiUrl + '/ExcepcionesPolizas/' + RowId);
  }

  populateForm(excepcionPoliza) {
    // Descomponemos la fecha obtenida de la fila para luego formatearla
    let year = excepcionPoliza.FEC_INICIO.toString().substring(0, 4);
    let month = excepcionPoliza.FEC_INICIO.toString().substring(4, 6);
    let day = excepcionPoliza.FEC_INICIO.toString().substring(6, 8);

    // Creamos una variable date con nuestro string formateado y procedemos a naturalizar su valor con el de su respectivo timezone
    // ya que sin hacer esto el datepicker quedara un día diferenciado según la diferencia por defecto con la de la nueva zona horaria.
    let dateSet = new Date(`${year}-${month}-${day}`);
    dateSet.setMinutes(dateSet.getMinutes() + dateSet.getTimezoneOffset());
    excepcionPoliza.FEC_INICIO = dateSet;

    // Omitimos campos no utilizados por el frontend con ayuda del lodash para evitar errores de referencia.
    this.form.setValue(_.omit(excepcionPoliza, 'POL_NUMASEG', 'NUM_EXCEP',
    'TASA_GARANT', 'FORMA_CALC', 'GTO_CAPITAL', 'CAR_AD_PAGO', 'MTO_RENTA',
     'PERIO_RENTA', 'IND_GTO_CAP', 'CAR_CMB_MOD', 'FILLER', 'CTAFINPOLL0' ));

    // if (excepcionPoliza.IND_GTO_PBS == 0) {
    //   this.form.controls['GTO_PR_BAS'].disable();
    //   this.form.controls['TP_GTOPRBAS'].disable();
    // } else {
    //   this.form.controls['GTO_PR_BAS'].enable();
    //   this.form.controls['TP_GTOPRBAS'].enable();
    // }

    // if (excepcionPoliza.IND_GTO_PAG == 0) {
    //   this.form.controls['GTO_X_PAGO'].disable();
    //   this.form.controls['TP_GTOXPAGO'].disable();
    // } else {
    //   this.form.controls['GTO_X_PAGO'].enable();
    //   this.form.controls['TP_GTOXPAGO'].enable();
    // }

    // if (excepcionPoliza.IND_GTO_PRR == 0) {
    //   this.form.controls['GTO_PR_REC'].disable();
    //   this.form.controls['TP_GTOPRREC'].disable();
    // } else {
    //   this.form.controls['GTO_PR_REC'].enable();
    //   this.form.controls['TP_GTOPRREC'].enable();
    // }

    // if (excepcionPoliza.IND_PREM_PE == 0) {
    //   this.form.controls['PREMIO_PERM'].disable();
    //   this.form.controls['TP_PREM_PER'].disable();
    // } else {
    //   this.form.controls['PREMIO_PERM'].enable();
    //   this.form.controls['TP_PREM_PER'].enable();
    // }

    // if (excepcionPoliza.IND_GTO_TRA == 0) {
    //   this.form.controls['GTO_X_TRASP'].disable();
    //   this.form.controls['TP_GTO_TRAS'].disable();
    // } else {
    //   this.form.controls['GTO_X_TRASP'].enable();
    //   this.form.controls['TP_GTO_TRAS'].enable();
    // }

    // if (excepcionPoliza.IND_CAR_RES == 0) {
    //   this.form.controls['CAR_RES_TOT'].disable();
    // } else {
    //   this.form.controls['CAR_RES_TOT'].enable();
    // }

    // if (excepcionPoliza.IND_CAR_REP == 0) {
    //   this.form.controls['CAR_RES_PAR'].disable();
    // } else {
    //   this.form.controls['CAR_RES_PAR'].enable();
    // }

    // if (excepcionPoliza.IND_GTO_FON == 0) {
    //   this.form.controls['GTO_FONDOS'].disable();
    // } else {
    //   this.form.controls['GTO_FONDOS'].enable();
    // }

    // if (excepcionPoliza.IND_CAR_FIJ == 0) {
    //   this.form.controls['CARGO_FIJO'].disable();
    // } else {
    //   this.form.controls['CARGO_FIJO'].enable();
    // }

  }

  // deleteProduct (RowId): Observable<ExcepcionPoliza> {
  //   const url = environment.apiUrl + '/ExcepcionesPolizas/' + RowId;
  //   return this.http.delete<ExcepcionPoliza>(url);
  //   // return this.http.delete<ExcepcionPoliza>(url).pipe(
  //   //   // tslint:disable-next-line:no-shadowed-variable
  //   //   tap(_ => console.log(`deleted ExcepcionPoliza id=${RowId}`)),
  //   //   catchError(this.handleError<ExcepcionPoliza>('deleteProduct'))
  //   // );
  // }

  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  // emailDomainValidator(control: FormControl) {
  //   const now = new Date();
  //   let year = now.getFullYear();
  //   let month = now.getMonth();
  //   let day = new Date(year, month, 0).getDate();
  //   let fechaFormateadaHoy = +(`${year}+${month}+${day}`);
  //   if (+(control.value) < fechaFormateadaHoy) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }


}