import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IonicModule } from '@ionic/angular';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from '../login/login.service';
import { FooterComponent } from '../footer/footer.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    MatSnackBarModule,
    FooterComponent
  ]
})
export class ChangePasswordPage implements OnInit {

  changePasswordForm: FormGroup;
  errorMessage: string = '';
  message: string = '';


  isLoggedIn: boolean = false;
  user: any;
  subscription!: Subscription;
  popoverOpen = false;
  popoverEvent: any;

  constructor(private loginService: LoginService,
    private ngxService: NgxUiLoaderService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private router: Router,

  ) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]], //, Validators.oldPassword
      newPassword: ['', [Validators.required, Validators.minLength(6)]], //, Validators.newPassword
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  ngOnInit() {
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

  onChange() {
    this.ngxService.start();
    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

      // Vérifier si les nouveaux mots de passe correspondent
      if (newPassword !== confirmPassword) {
        this.ngxService.stop();
        this.errorMessage = 'New passwords do not match';
        this.snackbar.open('New passwords do not match', 'close', { duration: 6000 })
        this.message = '';
        return;
      }


      this.loginService.changePassword(oldPassword, newPassword).subscribe((response: any) => {
        this.ngxService.stop();


        this.message = response.message;
        this.errorMessage = '';

      }, (error) => {
        this.ngxService.stop();
        console.log("error:", error);
        //this.snackbar.open('Somthing was wrong, please try again!', 'close', {duration: 6000})
        this.errorMessage = 'Somthing was wrong, please try again!';
        this.message = '';
      });
    }
  }

}
