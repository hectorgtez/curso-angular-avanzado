import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';

import { Game } from '../../interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  private _firestore: Firestore = inject(Firestore);
  data$: Observable<any[]>
  games: any[] = [];

  constructor() {
    const aCollection = collection(this._firestore, 'goty');
    this.data$ = collectionData(aCollection);
  }

  ngOnInit(): void {
    this.data$
      .pipe(
        map( (resp: Game[]) => resp.map( ({ name, votes }) => ({ name, value: votes}) ))
      )
      .subscribe( games => {
        this.games = games;
      });
  }
}
