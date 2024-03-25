import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn')
  googleBtn!: ElementRef;

  public formSubmitted= false;

  public loginForm: FormGroup = this._fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private _router: Router,
    private _ngZone: NgZone,
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
  ) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "946825205599-blcrj20vq3oqqbdj6kuqlmecm197unb9.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this._usuarioService.loginGoogle( response.credential )
      .subscribe( resp => {
        this._ngZone.run(() => {
          this._router.navigateByUrl('/');
        });
      })
  }

  login(): void {
    this._usuarioService.login(this.loginForm.value)
      .subscribe( resp => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al dashboard
        this._ngZone.run(() => {
          this._router.navigateByUrl('/');
        });
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      })
  }
}
