import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    private _router: Router,
    private _usuarioService: UsuarioService,
  ) {
    this.usuario = _usuarioService.usuario;
  }

  logout() {
    this._usuarioService.logout();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return;
    }

    this._router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }
}
