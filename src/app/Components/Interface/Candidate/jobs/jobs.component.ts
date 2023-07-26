import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandidateService } from 'src/app/Services/CandidateServices/candidate.service';
import { InterfaceService } from 'src/app/Services/InterfaceServices/interface.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy{
  imageSeach: string = "../assets/search.png";

  //DEBE SUSCRIBIRSE AL USARIO ENVIADO POR BASE DE DATOS
  usuario:any;
  subscription:Subscription;
  vacanteSeleccionada:any ="";

  filtroActivo: boolean = false;
  filtro:string ="Filtros";

  filtrosDisponibles = ["Cercanos","Salario","Estado",];

  jobsList = [
    {
      id_vacante:1,
      nombreVacante: "Diseñador web",
      especialista: "Diseñador",
      sueldo: 10000,
      horario: "9:00 am - 6:00 pm",
      domicilio:"C.Pinos N.447 Col.Nuevo Mundo",
      municipio:{id_municipio:1,nombreMunicipio:"Acolman",id_estado:1},
      estatus: false,
      descripcion: 
      "Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui"
      +"ut facilisi hac suspendisse pretium ad urna, consequat id natoque sollicitudin orci mi tristique quisque posuere."
      +"Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui"
      +"ut facilisi hac suspendisse pretium ad urna, consequat id natoque sollicitudin orci mi tristique quisque posuere."
      +"Lorem ipsum dolor sit amet consectetur adipiscing elit interdum nascetur purus, libero integer qui",
      empresa:{id_empresa:1,vacantes:null,nombreEmpresa:"Infotec",descripcion:"holaMundo Infotec"},
      empleador:{
                  id_usuario:1,
                  nombre:"Saumuel",
                  correoElectronico:"mail@gmail.com",
                  consena:"1234hola",
                  tipoUsuario:3,
                  apellidoP:"Aispuro",
                  apellidoM:"Wilson",
                  estatusUsuario:true,
                },
      candidatos:null, // lista de candidatos
      tipoHorario:{id_tipoHorario:1,dias:"Tiempo Completo"},
      tipoContratacion:{id_tipoContratacion:1,horario:"Tiempo Indefinido"},
      modalidadTrabajo:{id_modalidadTrabajo:1,modalidad:"Presencial"},
    },
    
  ];

  constructor(private _CandidateRequest: CandidateService, private _UserRequest:InterfaceService) {
    this.subscription = this._UserRequest.getUser().subscribe(data =>{
      
      this.usuario = data;
      console.log(this.usuario);
    });
  }

  ngOnInit() {
    this._UserRequest.esparcirUsuario();
    this.vacanteSeleccionada ="";
    this.obtenerVacantes();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obtenerVacantes() {
    if(this.filtroActivo == true){
      
      this._CandidateRequest.buscarporFiltro(this.filtro).then((data: any) => {
        if(data == null){
  
        } else {
          this.jobsList = data;
        }
       
      });
      
    }else{

      this._CandidateRequest.obtenerVacantes().then((data: any) => {
        if(data == null){
  
        } else {
          this.jobsList = data;
        }
       
      });
    }
 
  }

  cargarVacantes() {
    if (this.jobsList.length == 0) {
      return false;
    } else {
      return true;
    }
  }
  
  actualizarFiltro(filtroSelecionado:string){
    this.filtro = filtroSelecionado;
    this.filtroActivo = true;
  }

  verVacanteCompleta(vacante:any){
    this.vacanteSeleccionada = vacante;

  }

  cargarPantalla(){
    if(this.vacanteSeleccionada== ""){
      return false;
    } else {
      return true;
    }
  }



  postularse(vacante:any){
    const PostDTO = {
      // VER COMO SE ESTA MANEJANDO EL ID PORQIE SE ENVIA EL IDE DE USUARIO NO EL ID CANDIDATO
      id_candidato:this.usuario.id_candidato,
      id_vacante:vacante.id_vacante
    }

    let postulacion:any ="";
    if(postulacion != ""){
      alert("Postulacion Exitosa");
    } else {
      alert("Algo Fallo");
    }
    this._CandidateRequest.postularse(PostDTO).then((data:any) =>{
      postulacion = data;
    });
    
   
  }
}

