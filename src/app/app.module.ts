import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { UnDataService } from './services/un-data-service.service';
import { HeaderComponent } from './header/header/header.component';
import { DataChartComponent } from './charts/data-chart/data-chart.component';
import { CountryGridComponent } from './grid/country-grid/country-grid.component';
import { MessageService} from './services/message.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DataChartComponent,
    CountryGridComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AgGridModule.withComponents([])
  ],
  providers: [UnDataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
