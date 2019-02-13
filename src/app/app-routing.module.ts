import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthDashboardGuard } from './guards/auth-dashboard.guard';

const routes: Routes = [
  {
    path: 'dashboard/admin',
    loadChildren: './pages/dashboard/admin/admin-routing.module#AdminRoutingModule',
    canLoad: [AuthDashboardGuard]
  },
  {
    path: 'dashboard/lector',
    loadChildren: './pages/dashboard/lector/lector-routing.module#LectorRoutingModule',
    canLoad: [AuthDashboardGuard]
  },
  {
    path: 'dashboard/supervisor',
    loadChildren: './pages/dashboard/supervisor/supervisor-routing.module#SupervisorRoutingModule',
    canLoad: [AuthDashboardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})

export class AppRoutingModule { }
