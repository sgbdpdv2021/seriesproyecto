import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SerieService } from "../serie.service";
import { Actor } from "../models/Actor";
import { Location } from "@angular/common";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"]
})
export class ActorComponent implements OnInit {
  actor: Actor;
  actorApi = null;

  constructor(
    private route: ActivatedRoute,
    private serieService: SerieService,
    private location: Location
  ) {}

  getActor(): void {
    let idActor = this.route.snapshot.paramMap.get("ID actor");
    let i = idActor.split("&");

    idActor = i[0];
    let serie = i[1];
    console.log(idActor, serie);

    this.serieService.getActor(idActor, serie).subscribe(e => {
      this.actorApi = e;
      this.actor = new Actor(
        this.actorApi.idActor,
        this.actorApi.nombre,
        this.actorApi.serie,
        this.actorApi.temporadaAparicion,
        this.actorApi.minutosAparicion,
        this.actorApi.notaIMDB
      );
    });
    console.log(serie);
  }

  save(
    nombre: string,
    temporadaAparicion: string,
    minutosAparicion: string,
    notaIMDB: string
  ): void {
    const nombreV = nombre.trim();
    const temporadaAparicionV = parseInt(temporadaAparicion);
    const minutosAparicionV = parseInt(minutosAparicion);
    const notaIMDBV = parseInt(notaIMDB);
    if (temporadaAparicionV < 0 || minutosAparicionV < 0 || notaIMDBV < 0) {
      return;
    }
    const doc = {
      idActor: this.actor.idActor,
      nombre: nombreV,
      serie: this.actor.serie,
      temporadaAparicion: temporadaAparicionV,
      minutosAparicion: minutosAparicionV,
      notaIMDB: notaIMDBV
    };
    this.serieService.updateActor(doc).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getActor();
  }
}
