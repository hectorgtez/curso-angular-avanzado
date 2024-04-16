import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrl: './grafico-barra-horizontal.component.css'
})
export class GraficoBarraHorizontalComponent implements OnDestroy {
  results: any[] = [
    {
      "name": "Juego 1",
      "value": 20
    },
    {
      "name": "Juego 2",
      "value": 25
    },
    {
      "name": "Juego 3",
      "value": 15
    },
    {
      "name": "Juego 4",
      "value": 30
    }
  ];

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

  interval;

  constructor() {
    this.interval = setInterval(() => {
      const newResults = [...this.results];
      for (let i in newResults) {
        newResults[i].value = Math.round(Math.random() * 500);
      }

      this.results = [...newResults];
    }, 1500);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  onSelect(event: any) {
    console.log(event);
  }
}
