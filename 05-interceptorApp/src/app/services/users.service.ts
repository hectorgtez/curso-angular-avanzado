import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _http = inject(HttpClient);

  constructor() { }

  getUsers() {
    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'Hector');

    return this._http.get(`https://reqres123.in/api/user`, {
      params: params,
    }).pipe(
      map( (resp: any) => resp['data'] ),
    );
  }
}
