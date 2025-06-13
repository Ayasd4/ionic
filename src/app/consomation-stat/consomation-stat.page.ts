import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { NumparcService } from '../services/numparc.service';
import { StatService } from '../services/stat.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterComponent } from '../footer/footer.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-consomation-stat',
  templateUrl: './consomation-stat.page.html',
  styleUrls: ['./consomation-stat.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatOptionModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    MatSnackBarModule,
    FooterComponent

  ]
})
export class ConsomationStatPage implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  numparc: any = undefined;
  annee: any = undefined;


  //numparc: string = '';
  isLoggedIn: boolean = false;
  user: any;
  subscription!: Subscription;
  popoverOpen = false;
  popoverEvent: any;
  showChart: boolean = false;
  numparcList: number[] = [];
  consomationMensuelle: any[] = [];


  constructor(private statService: StatService,
    private numparcService: NumparcService,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService,
    private cdRef: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService,

  ) {
    this.getNumparc();
  }
  ngOnInit(): void {
    this.fetchConsomation();
    this.profilUser();


  }

  profilUser(){
    this.subscription = this.loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      console.log("isLoggedIn:", this.isLoggedIn);
      if (this.isLoggedIn) {
        this.user = this.loginService.getUser(); // Récupère les données de l'utilisateur
        console.log("Utilisateur connecté:", this.user); // Vérifiez que l'utilisateur est récupéré
      }
      this.cdRef.detectChanges(); //Force Angular à mettre à jour la vue
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openPopover(ev: any) {
    this.popoverEvent = ev;
    this.popoverOpen = true;
  }


  logout() {
    this.ngxService.start();
    console.log('user logged out');
    this.loginService.logout();
    this.isLoggedIn = false;

    setTimeout(() => {
      this.ngxService.stop(); // Arrêter l'animation ou le chargement
      this.router.navigate(['/login']);
    }, 500);
  }

  changePassword() {
    this.router.navigateByUrl('/change-password');


  }

  getNumparc() {
    this.numparcService.fetchAllNumparc().subscribe({
      next: (data) => {
        console.log('List of numparc received:', data);  // Vérifiez si les données sont bien récupérées
        //this.numparcList = data;
        this.numparcList = data.map((item: any) => item.numparc);
      },
      error: (err) => {
        console.error('Error loading numparcs', err);
      }
    });
  }
  fetchConsomation() {
 

    this.statService.getTotalConsomationByVehiculeAndMonth(this.numparc).subscribe({
      next: (data) => {
        this.consomationMensuelle = data;
        const categories = data.map(d => `${d.mois}/${d.annee}`);
        const seriesData = data.map(d => d.total_consommation);

        this.chartOptions = {
          chart: {
            type: 'line'
          },
          title: {
            text: `Consommation de carburant pour ${this.numparc}`
          },
          xAxis: {
            categories: categories
          },
          yAxis: {
            title: {
              text: 'Total Consommation (Litres)'
            }
          },
          series: [{
            name: 'Consommation',
            data: seriesData,
            type: 'line',
            color: '#556b2fd3'

          }]
        };

        this.showChart = true;
      },
      error: (err) => {
        console.error(err);
        //this.snackBar.open('vehicule doesnt exist', 'close', { duration: 8000 });

        //alert('Erreur lors  la récupération des données');
      }
    });
  }

}
