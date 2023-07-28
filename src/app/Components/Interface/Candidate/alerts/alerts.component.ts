import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit, OnDestroy{
  subscription:Subscription;
  alertas:any=[];

  constructor(private _UserRequest:InterfaceService){
    this.subscription = this._UserRequest.getAlerts().subscribe(data => {
      this.alertas = data;
    });
  }


  ngOnInit(): void {
    this._UserRequest.esparcirAlertas();
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarPantalla(){
    if(this.alertas.lenght==0){
      return false;
    } else{
      return true;
    }
  }

}
