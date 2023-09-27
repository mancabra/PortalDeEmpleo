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

  constructor(
    private _AdminRequest: AdminService
  ) {

  }
  ngOnInit(): void {
    this.obtenerLog();
    //this.cargarMuestra();
  }

  obtenerLog() {
    this.vectorLog = [];
    this._AdminRequest.obtenerLog().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        this.vectorLog.push(element);
      }
    });
  }

  cargarMuestra(){
    this.vectorLog = [
      {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
    {
      id_proceso:1,
      tipoProceso: "publicación",
      fechaProceso: "29/09/2023",
      nombreVacante: "oficinista de planta",
      descripcion: "eliminacion automatica por falta de candidatos"
    },
  ]
  }
}


