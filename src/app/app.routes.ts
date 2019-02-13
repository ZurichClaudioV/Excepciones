import { RouterModule, Routes } from '@angular/router';
import { ExcepcionesComponent } from './components/excepciones/excepciones/excepciones.component';
import { ExcepcionesPolizaComponent } from './components/excepciones-poliza/excepciones-poliza/excepciones-poliza.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ExcepcionesPrimaProyectadaComponent } from './components/excepciones-prima-proyectada/excepciones-prima-proyectada/excepciones-prima-proyectada.component';

const routes: Routes = [
    // { path: 'excepciones', component: ExcepcionesComponent },
    { path: 'excepciones-prima-proyectada', component: ExcepcionesPrimaProyectadaComponent },
    { path: 'excepciones-poliza', component: ExcepcionesPolizaComponent },
    { path: 'excepciones', component: ExcepcionesComponent },
    { path: 'inicio', component: InicioComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(routes);
