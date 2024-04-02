import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public imgSubs!: Subscription;
  public from: number = 0;
  public cargando: boolean = true;

  constructor(
    private _usuarioService: UsuarioService,
    private _busquedasService: BusquedasService,
    private _modalImagenService: ModalImagenService,
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this._modalImagenService.nuevaImagen
      .pipe( delay(100) )
      .subscribe( img => this.cargarUsuarios() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
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

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this._usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a sí mismo', 'error');
    }

    return Swal.fire({
      title: '¿Está seguro?',
      text: `Está a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then( (result) => {
      if (result.value) {
        this._usuarioService.eliminarUsuario(usuario)
          .subscribe( resp => {
            this.cargarUsuarios();
            Swal.fire(
              'Borrado',
              `${ usuario.nombre } se ha borrado correctamente`,
              'success'
            );
          });
      }
    });
  }

  cambiarRole(usuario: Usuario)  {
    this._usuarioService.guardarUsuario(usuario)
      .subscribe( resp => {
        console.log(resp);
      });
  }

  abrirModal(usuario: Usuario) {
    this._modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }
}
