import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogoService {

  constructor(private dialogo: MatDialog) { }

  abrirConfirmarDialogo(msg) {
    return this.dialogo.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: false,
      position: { top: "10px" },
      data: {
        message: msg
       }
    });
  }
}
