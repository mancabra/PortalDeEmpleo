import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CompanyService } from 'src/app/Services/CompanyServices/company.service';
import { EmployerService } from 'src/app/Services/EmployerServices/employer.service';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit{

  @Output() ocultarRegistro = new EventEmitter<boolean>();

  nombre: string = "";
  descripcion: String = "";

  // LA VARIABLE validarNombreRegistrado AL ESTAR DESACTIVADA MUESTRA EL ERROR DE CAPTURA DEL ATRIBUTO NOMBRE DE UNA EMPRESA
  // ESTE ERROR SE ACTIVA CUANDO EL NOMBRE DE LA EMPRESA YA EXISTE EN BASE DE DATOS
  validarNombreRegistrado: boolean = true;
  validarNombre: boolean = true;
  validarDescripcion: boolean = true;
  Obligatorios: boolean = true;

  constructor(
    private _CompanyRequest: CompanyService,
    private _EmployerRequest: EmployerService,
    private _UserRequest: InterfaceService) {

  }
  ngOnInit(): void {
    this.ocultarErrores();
  }

  ocultarErrores(){
    this.validarNombreRegistrado = true;
    this.validarDescripcion = true;
  }


  //CAPTURA EMPRESA
  evaluarEmpresa() {
    this.Obligatorios = true;

    const EMPRESA = {
      nombre: this.nombre,
      descripcion: this.descripcion
    }

    this.evaluarNombre(EMPRESA);
  }

  // FUNCION PARA EVALUAR UN NOMBRE
  evaluarNombre(empresa: any) {
    // Códogo para evaluar que el campo nombre no este vacio 
    if (this.nombre == "") {
      this.validarNombre = false;
      this.Obligatorios = false;
    } else {
      this.validarNombre = true;
      empresa.nombre = this.nombre
    }
    this.evaluarDescripcion(empresa)
  }

  // FUNCION PARA VALIDAR EL CORREO ELECTRONICO
  evaluarDescripcion(empresa: any) {
    // Código para validar que el campo de de descripcion no este vacio
    if (this.descripcion == "") {
      this.validarDescripcion = false;
      this.Obligatorios = false;
    } else {
      this.validarDescripcion = true;
      empresa.descripcion = this.descripcion;
    }
    console.log(empresa);
    this.registarEmpresa(empresa);
  }

  // FUNCION PARA EL REGISTRO DE EMPRESAS
  registarEmpresa(empresa: any) {
    if (this.Obligatorios != false) {
      this._CompanyRequest.registrar(empresa).then((data: any) => {
        if (data.estatus == false) {
          this.enviarAlerta("Ha surgido un error inesperado que nos impidio crear la empresa.", true);
        } else {
          this.enviarAlerta("La empresa fue creada correctamente y ya se encuentra disponible.", false);
          this.limpiarCampos();
          this._EmployerRequest.obtenerEmpresasOb();
          this.ocultarRegistro.emit(true);
        }
      });
    } else {
      this.enviarAlerta("Algunos de los campos obligatorios para la creacion de la cuenta no se han capturado.", true);
    }
  }

  limpiarCampos() {
    this.nombre = "";
    this.descripcion = "";
  }


  // FUNCION PARA EL POPUP
  enviarAlerta(mss: String, error: boolean) {
    const ALERTA = {
      mss: mss,
      error: error,
    }

    this._UserRequest.activarAlerta();
    this._UserRequest.cargarAlerta(ALERTA);
  }

}
