import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  exito(msg) {
    this.config['panelClass'] = ['notificacion', 'success'];
    this.snackBar.open(msg, '', this.config);
  }

  error(msg) {
    this.config['panelClass'] = ['notificacion', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}
