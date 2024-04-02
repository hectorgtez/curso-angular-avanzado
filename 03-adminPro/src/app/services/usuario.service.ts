import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { environment } from '../environments/environments';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { LoginForm } from '../interfaces/login-form.interface';

declare const google: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario!: Usuario;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _ngZone: NgZone,
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      }
    }
  }

  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke( 'hectorgtez@gmail.com', () => {
      this._ngZone.run(() => {
        this._router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {
    return this._http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token,
      }
    }).pipe(
      tap( (resp: any) => {
        const { email, google, nombre, role, img='', uid} = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( error => of(false) ),
    );
  }

  crearUsuario( formData: RegisterForm ) {
    return this._http.post(`${ base_url }/usuarios`, formData)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  actualizarPerfil( data: {email: string, nombre: string, role: string} ) {
    data = {
      ...data,
      role: this.usuario.role!,
    }
    return this._http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers);
  }

  login( formData: LoginForm ) {
    return this._http.post(`${ base_url }/login`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle( token: string ) {
    return this._http.post(`${ base_url }/login/google`, { token })
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  cargarUsuarios( from: number = 0 ) {
    const url = `${ base_url }/usuarios?from=${ from }`;
    return this._http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map( resp  => {
          const usuarios = resp.usuarios.map(
            user => new Usuario(
              user.nombre,
              user.email,
              '',
              user.img,
              user.google,
              user.role!,
              user.uid
            )
          )

          return {
            total: resp.total,
            usuarios: usuarios,
          };
        })
      );
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this._http.delete(url, this.headers);
  }

  guardarUsuario( usuario: Usuario ) {
    return this._http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers);
  }
}
