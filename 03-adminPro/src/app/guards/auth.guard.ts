import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';

import { UsuarioService } from '../services/usuario.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _usuarioService = inject(UsuarioService);
  const _router = inject(Router);

  return _usuarioService.validarToken()
    .pipe(
      tap( isAuth => {
        if (!isAuth) {
          _router.navigateByUrl('/login');
        }
      }),
    );
};
