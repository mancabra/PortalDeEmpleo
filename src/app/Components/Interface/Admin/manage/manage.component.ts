import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  verCrearCuenta: boolean = true;
  verBorrarCuenta:boolean = true;
  verBorrarVacante:boolean = true;
  usuarioAdmin:boolean = true;

  constructor(){

  }

  ngOnInit(): void {
    
  }

  verCrear(){
    this.verBorrarVacante = true;
    this.verCrearCuenta = false;
    this.verBorrarCuenta = true;
  }

  verBorrar(){
    this.verCrearCuenta = true;
    this.verBorrarVacante = true;
    this.verBorrarCuenta = false;
  }

  verBorrarV(){
    this.verCrearCuenta = true;
    this.verBorrarVacante = false;
    this.verBorrarCuenta = true;
  }



}
