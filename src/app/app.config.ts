import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Esta configuração ativa as animações do Material e o sistema de rotas.

export const appConfig: ApplicationConfig = {
  providers: [provideAnimationsAsync(), provideRouter(routes)]
};
