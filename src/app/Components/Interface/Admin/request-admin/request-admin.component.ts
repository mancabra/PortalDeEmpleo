import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/AdminServices/admin.service';
import { Log } from 'src/app/Services/Entity/log';

@Component({
  selector: 'app-request-admin',
  templateUrl: './request-admin.component.html',
  styleUrls: ['./request-admin.component.css']
})
export class RequestAdminComponent implements OnInit {

  vectorLog: Log[] = [];
  vectorPag: number[] = [];

  constructor(
    private _AdminRequest: AdminService
  ) {

  }
  ngOnInit(): void {
    this.obtenerPag(0);
    // this.cargarMuestra();
  }

  cargarProcesos() {
    if (this.vectorLog.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  obtenerPag(page: number) {
    this._AdminRequest.obtenerLog(0).then((data:any)=>{
      this.vectorPag = [];
      this.vectorLog = data.content;
      for (let index = 0; index < data.totalPages; index++) {
        const element = index + 1;
        this.vectorPag.push(element);
      }
    });
  }

  obtenerUltima() {
    this.obtenerPag(this.vectorPag.length-1);
  }

  cargarMuestra() {
    this.vectorLog = [
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
      {
        id_proceso: 1,
        tipoProceso: "publicación",
        fechaProceso: "29/09/2023",
        nombreVacante: "oficinista de planta",
        descripcion: "eliminacion automatica por falta de candidatos"
      },
    ]
  }
}


