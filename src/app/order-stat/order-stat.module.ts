import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderStatPageRoutingModule } from './order-stat-routing.module';

import { OrderStatPage } from './order-stat.page';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/index.d-DSgY27vJ';
import { MatSelectModule } from '@angular/material/module.d-DBDMCw5I';
import { MatFormFieldModule } from '@angular/material/module.d-vndDeG-q';
import { HighchartsChartModule } from 'highcharts-angular';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderStatPageRoutingModule,
    OrderStatPage,
    FooterComponent


  ],
  //declarations: [OrderStatPage]
})
export class OrderStatPageModule { }
