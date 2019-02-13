import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LectorComponent } from './lector.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: LectorComponent }

];

@NgModule({
  declarations: [
    LectorComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class LectorRoutingModule { }
