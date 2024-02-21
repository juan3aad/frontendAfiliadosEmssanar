import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfiliadosComponent } from './components/afiliados/afiliados.component';
import { IpsComponent } from './components/ips/ips.component';

import { AfiliadosFormComponent } from './components/afiliados/afiliados-form.component';
import { IpsFormComponent } from './components/ips/ips-form.component';

import { AsignarAfiliadosComponent } from './components/ips/asignar-afiliados.component';




const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'ips'},
  {path: 'afiliados', component: AfiliadosComponent},
  {path: 'afiliados/form', component: AfiliadosFormComponent},
  {path: 'afiliados/form/:id', component: AfiliadosFormComponent},
  
  {path: 'ips', component: IpsComponent},
  {path: 'ips/form', component: IpsFormComponent},
  {path: 'ips/form/:id', component: IpsFormComponent},
  

  {path: 'ips/asignar-afiliados/:id', component: AsignarAfiliadosComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
