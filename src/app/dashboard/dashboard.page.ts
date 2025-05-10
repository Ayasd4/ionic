import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardService } from './dashboard.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordPage } from '../change-password/change-password.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    FooterComponent
    //FontAwesomeModule

  ]
})
export class DashboardPage implements OnInit {
  totalVehicles: number = 0;
  totalDrivers: number = 0;
  totalTechnicians: number = 0;
  totalAteliers: number = 0;

  /*faBus = faBus;
  faCar = faCar;
  faUserTie = faUserTie;
  faTools = faTools;
  faUserGear = faUserGear;*/

  isLoggedIn: boolean = false;
  user: any;
  subscription!: Subscription;
  popoverOpen = false;
  popoverEvent: any;


  constructor(private dashboardService: DashboardService,
    private router: Router,
    private loginService: LoginService,
    private cdRef: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadTotalVehicules();
    this.loadTotalDrivers();
    this.loadTotalTechnicians();
    this.loadTotalAteliers();
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

    /*const dialogConfig = new MatDialogConfig;
    dialogConfig.width = "550px";
    this.dialog.open(ChangePasswordPage, dialogConfig);*/
  }




  isActive(route: string): boolean {
    return this.router.url === route;
  }
  
  /*get currentRoute() {
    return this.router.url;
  }*/

  loadTotalVehicules() {
    this.dashboardService.getTotalVehicule().subscribe({
      next: (response) => {
        this.totalVehicles = response.total;
      },
      error: (error) => {
        console.error('Error while load number of vehicule:', error);
      }
    })
  }

  loadTotalDrivers() {
    this.dashboardService.getTotalChauffeur().subscribe({
      next: (response) => {
        this.totalDrivers = response.total;
      },
      error: (error) => {
        console.error('Error while load number of Drivers:', error);
      }
    })
  }

  loadTotalTechnicians() {
    this.dashboardService.getTotalTechnicien().subscribe({
      next: (response) => {
        this.totalTechnicians = response.total;
      },
      error: (error) => {
        console.error('Error while load number of Technicians:', error);
      }
    })
  }

  loadTotalAteliers() {
    this.dashboardService.getTotalAtelier().subscribe({
      next: (response) => {
        this.totalAteliers = response.total;
      },
      error: (error) => {
        console.error('Error while load number of Workshops:', error);
      }
    })
  }


}
