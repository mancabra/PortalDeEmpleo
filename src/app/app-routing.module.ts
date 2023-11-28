import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTES DE RUTA
import { StartComponent } from './Components/Start/start/start.component';
import { JobsComponent } from './Components/Interface/Candidate/jobs/jobs.component';
import { RequestsComponent } from './Components/Interface/Candidate/requests/requests.component';
import { AlertsComponent } from './Components/Interface/Candidate/alerts/alerts.component';
import { ProfileComponent } from './Components/Interface/Candidate/profile/profile.component';
import { UpdateComponent } from './Components/Interface/Candidate/profile/update/update.component';
import { NewJobComponent } from './Components/Interface/Employer/new-job/new-job.component';
import { CandidatesComponent } from './Components/Interface/Employer/candidates/candidates.component';
import { ManageComponent } from './Components/Interface/Admin/manage/manage.component';
import { RequestAdminComponent } from './Components/Interface/Admin/request-admin/request-admin.component';
import { UpdateJobComponent } from './Components/Interface/Employer/candidates/update-job/update-job.component';
import { PasswordComponent } from './Components/Start/start/password/password.component';
import { DocumentComponent } from './Components/Interface/Admin/manage/document/document.component';





const routes: Routes = [
  {path:'',redirectTo:'/start',pathMatch:'full'},
  {path:'cambiar_contraseña/:correo',component:PasswordComponent},
  {path:'start',component:StartComponent},
  {path:'interface/vacantes',component:JobsComponent},
  {path:'interface/postulaciones',component:RequestsComponent},
  {path:'interface/notificaciones',component:AlertsComponent},
  {path:'interface/perfil',component:ProfileComponent},
  {path:'interface/perfil/modificar',component:UpdateComponent},

  // RUTAS EMPLEADOR
  {path:'interface/publicar',component:NewJobComponent},
  {path:'interface/publicaciones',component:CandidatesComponent},
  {path:'interface/publicaciones/modificar',component:UpdateJobComponent},

  // RUTAS ADMINISTRADOR
  {path:'interface/administrar',component:ManageComponent},
  {path:'interface/peticiones',component:RequestAdminComponent},

  


 {path:'**',redirectTo:'/start',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
