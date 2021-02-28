import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SerieService } from "../serie.service";
import { Serie } from "../models/Serie";
import { Actor } from "../models/Actor";
import { Location } from "@angular/common";

@Component({
  selector: "app-serie",
  templateUrl: "./serie.component.html",
  styleUrls: ["./serie.component.css"]
})
export class SerieComponent implements OnInit {
  serie: Serie;
  serieApi = null;

  constructor(
    private route: ActivatedRoute,
    private serieService: SerieService,
    private location: Location
  ) {}

  getSerie(): void {
    let id = this.route.snapshot.paramMap.get("id");
    this.serieService.getSerie(id).subscribe(e => {
      this.serieApi = e;
      let actores: Array<Actor> = new Array();
      for (let actor of this.serieApi[0].actores) {
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
      this.serie = new Serie(
        this.serieApi[0].id,
        this.serieApi[0].nombre,
        this.serieApi[0].visualizaciones,
        this.serieApi[0].temporadas,
        this.serieApi[0].episodios,
        actores
      );
    });
  }

  add(
    idActor: string,
    nombre: string,
    temporadaAparicion: string,
    minutosAparicion: string,
    notaIMDB: string
  ) {
    const idActorV = parseInt(idActor);
    const nombreV = nombre.trim();
    const temporadaAparicionV = parseInt(temporadaAparicion);
    const minutosAparicionV = parseInt(minutosAparicion);
    const notaIMDBV = parseInt(notaIMDB);

    if (
      idActorV < 0 ||
      temporadaAparicionV < 0 ||
      minutosAparicionV < 0 ||
      notaIMDBV < 0
    ) {
      return;
    }

    const newDoc: any = {
      idActor: idActorV,
      nombre: nombreV,
      serie: this.serie.nombre,
      temporadaAparicion: temporadaAparicionV,
      minutosAparicion: minutosAparicionV,
      notaIMDB: notaIMDBV
    };

    this.serieService.addActor(newDoc).subscribe(j => {
      const actorTmp: any = newDoc;
      this.serie.actores.push(actorTmp);
    });
  }

  save(visualizaciones: string, temporadas: string, episodios: string): void {
    const visualizacionesV = parseInt(visualizaciones);
    const temporadasV = parseInt(temporadas);
    const episodiosV = parseInt(episodios);
    if (visualizacionesV < 0 || temporadasV < 0 || episodiosV < 0) {
      return;
    }
    const doc = {
      id: this.serie.id,
      nombre: this.serie.nombre,
      visualizaciones: visualizacionesV,
      temporadas: temporadasV,
      episodios: episodiosV
    };
    this.serieService.updateSerie(doc).subscribe(() => this.goBack());
  }

  delete(actor: Actor): void {
    this.serie.actores.forEach((j, index) => {
      if (j === actor) this.serie.actores.splice(index, 1);
    });
    this.serieService.deleteActor(actor).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getSerie();
  }
}
