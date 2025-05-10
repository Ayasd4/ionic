import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsomationStatPageRoutingModule } from './consomation-stat-routing.module';

import { ConsomationStatPage } from './consomation-stat.page';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterComponent } from '../footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsomationStatPageRoutingModule,
    ConsomationStatPage,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatOptionModule,
    ReactiveFormsModule,
    HighchartsChartModule ,
      FooterComponent
    
  ],
  //declarations: [ConsomationStatPage]
})
export class ConsomationStatPageModule {}
