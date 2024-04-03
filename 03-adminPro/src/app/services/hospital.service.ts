import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../environments/environments';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
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

  cargarHospitales() {
    const url = `${ this._base_url }/hospitales`;
    return this._http.get<{ok: boolean, hospitales: Hospital[]}>(url, this.headers)
      .pipe(
        map( (resp: {ok: boolean, hospitales: Hospital[]}) => resp.hospitales )
      );
  }

  crearHospital(nombre: string) {
    const url = `${ this._base_url }/hospitales`;
    return this._http.post(url, { nombre }, this.headers);
  }

  actualizarHospital(_id: string, nombre: string) {
    const url = `${ this._base_url }/hospitales/${ _id }`;
    return this._http.put(url, { nombre }, this.headers);
  }

  borrarHospital(_id: string) {
    const url = `${ this._base_url }/hospitales/${ _id }`;
    return this._http.delete(url, this.headers);
  }
}
