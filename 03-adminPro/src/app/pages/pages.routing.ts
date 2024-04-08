import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { authGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ authGuard ],
    children: [
      { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}  },
      { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráfica'}  },
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'}  },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}  },
      { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}  },
      { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil del usuario'}  },
      { path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Búsquedas'}  },

      // Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de hospitales'}  },
      { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de médicos'}  },
      { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Mantenimiento de médico'}  },

      // Admin
      { path: 'usuarios', canActivate: [adminGuard], component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'}  },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
