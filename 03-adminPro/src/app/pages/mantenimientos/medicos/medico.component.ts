import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: ``
})
export class MedicoComponent implements OnInit {
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public medicoSeleccionado: Medico | undefined;
  public hospitalSeleccionado: Hospital | undefined;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _hospitalService: HospitalService,
    private _medicoService: MedicoService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params
      .subscribe( ({ id }) => this.cargarMedico(id) );

    this.medicoForm = this._fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')!.valueChanges
      .subscribe( hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId )
      })
  }

  cargarMedico(id: string) {
    if ( id === 'nuevo') {
      return;
    }

    this._medicoService.obtenerMedicoPorId(id)
      .pipe( delay(100) )
      .subscribe( (medico: any) => {
        if (!medico) {
          this._router.navigateByUrl(`/dashboard/medicos`);
        }

        const { nombre, hospital:{_id} } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
      .subscribe( (hospitales: Hospital[]) => {
        this. hospitales = hospitales;
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      // Actualizar medico
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      }

      this._medicoService.actualizarMedico(data)
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        });
    } else {
      // Crear medico
      this._medicoService.crearMedico(this.medicoForm.value)
        .subscribe( (resp: any) => {
          Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
          this._router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`);
        });
    }

  }
}
