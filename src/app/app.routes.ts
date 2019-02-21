import { RouterModule, Routes, CanLoad } from '@angular/router';
import { ExcepcionesComponent } from './components/excepciones/excepciones/excepciones.component';
import { ExcepcionesPolizaComponent } from './components/excepciones-poliza/excepciones-poliza/excepciones-poliza.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ExcepcionesPrimaProyectadaComponent } from './components/excepciones-prima-proyectada/excepciones-prima-proyectada/excepciones-prima-proyectada.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    // { path: 'excepciones', component: ExcepcionesComponent },
    { path: 'excepciones-prima-proyectada', component: ExcepcionesPrimaProyectadaComponent, canLoad: [AuthGuard] },
    { path: 'excepciones-poliza', component: ExcepcionesPolizaComponent, canLoad: [AuthGuard] },
    { path: 'excepciones', component: ExcepcionesComponent, canLoad: [AuthGuard] },
    { path: 'inicio', component: InicioComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

export const APP_ROUTING = RouterModule.forRoot(routes);
