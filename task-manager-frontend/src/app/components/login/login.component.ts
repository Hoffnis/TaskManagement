import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  efetuarLogin(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const credenciais = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.http.post<any>('http://localhost:8080/auth/login', credenciais)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          localStorage.setItem('jwt_token', response.token);
          alert('Login realizado com sucesso!');
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          alert('Credenciais inválidas ou erro na autenticação.');
          console.error(err);
        }
      });
  }
}