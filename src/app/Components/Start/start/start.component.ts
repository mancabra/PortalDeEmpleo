import { Component } from '@angular/core';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  viewLog : boolean = false;
  viewCreate : boolean = true; 

  constructor(private _UserRequest: InterfaceService){

  }
  
  ngOnInit(){
    this._UserRequest.ocultarNavB();
  }

}
