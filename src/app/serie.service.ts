import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actor } from "./models/Actor";

@Injectable({ providedIn: "root" })
export class SerieService {
  private url = "https://proyectoangular-jrj.herokuapp.com/";
  constructor(private http: HttpClient) {}
  getSeriesApi() {
    const urlget = `${this.url}series`;
    return this.http.get(urlget);
  }

  addSerie(doc: any) {
    return this.http.post(this.url, doc);
  }

  getSerie(id: string) {
    const url = `https://proyectoangular-jrj.herokuapp.com/serie/${id}`;
    return this.http.get(url);
  }

  addActor(doc: any) {
    const url = "https://proyectoangular-jrj.herokuapp.com/actor";
    return this.http.post(url, doc);
  }

  updateSerie(doc: any) {
    const url = `https://proyectoangular-jrj.herokuapp.com/serie/${doc.id}`;
    return this.http.post(url, doc);
  }

  deleteActor(actor: Actor) {
    const url = `https://proyectoangular-jrj.herokuapp.com/deleteActor/${
      actor.idActor
    }&${actor.serie}`;
    return this.http.get(url);
  }

  getActor(idActor: string, serie: string) {
    const url = `https://proyectoangular-jrj.herokuapp.com/actor/${idActor}&${serie}`;
    return this.http.get(url);
  }

  updateActor(doc: any) {
    const url = `https://proyectoangular-jrj.herokuapp.com/actor/${
      doc.idActor
    }&${doc.serie}`;
    return this.http.post(url, doc);
  }
}
