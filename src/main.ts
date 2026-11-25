import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// As linhas anteriores importam os recursos necessários para iniciar a aplicação.

bootstrapApplication(AppComponent, appConfig)
  .catch((erro) => console.error(erro));
