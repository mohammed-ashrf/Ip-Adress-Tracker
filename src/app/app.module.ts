import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AutoSizeInputModule } from 'ngx-autosize-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { DatePipe } from '@angular/common';

import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { GeolocationService } from './services/geolocation.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    AutoSizeInputModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    ProcessHttpmsgService,
    GeolocationService,
    DatePipe,
    HomeComponent,
    MapComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
