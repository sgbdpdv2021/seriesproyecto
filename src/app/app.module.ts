import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HighchartsChartModule } from "highcharts-angular";

import { AppComponent } from "./app.component";
import { SerieService } from "./serie.service";
import { SeriesComponent } from "./series/series.component";
import { AppRoutingModule } from "./app-routing.module";
import { SerieComponent } from "./serie/serie.component";
import { ActorComponent } from "./actor/actor.component";
import { GraficaminComponent } from "./graficamin/graficamin.component";
import { GraficavisComponent } from "./graficavis/graficavis.component";
import { IntroduccionComponent } from './introduccion/introduccion.component';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  declarations: [
    AppComponent,
    SeriesComponent,
    SerieComponent,
    ActorComponent,
    GraficaminComponent,
    GraficavisComponent,
    IntroduccionComponent
  ],
  bootstrap: [AppComponent],
  providers: [SerieService, {provide:
    APP_BASE_HREF, useValue: '/series'}]
})
export class AppModule {}
