import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTES DE RUTA
import { StartComponent } from './Components/Start/start/start.component';
import { JobsComponent } from './Components/Interface/Candidate/jobs/jobs.component';
import { RequestsComponent } from './Components/Interface/Candidate/requests/requests.component';
import { AlertsComponent } from './Components/Interface/Candidate/alerts/alerts.component';
import { ProfileComponent } from './Components/Interface/Candidate/profile/profile.component';





const routes: Routes = [
  {path:'',redirectTo:'/start',pathMatch:'full'},
  {path:'start',component:StartComponent},
  {path:'vacantes',component:JobsComponent},
  {path:'postulaciones',component:RequestsComponent},
  {path:'notificaciones',component:AlertsComponent},
  {path:'perfil',component:ProfileComponent},



  {path:'**',redirectTo:'/start',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
