import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Globals } from '../shared/globals';
import { EPerfil } from '../shared/perfil.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthDashboardGuard implements CanLoad {
  constructor(private globals: Globals) {}

  canLoad(route: Route): boolean {
    if (!this.globals || !this.globals.user || !this.globals.user.Perfil) {
      return false;
    }

    return (this.globals.user.Perfil.Id === EPerfil.Lector && route.path === 'dashboard/lector')
          ||
          (this.globals.user.Perfil.Id === EPerfil.Administrador && route.path === 'dashboard/admin')
          ||
          (this.globals.user.Perfil.Id === EPerfil.Supervisor && route.path === 'dashboard/supervisor');
  }
}
