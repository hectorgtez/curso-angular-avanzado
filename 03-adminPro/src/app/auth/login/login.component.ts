import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formSubmitted= false;

  public loginForm: FormGroup = this._fb.group({
    email: ['correo16@correo.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    remember: [false],
  });

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
  ) { }

  login(): void {
    this._usuarioService.login(this.loginForm.value)
      .subscribe( resp => {
        console.log(resp);
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      })

    // this._router.navigateByUrl('/');
  }
}
