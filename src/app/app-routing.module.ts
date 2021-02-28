import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SeriesComponent } from "./series/series.component";
import { RouterModule, Routes } from "@angular/router";
import { SerieComponent } from "./serie/serie.component";
import { ActorComponent } from "./actor/actor.component";
import { GraficaminComponent } from "./graficamin/graficamin.component";
import { GraficavisComponent } from "./graficavis/graficavis.component";
import { IntroduccionComponent } from "./introduccion/introduccion.component";

const routes: Routes = [
  { path: "introduccion", component: IntroduccionComponent },
  { path: "series", component: SeriesComponent },
  { path: "serie/:id", component: SerieComponent },
  { path: "actor/:idActor", component: ActorComponent },
  { path: "graficamin", component: GraficaminComponent },
  { path: "graficavis", component: GraficavisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
