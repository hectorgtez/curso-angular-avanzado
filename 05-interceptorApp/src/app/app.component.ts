import { Component, inject } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InterceptorApp';

  private _usersService = inject(UsersService);

  constructor() {
    this._usersService.getUsers()
      .subscribe( resp => {
        console.log(resp);
      }, (err) => {
        console.log('Error en el appComponent');
      });
  }
}
