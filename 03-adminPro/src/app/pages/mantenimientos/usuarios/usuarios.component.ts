import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public from: number = 0;
  public cargando: boolean = true;

  constructor(
    private _usuarioService: UsuarioService,
    private _busquedasService: BusquedasService,
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.from )
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.from += valor;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsuarios) {
      this.from -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    return this._busquedasService.buscar('usuarios', termino)
      .subscribe( resultados => {
        this.usuarios = resultados;
      });
  }
}
