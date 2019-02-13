import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SupervisorComponent } from './supervisor.component';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';

const routes: Routes = [
  {path: '', component: SupervisorComponent }

];

@NgModule({
  declarations: [
    SupervisorComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ChartsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class SupervisorRoutingModule { }
