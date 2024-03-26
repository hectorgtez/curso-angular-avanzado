import { Component } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  public menuItems: any[];
  public usuario!: Usuario;

  constructor(
    private _sidebarService: SidebarService,
    private _usuarioService: UsuarioService,
  ) {
    this.menuItems = _sidebarService.menu;
    this.usuario = _usuarioService.usuario;
  }
}
