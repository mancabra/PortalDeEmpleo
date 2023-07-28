import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './Components/Start/start/start.component';
import { LoginComponent } from './Components/Start/start/login/login.component';
import { CreateComponent } from './Components/Start/start/create/create.component';
import { InterfaceComponent } from './Components/Interface/interface/interface.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './Components/Interface/interface/navbar/navbar.component';
import { JobsComponent } from './Components/Interface/Candidate/jobs/jobs.component';
import { RequestsComponent } from './Components/Interface/Candidate/requests/requests.component';
import { ProfileComponent } from './Components/Interface/Candidate/profile/profile.component';
import { AlertsComponent } from './Components/Interface/Candidate/alerts/alerts.component';
import { NewJobComponent } from './Components/Interface/Employer/new-job/new-job.component';
import { CandidatesComponent } from './Components/Interface/Employer/candidates/candidates.component';
import { ManageComponent } from './Components/Interface/Admin/manage/manage.component';
import { RequestAdminComponent } from './Components/Interface/Admin/request-admin/request-admin.component';
import { JobComponent } from './Components/Interface/Employer/candidates/job/job.component';
import { UpdateComponent } from './Components/Interface/Candidate/profile/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoginComponent,
    CreateComponent,
    InterfaceComponent,
    NavbarComponent,
    JobsComponent,
    RequestsComponent,
    ProfileComponent,
    AlertsComponent,
    NewJobComponent,
    CandidatesComponent,
    ManageComponent,
    RequestAdminComponent,
    JobComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
