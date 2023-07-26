import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTES DE RUTA
import { StartComponent } from './Components/Start/start/start.component';
import { InterfaceComponent } from './Components/Interface/interface/interface.component';




const routes: Routes = [
  {path:'',redirectTo:'/interface',pathMatch:'full'},
  {path:'start',component:StartComponent},
  {path:'interface',component:InterfaceComponent},

  {path:'**',redirectTo:'/interface',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
