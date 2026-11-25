import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

// Este componente mantém a identificação do projeto no fim de todas as páginas.

export class FooterComponent {
  ano = new Date().getFullYear();
}
