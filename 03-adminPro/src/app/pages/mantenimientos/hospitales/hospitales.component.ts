import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: ``
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[];
  public cargando: boolean;
  public imgSubs!: Subscription;

  constructor(
    private _hospitalService: HospitalService,
    private _modalImagenService: ModalImagenService,
  ) {
    this.hospitales = [];
    this.cargando = true;
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this._modalImagenService.nuevaImagen
      .pipe( delay(100) )
      .subscribe( img => this.cargarHospitales() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  guardarCambios(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital._id, hospital.nombre!)
      .subscribe( resp => {
        Swal.fire('Actualizado', 'Hospital actualizado correctamente', 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    this._hospitalService.borrarHospital(hospital._id)
      .subscribe( resp => {
        this.cargarHospitales();
        Swal.fire('Elimiando', 'Hospital eliminado correctamente', 'success');
      });
  }

  async abrirSweetAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value!.trim().length > 0) {
      this._hospitalService.crearHospital(value!)
        .subscribe( (resp: any) => {
          this.hospitales.push(resp.hospital);
        });
    }
  }

  abrirModal(hospital: Hospital) {
    this._modalImagenService.abrirModal('hospitales', hospital._id!, hospital.img);
  }
}
