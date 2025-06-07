import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { IonicModule } from '@ionic/angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { StatService } from '../services/stat.service';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-intervention-stat',
  templateUrl: './intervention-stat.page.html',
  styleUrls: ['./intervention-stat.page.scss'],
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
    FooterComponent,
    //InterventionStatPage,
    //InterventionStatPageRoutingModule
  ]
})
export class InterventionStatPage implements OnInit {
  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  isLoggedIn: boolean = false;
  user: any;
  subscription!: Subscription;
  popoverOpen = false;
  popoverEvent: any;
  showChart: boolean = false;


  constructor(private statService: StatService,
    private router: Router,
    private loginService: LoginService,
    private cdRef: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService,

  ) { }

  ngOnInit(): void {
    this.getTotalElectrique();
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


  }

  atelierCategories: string[] = [];
  atelierData: number[] = [];


  getTotalElectrique() {
    Promise.all([
      this.statService.elecTotal().toPromise(),
      this.statService.mecanTotal().toPromise(),
      this.statService.volcTotal().toPromise(),
      this.statService.moteurTotal().toPromise(),
      this.statService.tolerieTotal().toPromise(),
      this.statService.prevTotal().toPromise(),
    ])

      .then(([electrique, mecanique, volcanisation, moteur, tolerie, preventive]) => {
        const categories = [
          'Atelier Électrique',
          'Atelier Mécanique',
          'Atelier Volcanisation',
          'Atelier Moteur',
          'Atelier Tôlerie',
          'Atelier Préventive'
        ];

        const data = [
          +electrique?.[0]?.total_intervention || 0,
          +mecanique?.[0]?.total_intervention || 0,
          +volcanisation?.[0]?.total_intervention || 0,
          +moteur?.[0]?.total_intervention || 0,
          +tolerie?.[0]?.total_intervention || 0,
          +preventive?.[0]?.total_intervention || 0
        ];

        this.atelierCategories = categories;
        this.atelierData = data;

        //graphique: bar chart
        this.chartOptions = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'les interventions par atelier'
          },
          xAxis: {
            categories: categories,
            title: { text: 'Ateliers' }
          },
          yAxis: {
            min: 0,
            title: { text: 'Nombre d’interventions' }
          },
          series: [{
            name: 'Interventions',
            type: 'column',
            data: data
          }]
        };
      })
      .catch(error => {
        console.error('Error while loading statistical data:', error);
      });
  }


}


