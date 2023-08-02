import { Component, OnDestroy, OnInit,  } from '@angular/core';

import { Candidato } from 'src/app/Services/Entity/candidato';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit, OnDestroy {

  usuario:Candidato = new Candidato;


  constructor(){

  }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {

  }


}
