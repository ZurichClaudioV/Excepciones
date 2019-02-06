import { RouterModule, Routes } from '@angular/router';
import { ExcepcionesComponent } from './components/excepciones/excepciones/excepciones.component';
import { ExcepcionesPolizaComponent } from './components/excepciones-poliza/excepciones-poliza/excepciones-poliza.component';
import { InicioComponent } from './components/inicio/inicio.component';

const APP_ROUTES: Routes = [
    // { path: 'excepciones', component: ExcepcionesComponent },
    { path: 'excepciones-poliza', component: ExcepcionesPolizaComponent },
    { path: 'excepciones', component: ExcepcionesComponent },
    { path: 'inicio', component: InicioComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
