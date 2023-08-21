import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { Administrador } from 'src/app/Services/Entity/administrador';
import { Candidato } from 'src/app/Services/Entity/candidato';
import { Empleador } from 'src/app/Services/Entity/empleador';
import { Empresa } from 'src/app/Services/Entity/empresa';
import { ModalidadTrabajo } from 'src/app/Services/Entity/modalidad-trabajo';
import { Municipio } from 'src/app/Services/Entity/municipio';
import { TipoContratacion } from 'src/app/Services/Entity/tipo-contratacion';
import { TipoHorario } from 'src/app/Services/Entity/tipo-horario';
import { Vacante } from 'src/app/Services/Entity/vacante';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  candidato: Candidato = new Candidato;
  empleador: Empleador = new Empleador;
  administrador: Administrador = new Administrador;
  empresa: Empresa = new Empresa;

  id_tipoUsuario: number = 0;
  empresas: Vacante[];

  //varibale de input administrar
  vistaAdministrar: boolean = false;
  perfilTipoAdministrador: boolean = true;
  perfilTipoCandidato: boolean = true;
  perfilTipoEmpleador: boolean = true;
  perfilTipoEmpresa: boolean = true;


  constructor(private _CandidateRequest: CandidateService, private _UserRequest: InterfaceService, private router: Router, private _EmployerRequest:EmployerService) {

    this.empresas = [{
      id_vacante: 0,
      nombreVacante: "Taquero",
      especialista: "Taquero",
      sueldo: 10000,
      horario: "9:00 am - 10:00 pm",
      domicilio: "Av.Primavera",
      municipio: new Municipio,
      estatus: false,
      descripcion: "hola",
      empresa: { id_empresa: 0, nombre: "bombo", descripcion: "lideres en panes", vacantes_empresa: [] },
      empleador: new Empleador,
      candidatos: [],
      tipoHorario: new TipoHorario,
      tipoContratacion: new TipoContratacion,
      modalidadTrabajo: new ModalidadTrabajo,
      id_postulacion: 0
    }]
  }

  ngOnInit(): void {
    this.buscarUsuario();
  }

  ngOnDestroy(): void {
  }

  buscarUsuario() {
    this._UserRequest.obtener().then((data: any) => {
      if (data.usuario.tipoUsuario == 1) {
        this.administrador = data;
        this.id_tipoUsuario = 1
        console.log("admin");
      } else if (data.usuario.tipoUsuario == 2) {
        this.candidato = data;
        this.id_tipoUsuario = this.candidato.usuario.tipoUsuario;
        console.log("candidato");
      } else if (data.usuario.tipoUsuario == 3) {
        this.empleador = data;
        this.id_tipoUsuario = this.empleador.usuario.tipoUsuario;
        console.log("empleador");
      } else {
      
      }
      this.identificarTipoDePerfil();
    });
  }

  obtenerPublicaciones(){
    this._EmployerRequest.obtenerPublicaciones(this.empleador.id_empleador).subscribe(data => {
      //this.empresas = data;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        var numero = 0;

        for (let index = 0; index < this.empresas.length; index++) {
          const element2 = this.empresas[index];
          
          if(element2.empresa.nombre == element.empresa.nombre){
            numero = numero +1;
          } else{

          }
        }

        if(numero == 0){
          this.empresas.push(element);
        } else {

        }  
      }
      console.log(this.empresas);
    });
  }

  modificarDatosPerfil() {
    this.router.navigate(['interface/perfil/modificar']);
  }

  identificarTipoDePerfil() {
    if (this.id_tipoUsuario == 1) {

      this.perfilTipoAdministrador = false;
      this.perfilTipoCandidato = true;
      this.perfilTipoEmpleador = true;
      this.perfilTipoEmpresa = true;

    } else if (this.id_tipoUsuario == 2) {

      this.perfilTipoAdministrador = true;
      this.perfilTipoCandidato = false;
      this.perfilTipoEmpleador = true;
      this.perfilTipoEmpresa = true;
      
      this.obtenerEdad();

    } else if (this.id_tipoUsuario == 3) {

      this.perfilTipoAdministrador = true;
      this.perfilTipoCandidato = true;
      this.perfilTipoEmpleador = false;
      this.perfilTipoEmpresa = true;

      this.obtenerPublicaciones();

    } else {

      this.perfilTipoAdministrador = true;
      this.perfilTipoCandidato = true;
      this.perfilTipoEmpleador = true;
      this.perfilTipoEmpresa = false;
    }
  }

//FUNCION EDAD
  calcularEdad(fecha_nacimiento:Date) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha_nacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}

obtenerEdad(){
  var edad = this.calcularEdad(this.candidato.fechaNacimiento);
  this.candidato.edad = edad;
}

  cerrarSesion() {
    this._UserRequest.hacerVisitante();
    this._UserRequest.guaradarCorreo("");
    this._UserRequest.LimpiarAlertas();
  }


}
