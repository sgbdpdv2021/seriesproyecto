import { Actor } from "./Actor";

export class Serie {
  private _id: string;
  private _nombre: string;
  private _visualizaciones: number;
  private _temporadas: number;
  private _episodios: number;
  private _actores: Array<Actor>;

  public constructor(
    id: string,
    nombre: string,
    visualizaciones: number,
    temporadas: number,
    episodios: number,
    actores: Array<Actor>
  ) {
    (this._id = id),
      (this._nombre = nombre),
      (this._visualizaciones = visualizaciones),
      (this._temporadas = temporadas),
      (this._episodios = episodios),
      (this._actores = actores);
  }

  get id() {
    return this._id;
  }

  get nombre() {
    return this._nombre;
  }

  get visualizaciones() {
    return this._visualizaciones;
  }

  get temporadas() {
    return this._temporadas;
  }

  get episodios() {
    return this._episodios;
  }

  get actores() {
    return this._actores;
  }

  set nombre(nombre: string) {
    this.nombre = nombre;
  }

  set visualizaciones(visualizaciones: number) {
    this.visualizaciones = visualizaciones;
  }

  set temporadas(temporadas: number) {
    this.temporadas = temporadas;
  }

  set episodios(episodios: number) {
    this.episodios = episodios;
  }

  set actores(actores: Actor[]) {
    this.actores = actores;
  }

  get nota() {
    let res = 0;
    let cont = 0;
    for (let a of this.actores) {
      res = res + a.notaIMDB;
      cont = cont + 1;
    }
    res = res / cont;
    return res;
  }

  get episodiosTotales() {
    let res = this._temporadas * this._episodios;
    return res;
  }
}
