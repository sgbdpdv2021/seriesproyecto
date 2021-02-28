import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { SerieService } from "../serie.service";

@Component({
  selector: "app-graficavis",
  templateUrl: "./graficavis.component.html",
  styleUrls: ["./graficavis.component.css"]
})
export class GraficavisComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: "white",
      borderRadius: 15,
      spacing: [20, 20, 20, 20]
    },
    title: {
      text: "Visualizaciones series"
    },
    yAxis: {
      accessibility: {},
      title: {
        text: "Visualizaciones"
      }
    },
    colors: ["red"],
    xAxis: {
      accessibility: {},
      title: {
        text: "Series"
      }
    },
    series: [
      {
        type: "area",
        data: [],
        name: "Visualizaciones",
        lineColor: "black"
      }
    ],

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      backgroundColor: "white"
    }
  };

  constructor(private serieService: SerieService) {}

  ngOnInit() {
    this.getDatos();
  }
  getDatos() {
    this.serieService.getSeriesApi().subscribe(
      result => {
        const misDatos: any = result;
        const dataSeries = misDatos.map((x: any) => x.visualizaciones);
        const dataCategorias = misDatos.map((x: any) => x.nombre);
        this.chartOptions.series[0]["data"] = dataSeries;
        this.chartOptions.xAxis["categories"] = dataCategorias;
        Highcharts.chart("graficavis", this.chartOptions);
      },
      error => console.log(error)
    );
  }
}
