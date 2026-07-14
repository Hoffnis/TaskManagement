import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module'; 
import { AuthInterceptor } from './core/auth.interceptor';

// Componentes Standalone (Todos eles!)
import { AppComponent } from './app.component';
import { TaskFormComponent } from './components/task-form/task-form';
import { TaskListComponent } from './components/task-list/task-list';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    // Deixe este bloco totalmente VAZIO, pois não temos nenhum componente "tradicional"
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    
    // Todos os componentes Standalone entram aqui:
    AppComponent,
    TaskFormComponent,
    TaskListComponent,
    LoginComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent] // O bootstrap continua apontando para o componente raiz normalmente!
})
export class AppModule { }