import { enableProdMode, Injector } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AuthService } from './app/services/auth.service';
import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { Auth } from './app/shared/Auth';

if (environment.production) {
  enableProdMode();
}

function initNgModule() {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
}

const params = new RegExp('[\\?&]token=([^&#]*)').exec(window.location.href);
let url = window.location.href.split('?')[0];

window.history.pushState({}, document.title, url);

// Si no viene el token de intranet como parámetro y no esté guardado en sesión redirecciona a intranet nuevamente
if (!params && !sessionStorage.getItem('auth')) {
  window.location.replace(environment.intranetDesa);
} else {
  if (!sessionStorage.getItem('auth')) {
    const injector = Injector.create({
      providers: [
        { provide: AuthService, deps: [HttpClient] },
        { provide: HttpClient, deps: [HttpHandler] },
        { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest }) },
      ],
    });
    const authService = injector.get(AuthService);
    authService.getToken(params[1]).subscribe((auth: Auth) => {
      sessionStorage.setItem('auth', JSON.stringify(auth));
      initNgModule();
    }, error => {
      console.log(error);
      window.location.replace(environment.intranetDesa);
    });
  } else {
    // window.location.  replareplaceState.
    initNgModule();
  }
}


