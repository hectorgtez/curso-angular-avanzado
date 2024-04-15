import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private _http: HttpClient,
  ) { }

  getMedicos() {
    return this._http.get('...');
  }
}
