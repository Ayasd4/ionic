import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginService } from '../login/login.service';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    MatSnackBarModule,
    
  ]
})
export class ForgotPasswordPage implements OnInit {
   handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
  
  
  ngOnInit(): void {
    
  }

  forgotPasswordForm: FormGroup;
  message: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private ngxService: NgxUiLoaderService,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]//, Validators.pattern(GlobalConstants.emailRegex)
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit() {
    this.ngxService.start();
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      this.loginService.forgotPassword(email).subscribe({
        next: (response) => {
          this.ngxService.stop();
          alert('Un email de réinitialisation a été envoyé.');
          this.message = response.message;
          this.errorMessage = '';
        },
        error: (error) => {
          this.ngxService.stop();
          alert('Erreur lors de la réinitialisation du mot de passe.');
          this.errorMessage = error.error.message;
          this.message = '';
        }
      });
    }
  }

}
