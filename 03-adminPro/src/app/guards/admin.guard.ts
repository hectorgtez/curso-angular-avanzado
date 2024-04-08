import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _usuarioService = inject(UsuarioService);
  const _router = inject(Router);

  // return (_usuarioService.role === 'ADMIN_ROLE') ? true : false;

  if (_usuarioService.role === 'ADMIN_ROLE') {
    return true;
  } else {
    _router.navigateByUrl('/dashboard');
    return false;
  }
};
