import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePage } from './home/home.page';
import { FooterComponent } from './footer/footer.component';
import { VehiculeStatPage } from './vehicule-stat/vehicule-stat.page';
import { OrderStatPage } from './order-stat/order-stat.page';
import { ConsomationStatPage } from './consomation-stat/consomation-stat.page';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';

// ✅ Angular Material imports corrigés :
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    HomePage,
    FooterComponent,
    VehiculeStatPage,
    OrderStatPage,
    ConsomationStatPage,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    ChartModule,

    // Angular Material modules
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule 
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
