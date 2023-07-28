import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  usuario:any;
  viewJobs: boolean = true;
  viewRequests: boolean = true;
  newJob: boolean = true;
  candidates: boolean = true;
  manage: boolean = true;
  viewRequestsAdmin:boolean = true;
  alerts: boolean = true;
  profile: boolean = true;

  constructor(private _UserRequest:InterfaceService){
    this.subscription = this._UserRequest.getUser().subscribe(data =>{
      
      this.usuario = data;
      console.log(this.usuario);
    });
  }
  ngOnInit(): void {
   
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  /*
  cargarPantalla(){
    if(this.usuario == null ){
      return false;
    } else {
      return true;
    }
  }*/

}
