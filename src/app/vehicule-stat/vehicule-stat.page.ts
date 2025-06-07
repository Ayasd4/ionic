import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardService } from '../dashboard/dashboard.service';
import { Chart, ChartModule } from 'angular-highcharts';
import { StatService } from '../services/stat.service';
import { FooterComponent } from '../footer/footer.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-vehicule-stat',
  templateUrl: './vehicule-stat.page.html',
  styleUrls: ['./vehicule-stat.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartModule,
    ReactiveFormsModule,
    FooterComponent

  ]
})
export class VehiculeStatPage implements OnInit {

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
  
  chart!: Chart;
  chartOptions: Highcharts.Options = {};

  isLoggedIn: boolean = false;
  user: any;
  subscription!: Subscription;
  popoverOpen = false;
  popoverEvent: any;

  constructor(private statService: StatService,
    private router: Router,
    private loginService: LoginService,
    private cdRef: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService,
  ) { }

  dispoService: number = 0;
  dispoMaint: number = 0;
  dispoPanne: number = 0;

  ngOnInit(): void {
    this.loadDisponibilites();
    this.profilUser();
  }

  profilUser() {
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

    /*const dialogConfig = new MatDialogConfig;
    dialogConfig.width = "550px";
    this.dialog.open(ChangePasswordPage, dialogConfig);*/
  }


  loadDisponibilites() {
    // On attend les 3 appels à l’API avant de créer le graphique
    Promise.all([
      this.statService.getDispoService().toPromise(),
      this.statService.getDispoMaint().toPromise(),
      this.statService.getDispoPanne().toPromise()
    ])
      .then(([resService, resMaint, resPanne]) => {
        this.dispoService = parseFloat(resService.disponibilite.replace('%', ''));
        this.dispoMaint = parseFloat(resMaint.disponibilite.replace('%', ''));
        this.dispoPanne = parseFloat(resPanne.disponibilite.replace('%', ''));

        this.createChart();
      })
      .catch(error => {
        console.error('Erreur lors du chargement des disponibilités :', error);
      });
  }

  createChart() {
    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 325
      },
      title: {
        text: 'Vehicles Disponibilities'
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              name: 'En Service',
              y: this.dispoService,
              color: '#28a745'
            },
            {
              name: 'En Maintenance',
              y: this.dispoMaint,
              color: '#ffc107'
            },
            {
              name: 'En Panne',
              y: this.dispoPanne,
              color: '#dc3545'
            }
          ]
        }
      ],
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          size: '75%',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black',
              fontSize: '10.5px'
            }
          },
          showInLegend: false
        }
      },
      credits: {
        enabled: false
      }
    });
  }


}



