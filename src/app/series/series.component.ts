import { Component, OnInit } from "@angular/core";
import { SerieService } from "../serie.service";
import { Serie } from "../models/Serie";
import { Actor } from "../models/Actor";
@Component({
  selector: "app-series",
  templateUrl: "./series.component.html",
  styleUrls: ["./series.component.css"]
})
export class SeriesComponent implements OnInit {
  series: Array<Serie> = [];
  seriesApi = null;
  serieTmp: any;
  constructor(private serieService: SerieService) {}

  getSeriesApi() {
    this.serieService.getSeriesApi().subscribe(series => {
      this.seriesApi = series;
      for (let serie of this.seriesApi) {
        let actores: Array<Actor> = new Array();
        for (let actor of serie.actores) {
          let a = new Actor(
            actor.idActor,
            actor.nombre,
            actor.serie,
            actor.temporadaAparicion,
            actor.minutosAparicion,
            actor.notaIMDB
          );
          actores.push(a);
        }
        let e = new Serie(
          serie.id,
          serie.nombre,
          serie.visualizaciones,
          serie.temporadas,
          serie.episodios,
          actores
        );
        this.series.push(e);
      }
      this.series.sort((a, b) => (a.nota > b.nota ? -1 : 1));
    });
  }

  add(
    id: string,
    nombre: string,
    visualizaciones: string,
    temporadas: string,
    episodios: string
  ) {
    const idV = id.trim();
    const nombreV = nombre;
    const visualizacionesV = parseInt(visualizaciones);
    const temporadasV = parseInt(temporadas);
    const episodiosV = parseInt(episodios);

    if (visualizacionesV < 0 || temporadasV < 0 || episodiosV < 0) {
      return;
    }

    const newDoc: any = {
      id: idV,
      nombre: nombreV,
      visualizaciones: visualizacionesV,
      temporadas: temporadasV,
      episodios: episodiosV
    };

    this.serieService.addSerie(newDoc).subscribe(a => {
      this.serieTmp = newDoc;
      this.series.push(this.serieTmp);
    });
  }

  ngOnInit() {
    this.getSeriesApi();
  }
}
