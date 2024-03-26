import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.perfilForm = this._fb.group({
      nombre: ['123', Validators.required],
      email: ['abc', [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this._usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe( resp => {
        console.log(resp);
      });
  }
}
