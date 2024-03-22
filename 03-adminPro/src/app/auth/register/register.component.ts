import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {
  public formSubmitted= false;

  public registerForm = this._fb.group({
    nombre: ['Manuel', Validators.required],
    email: ['correo16@correo.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [false, Validators.requiredTrue],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
  ) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar posteo
    this._usuarioService.crearUsuario(this.registerForm.value)
      .subscribe( resp => {
        console.log('Usuario creado!');
        console.log(resp);
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  campoNoValido( campo: string ): boolean {
    if (this.registerForm.get(campo)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')!.value;
    const pass2 = this.registerForm.get('password2')!.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos')!.value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control!.value === pass2Control!.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }
}
