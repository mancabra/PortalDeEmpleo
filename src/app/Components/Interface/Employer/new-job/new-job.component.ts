import { Component } from '@angular/core';
import { Empresa } from 'src/app/Services/Entity/empresa';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent {

  estados:string[] = ["nombre estado","nombre estado",
  "nombre estado","nombre estado","nombre estado","nombre estado","nombre estado",
  "nombre estado","nombre estado","nombre estado","nombre estado","nombre estado",
  "nombre estado","nombre estado","nombre estado","nombre estado","nombre estado",]

  empresasRegistradas: Empresa[] = [];
  empresaSelecionada: Empresa ;

  constructor(){
    this.empresaSelecionada = { id_empresa:0, nombre: "Seleccione una empresa", descripcion: "", vacantes_empresa: [] }
  }
}
