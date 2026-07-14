import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AuthInterceptor } from './core/auth.interceptor'; 
import { routes } from './app-routing.module'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
  
    provideHttpClient(withInterceptorsFromDi()), 
    
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};