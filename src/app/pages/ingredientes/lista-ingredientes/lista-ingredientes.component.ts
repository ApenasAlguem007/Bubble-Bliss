import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Ingrediente } from '../../../models/ingrediente';

// A tabela Material organiza os ingredientes em colunas fáceis de consultar.

import { IngredienteService } from '../../../services/ingrediente.service';

@Component({
  selector: 'app-lista-ingredientes',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './lista-ingredientes.component.html',
  styleUrl: './lista-ingredientes.component.scss'
})
export class ListaIngredientesComponent implements OnInit {
  ingredientes: Ingrediente[] = [];
  colunas = ['nome', 'categoria', 'quantidade', 'acoes'];

  // Os nomes acima definem a ordem das colunas apresentadas na tabela.

  constructor(private servico: IngredienteService, private router: Router) {}

  ngOnInit(): void { this.carregar(); }
  carregar(): void { this.ingredientes = this.servico.listar(); }
  editar(id: string): void { this.router.navigate(['/ingredientes/editar', id]); }

  excluir(id: string, nome: string): void {
    if (confirm(`Deseja realmente excluir ${nome}?`)) {
      this.servico.excluir(id);
      this.carregar();
    }
  }
}
