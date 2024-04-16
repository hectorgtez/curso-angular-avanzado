import { routes } from "./app.routes";
import { MedicoComponent } from "../../intermedio2/medico/medico.component";

describe('Rutas principales', () => {
  it('Debe de existir la ruta medico/:id', () => {
    expect(routes).toContain({ path: 'medico/:id', component: MedicoComponent });
  });
});
