import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginService } from './login.service';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from './token.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class LoginPage implements OnInit {
  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  loginForm: FormGroup;
  errorMessage: string = '';
  userRole: string = '';  // Variable pour stocker le rôle de l'utilisateur
  progress = 0;
  progressInterval: any;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private fb: FormBuilder,
    private authService: LoginService,
    private tokenService: TokenService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  ngOnInit() { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  login() {

    /*if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }*/

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const data = this.loginForm.value;

    const { email, password } = this.loginForm.value;

    // Démarrer la barre de progression animée
    this.progress = 0.1;
    this.progressInterval = setInterval(() => {
      if (this.progress < 0.9) {
        this.progress += 0.01;
      }
    }, 50)

    this.authService.login(email, password).subscribe({
      next: (response) => {
        clearInterval(this.progressInterval); // arrêter l'animation
        this.progress += 0.01;

        console.log('Réponse de connexion:', response); // Inspecte la réponse

        if (response && response.token && response.user) {
          // Sauvegarder le token et l'utilisateur dans le localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          console.log("Utilisateur stocké dans localStorage:", localStorage.getItem('user')); // 🛠️ Vérifier le stockage
          console.log("Token stocké dans localStorage:", localStorage.getItem('token'));

          this.authService.setLoggedIn(true);

          // Redirection en fonction du rôle
          const userRole = response.user.roles;

          if (userRole.includes('chef de direction technique')) {
            this.router.navigate(['/dashboard']);

          } else {
            this.router.navigate(['/login']);
          }


        } else {
          this.errorMessage = 'Invalid credentials';
          console.error('Réponse non valide');
        }

      },
      error: (error) => {
        clearInterval(this.progressInterval); // arrêter l'animation
        this.progress = 0; // Échec : on cache la barre

        console.error('Login error', error);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

}
