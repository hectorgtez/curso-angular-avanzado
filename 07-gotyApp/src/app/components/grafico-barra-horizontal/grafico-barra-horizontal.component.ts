import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrl: './grafico-barra-horizontal.component.css'
})
export class GraficoBarraHorizontalComponent {
  @Input()
  results: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Games';
  showYAxisLabel = true;
  yAxisLabel = 'Votes';
  colorScheme = 'nightLights';

  constructor() {

  }

  onSelect(event: any) {
    console.log(event);
  }
}
