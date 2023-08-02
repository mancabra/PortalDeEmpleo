import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit, OnDestroy {

  @Output() tipoUsuario  = new EventEmitter<number>();
 
  usuario:Candidato = new Candidato;


  constructor(private _UserRequest:InterfaceService){

  }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {

  }

  enviarUsuarioNavbar() {

    // this.tipoUsuario.emit(this.usuario.usuario.tipoUsuario);
    this.tipoUsuario.emit(2);
  }


}
