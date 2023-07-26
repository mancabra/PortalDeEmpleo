import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  usuario:any;


  constructor(private _UserRequest:InterfaceService){
    this.subscription = this._UserRequest.getUser().subscribe(data =>{
      this.usuario = data;
    });
  }
  
  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
