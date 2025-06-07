import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InterventionStatPage } from './intervention-stat.page';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HighchartsChartModule } from 'highcharts-angular';
import { FooterComponent } from '../footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { InterventionStatPageRoutingModule } from './intervention-stat-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterventionStatPage,
    InterventionStatPageRoutingModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    FooterComponent,
    MatIconModule

  ]
  //declarations: [InterventionStatPage]
})
export class InterventionStatPageModule {}
