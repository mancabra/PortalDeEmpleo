import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit, OnDestroy {

  constructor(private _UserRequest:InterfaceService){ }

  ngOnInit(): void {
   // this._UserRequest.hacerVisitante();
   }

  ngOnDestroy(): void { }


}
