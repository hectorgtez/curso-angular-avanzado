import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../environments/environments';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private _base_url: string;

  constructor(
    private _http: HttpClient,
  ) {
    this._base_url = environment.base_url;
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMedicos() {
    const url = `${ this._base_url }/medicos`;
    return this._http.get<{ok: boolean, medicos: Medico[]}>(url, this.headers)
      .pipe(
        map( (resp: {ok: boolean, medicos: Medico[]}) => resp.medicos )
      );
  }

  crearMedico(medico: Medico) {
    const url = `${ this._base_url }/medicos`;
    return this._http.post(url, medico, this.headers);
  }

  actualizarMedico(medico: Medico) {
    const url = `${ this._base_url }/medicos/${ medico._id }`;
    return this._http.put(url, medico, this.headers);
  }

  borrarMedico(_id: string) {
    const url = `${ this._base_url }/medicos/${ _id }`;
    return this._http.delete(url, this.headers);
  }
}
