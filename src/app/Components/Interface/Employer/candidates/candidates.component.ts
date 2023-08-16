import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Empresa } from 'src/app/Services/Entity/empresa';
import { ModalidadTrabajo } from 'src/app/Services/Entity/modalidad-trabajo';
import { Municipio } from 'src/app/Services/Entity/municipio';
import { TipoContratacion } from 'src/app/Services/Entity/tipo-contratacion';
import { TipoHorario } from 'src/app/Services/Entity/tipo-horario';
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

  constructor( private _EmployerRequest: EmployerService, private router: Router){
    /*
    this.publicaciones =[{ id_vacante: 0,
      nombreVacante:"Taquero",
      especialista:"Taquero",
      sueldo:10000,
      horario:"9:00 am - 10:00 pm",
      domicilio: "Av.Primavera",
      municipio: new Municipio ,
      estatus:false,
      descripcion: "hola",
      empresa: new Empresa,
      empleador: new Empleador,
      candidatos: [],
      tipoHorario: new TipoHorario,
      tipoContratacion: new TipoContratacion,
      modalidadTrabajo: new ModalidadTrabajo,
      id_postulacion: 0}]
      */
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

  modificarVacante(vacante: Vacante){
    this._EmployerRequest.guardarVacante(vacante);
    this.router.navigate(['interface/publicaciones/modificar']);
  }

  eliminarVacante(vacante: Vacante){
    this._EmployerRequest.eliminarVacante(vacante.id_vacante).then((data:any) =>{
      if(data == "Vacante eliminada exitosamente") {
        alert("la vacante se ha eliminado correctamente");
        this.obtenerPublicaciones();
        this.cargarPantalla();
      } else {
        alert("ha ocurrido un error");
      }
    });
  }

  mostrarCandidatos(vacante: Vacante){
    this._EmployerRequest.ontenerCandidatosVacante(vacante.id_vacante).subscribe(data => {
      this.candidatos = data;
      console.log(this.candidatos);
    });
  }


}
