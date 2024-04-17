import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Game } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _http = inject(HttpClient);
  private _games: Game[] = [];

  constructor() { }

  getNominees() {
    if (this._games.length === 0) {
      return this._http.get<Game[]>(`${ environment.api_url }/goty`)
        .pipe(
          tap( games => this._games = games )
        );
    } else {
      return of(this._games);
    }
  }

  voteGame(id: string) {
    return this._http.post(`${ environment.api_url }/goty/${ id }`, {})
      .pipe(
        catchError( error => {
          return of(error.error);
        })
      );
  }
}
