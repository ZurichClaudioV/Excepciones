import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Globals } from '../shared/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private globals: Globals) {}

  canLoad(): boolean {
    if (!this.globals || !this.globals.user) {
      return false;
    } else {
      return true;
    }

    // return this.findRoute(route.path);
  }

  // findRoute(route: string): boolean {
  //   if ('inicio' === route) {
  //     return true;
  //   }
  //   return false;
  // }


}
