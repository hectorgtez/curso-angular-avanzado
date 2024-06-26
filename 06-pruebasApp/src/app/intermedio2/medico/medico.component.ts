import { Component } from '@angular/core';
import { MedicoService } from './medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: ``
})
export class MedicoComponent {
  public medicos: any[] = [];

  constructor(
    private _medicoService: MedicoService,
  ) { }

  saludarMedico(nombre: string): string {
    return `Hola, ${ nombre }!`;
  }

  obtenerMedicos() {
    this._medicoService.getMedicos()
      .subscribe( (medicos: any) => this.medicos = medicos )
  }
}
