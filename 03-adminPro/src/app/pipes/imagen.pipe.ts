import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../environments/environments';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  private _base_url: string = environment.base_url;

  transform(img: string, tipo: 'usuarios'|'hospitales'|'medicos'): string {
    if (!img) {
      return `${ this._base_url }/upload/${ tipo }/no-image`;
    } else if (img?.includes('https')) {
      return img;
    } else if (img) {
      return `${ this._base_url }/upload/${ tipo }/${ img }`;
    } else {
      return `${ this._base_url }/upload/${ tipo }/no-image`;
    }
  }

}
