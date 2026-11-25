import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

/* importa modulos base, formularios e componentes visuais do Material. */
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Topping } from '../../models/bubble-tea.model';
import { BubbleTeaService } from '../../services/bubble-tea.service';

/* importa inputs, selects, botoes, modelo Topping e servico CRUD. */
@Component({
  selector: 'app-toppings',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './toppings.component.html',
/* configura ToppingsComponent standalone com os modulos do formulario e cards. */
  styleUrl: './toppings.component.css'
})
export class ToppingsComponent implements OnInit {
  toppings: Topping[] = [];
  categorias = ['Clássico', 'Frutado', 'Cobertura', 'Geleia'];
  toppingForm: Topping = { id: 0, nome: '', categoria: 'Clássico', precoExtra: 4.00 };
/* vincula o estilo CSS e inicia lista de toppings, categorias e formulario. */
  constructor(private service: BubbleTeaService) {}
  ngOnInit(): void { this.carregarToppings(); }
  carregarToppings(): void { this.toppings = this.service.listarToppings(); }
  salvarTopping(): void {
    if (!this.toppingForm.nome.trim()) return;
/* injeta servico, carrega toppings iniciais e valida o nome antes de salvar. */
    this.service.salvarTopping({ ...this.toppingForm });
    this.limparFormulario();
    this.carregarToppings();
  }
  editarTopping(item: Topping): void { this.toppingForm = { ...item }; }
/* salva ou atualiza o topping, limpa formulario, recarrega e permite editar. */
  excluirTopping(id: number): void {
    this.service.excluirTopping(id);
    this.carregarToppings();
  }
  limparFormulario(): void {
    this.toppingForm = { id: 0, nome: '', categoria: 'Clássico', precoExtra: 4.00 };
/* exclui o topping pelo id, atualiza lista e inicia limpeza dos campos. */
  }
}
/* restaura o formulario para os valores iniciais e encerra a classe. */
