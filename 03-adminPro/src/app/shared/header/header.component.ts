import { Component } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  public usuario!: Usuario;

  constructor(
    private _usuarioService: UsuarioService,
  ) {
    this.usuario = _usuarioService.usuario;
  }

  logout() {
    this._usuarioService.logout();
  }
}
