import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginService } from './login.service';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from './token.service';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
    //RouterModule.forChild(routes)
  ],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';
  userRole: string = '';  // Variable pour stocker le rôle de l'utilisateur

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private fb: FormBuilder,
    private authService: LoginService,
    private tokenService: TokenService,
    private router: Router,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {

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
        console.error('Login error', error);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

}
