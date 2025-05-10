import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class FooterComponent implements OnInit {

  constructor(private router: Router,
    private navCtrl: NavController
  ) { }

  isActive(route: string): boolean {
    //return this.router.url === route;
    return this.router.url.startsWith(route); // gère aussi les sous-routes

  }
  
  ngOnInit() { }

  goToDashbord(){
    this.navCtrl.navigateForward('/dashboard');

    //this.router.navigate(['/dashbord'])
  }

  goToVehiculeStat(){
    this.navCtrl.navigateForward('/vehicule-stat');

    //this.router.navigate(['/dashbord'])
  }

  goToOrderStat(){
    this.navCtrl.navigateForward('/order-stat');

    //this.router.navigate(['/dashbord'])
  }

  goToConsomationStat(){
    this.navCtrl.navigateForward('/consomation-stat');

    //this.router.navigate(['/dashbord'])
  }

}
