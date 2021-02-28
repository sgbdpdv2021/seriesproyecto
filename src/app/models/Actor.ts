export class Actor {
  private _idActor: string;
  private _nombre: string;
  private _serie: string;
  private _temporadaAparicion: number;
  private _minutosAparicion: number;
  private _notaIMDB: number;

  public constructor(
    idActor: string,
    nombre: string,
    serie: string,
    temporadaAparicion: number,
    minutosAparicion: number,
    notaIMDB: number
  ) {
    (this._idActor = idActor),
      (this._nombre = nombre),
      (this._serie = serie),
      (this._temporadaAparicion = temporadaAparicion),
      (this._minutosAparicion = minutosAparicion),
      (this._notaIMDB = notaIMDB);
  }

  get idActor() {
    return this._idActor;
  }
  get nombre() {
    return this._nombre;
  }
  get serie() {
    return this._serie;
  }
  get temporadaAparicion() {
    return this._temporadaAparicion;
  }
  get minutosAparicion() {
    return this._minutosAparicion;
  }
  get notaIMDB() {
    return this._notaIMDB;
  }
}
