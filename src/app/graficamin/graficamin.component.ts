import { Component, OnInit } from "@angular/core";
import { SerieService } from "../serie.service";
import { Serie } from "../models/Serie";
import { Actor } from "../models/Actor";

import * as Highcharts from "highcharts";

@Component({
  selector: "app-graficamin",
  templateUrl: "./graficamin.component.html",
  styleUrls: ["./graficamin.component.css"]
})
export class GraficaminComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  series: Array<Serie> = [];
  seriesApi = null;
  serieTmp: any;
  actores: Array<Actor> = [];

  chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: "white",
      borderRadius: 15,
      spacing: [20, 20, 20, 20]
    },
    title: {
      text: "Minutos de aparición",
      style: {
        fontFamily: "verdana",
        fontSize: "20px",
        color: "red"
      }
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: "Minutos"
      }
    },

    series: [
      {
        type: "column",
        name: "Series",
        data: [],
        color: "red"
      }
    ],
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030"
      }
    }
  };

  constructor(private serieService: SerieService) {}

  getActores() {
    this.serieService.getSeriesApi().subscribe(series => {
      this.seriesApi = series;
      for (let serie of this.seriesApi) {
        for (let actor of serie.actores) {
          let a = new Actor(
            actor.idActor,
            actor.nombre,
            actor.serie,
            actor.temporadaAparicion,
            actor.minutosAparicion,
            actor.notaIMDB
          );
          this.actores.push(a);
        }
      }
      this.actores.sort((a, b) =>
        a.minutosAparicion > b.minutosAparicion ? -1 : 1
      );
      let graficamin = this.actores.slice(0, 10);
      this.chartOptions.xAxis["categories"] = graficamin.map(
        (x: Actor) => x.nombre
      );
      this.chartOptions.series[0]["data"] = graficamin.map(
        (x: Actor) => x.minutosAparicion
      );

      Highcharts.chart("graficamin", this.chartOptions);
    });
  }

  ngOnInit() {
    this.getActores();
  }
}
