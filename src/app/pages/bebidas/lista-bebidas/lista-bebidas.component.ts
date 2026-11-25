import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// Estes módulos criam cartões, formatam preços e permitem navegar pelas ações.

import { Bebida } from '../../../models/bebida';
import { BebidaService } from '../../../services/bebida.service';

@Component({
  selector: 'app-lista-bebidas',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './lista-bebidas.component.html',
  styleUrl: './lista-bebidas.component.scss'
})
export class ListaBebidasComponent implements OnInit {
  bebidas: Bebida[] = [];

  // O vetor acima recebe os registros entregues pelo serviço de bebidas.

  constructor(private servico: BebidaService, private router: Router) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.bebidas = this.servico.listar();
  }

  // Ao abrir a tela, os dados salvos são carregados e exibidos nos cartões.

  editar(id: string): void {
    this.router.navigate(['/bebidas/editar', id]);
  }

  excluir(id: string, nome: string): void {
    if (confirm(`Deseja realmente excluir ${nome}?`)) {
      this.servico.excluir(id);
      this.carregar();
    }
  }
}
