import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesComponent } from './components/cities/cities.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule } from '@angular/forms';
import { RoadComponent } from './components/road/road.component';


@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    TableComponent,
    RoadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
