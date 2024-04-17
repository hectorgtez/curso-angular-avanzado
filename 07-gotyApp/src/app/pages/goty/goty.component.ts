import { Component, OnInit, inject } from '@angular/core';

import Swal from 'sweetalert2';

import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/interfaces';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrl: './goty.component.css'
})
export class GotyComponent implements OnInit {
  private _gameService = inject(GameService);
  games: Game[] = [];

  ngOnInit(): void {
    this._gameService.getNominees()
      .subscribe( games => {
        this.games = games;
      });
  }

  voteGame(game: Game) {
    this._gameService.voteGame(game.id)
      .subscribe( (resp: any) => {
        if (resp.ok) {
          Swal.fire('Thanks!', resp.message, 'success');
        } else {
          Swal.fire('Oops!', resp.message, 'error');
        }
      });
  }
}
