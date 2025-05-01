import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculeStatPageRoutingModule } from './vehicule-stat-routing.module';

import { VehiculeStatPage } from './vehicule-stat.page';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiculeStatPageRoutingModule,
    ChartModule,
    VehiculeStatPage
  ],
  //declarations: [VehiculeStatPage]
})
export class VehiculeStatPageModule {}
