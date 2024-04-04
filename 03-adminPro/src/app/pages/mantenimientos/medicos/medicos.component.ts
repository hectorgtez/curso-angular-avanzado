import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[];
  public medicosTemp: Medico[];
  public cargando: boolean;
  public imgSubs!: Subscription;

  constructor(
    private _medicoService: MedicoService,
    private _modalImagenService: ModalImagenService,
    private _busquedasService: BusquedasService,
  ) {
    this.medicos = [];
    this.medicosTemp = [];
    this.cargando = true;
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this._modalImagenService.nuevaImagen
      .pipe( delay(200) )
      .subscribe( img => this.cargarMedicos() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.medicos = this.medicosTemp;
    }

    return this._busquedasService.buscar('medicos', termino)
      .subscribe( (resultados: any) => {
        this.medicos = resultados;
      });
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos()
      .subscribe( medicos => {
        this.medicos = medicos;
        this.medicosTemp = medicos;
        this.cargando = false;
      });
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Estás a punto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borralo'
    }).then( (result) => {
      if (result.value) {
        this._medicoService.borrarMedico(medico._id!)
          .subscribe( resp => {
            this.cargarMedicos();
            Swal.fire(
              'Médico borrado',
              `${ medico.nombre } fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }

  abrirModal(medico: Medico) {
    this._modalImagenService.abrirModal('medicos', medico._id!, medico.img);
  }
}
