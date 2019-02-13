import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Globals } from '../shared/globals';
import { Menu } from '../shared/menu';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private globals: Globals) {}

  canLoad(route: Route): boolean {
    if (!this.globals || !this.globals.user || !this.globals.user.Menus || !this.globals.user.Menus.length) {
      return false;
    }

    return this.findRoute(route.path, this.globals.user.Menus);
  }

  findRoute(route: string, menus: Menu[]): boolean {
    for (const menu of menus) {
      for (const subMenu of menu.SubMenus) {
        if (subMenu.Url === route) {
          return true;
        }
      }
    }
    return false;
  }


}
