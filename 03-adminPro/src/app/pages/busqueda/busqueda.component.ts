import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: ``
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _busquedasService: BusquedasService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal(termino));
  }

  busquedaGlobal(termino: string) {
    this._busquedasService.busquedaGlobal(termino)
      .subscribe( (resp: any) => {
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      });
  }

  abrirMedico(medico: Medico) {
    this._router.navigateByUrl(`/dashboard/medico/${ medico._id }`);
  }
}
