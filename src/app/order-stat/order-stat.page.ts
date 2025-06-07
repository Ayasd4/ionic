import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Chart, ChartModule } from 'angular-highcharts';
import { StatService } from '../services/stat.service';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-stat',
  templateUrl: './order-stat.page.html',
  styleUrls: ['./order-stat.page.scss'],
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
export class OrderStatPage implements OnInit {

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  chart!: Chart;

  constructor(private statService: StatService,
    private router: Router,
    private loginService: LoginService,
    private cdRef: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService,
  ) { }
  dispoOuvert: number = 0;
  dispoEnCours: number = 0;
  dispoFerme: number = 0;

  isLoggedIn: boolean = false;
  user: any;
  subscription!: Subscription;
  popoverOpen = false;
  popoverEvent: any;

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
      this.statService.getDispoOuvert().toPromise(),
      this.statService.getDispoEnCours().toPromise(),
      this.statService.getDispoFerme().toPromise()
    ])
      .then(([resOuvert, resEnCours, resFerme]) => {
        this.dispoOuvert = parseFloat(resOuvert.disponibilite.replace('%', ''));
        this.dispoEnCours = parseFloat(resEnCours.disponibilite.replace('%', ''));
        this.dispoFerme = parseFloat(resFerme.disponibilite.replace('%', ''));

        this.createChart();
      })
      .catch(error => {
        console.error('Erreur lors du chargement des disponibilités :', error);
      });
  }

  createChart() {
    const self = this; // pour accéder aux données dans le scope de render()

    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 325,
        events: {
          render() {
            const chart = this,
              series = chart.series[0];
            let customLabel: any = (chart as any).customLabel;

            const total = self.dispoOuvert + self.dispoEnCours + self.dispoFerme;

            if (!customLabel) {
              (chart as any).customLabel = chart.renderer
                .label(`Total<br/><strong>${total}</strong>`, 0, 0)
                .css({
                  color: '#000',
                  textAlign: 'center'
                })
                .add();
              customLabel = (chart as any).customLabel;
            }

            const x = series.center[0] + chart.plotLeft;
            const y = series.center[1] + chart.plotTop - (customLabel.getBBox().height / 2);

            customLabel.attr({ x, y });
            customLabel.css({
              fontSize: `${series.center[2] / 12}px`
            });
          }
        }
      },
      title: {
        text: 'Order Disponibilities'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          innerSize: '75%',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.0f}%',
            style: {
              fontSize: '11px'
            }
          }
        }
      },
      series: [
        {
          type: 'pie',
          name: 'Orders',
          data: [
            {
              name: 'Ouvert',
              y: this.dispoOuvert,
              color: '#93C572'
            },
            {
              name: 'En cours',
              y: this.dispoEnCours,
              color: '#89CFF0'
            },
            {
              name: 'Fermé',
              y: this.dispoFerme,
              color: '#99182C'
            }
          ]
        }
      ],
      credits: {
        enabled: false
      }
    });
  }


}
