import { Component, OnInit } from '@angular/core';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Vacante } from 'src/app/Services/Entity/vacante';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit{

  empleador: Empleador = new Empleador;
  publicaciones: Vacante [] = [];
  candidatos: Candidato[] = [];

  constructor( private _EmployerRequest: EmployerService){

  }

  ngOnInit(): void {
   this.buscarUsuario();
  }

  buscarUsuario() {
    this._EmployerRequest.obtener().then((data: any) => {
      this.empleador = data;
      console.log(this.empleador);
      this.obtenerPublicaciones();
    });
  }

  obtenerPublicaciones(){
    this._EmployerRequest.obtenerPublicaciones(this.empleador.id_empleador).subscribe(data => {
      this.publicaciones = data;
      console.log(this.publicaciones);
    });
  }

  cargarPantalla(){
    if(this.publicaciones.length == 0){
      return false;
    } else {
      return true;
    }
  }

  cargarPantallaI(){
    if(this.candidatos.length == 0){
      return false;
    } else {
      return true;
    }
  }

}
