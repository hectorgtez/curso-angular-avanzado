import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environments';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private _http: HttpClient
  ) { }

  crearUsuario( formData: RegisterForm ) {
    return this._http.post(`${ base_url }/usuarios`, formData);
  }

  login( formData: LoginForm ) {
    return this._http.post(`${ base_url }/login`, formData);
  }
}
