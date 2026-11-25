import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

/* importa modulos base, formularios e componentes visuais do Material. */
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Bebida } from '../../models/bubble-tea.model';
import { BubbleTeaService } from '../../services/bubble-tea.service';

/* importa inputs, selects, botoes, modelo Bebida e servico CRUD. */
@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './cardapio.component.html',
/*  declara CardapioComponent standalone com todos os modulos necessarios. */
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent implements OnInit {
  bebidas: Bebida[] = [];
  sabores = ['Chá Preto', 'Matcha', 'Taro', 'Morango', 'Chá Verde'];
  tamanhos = ['500ml', '700ml'];
/* vincula o estilo CSS e define listas de bebidas, sabores e tamanhos. */
  bebidaForm: Bebida = { id: 0, nome: '', saborBase: 'Chá Preto', tamanho: '500ml', preco: 19.90, imagemUrl: '' };
  constructor(private service: BubbleTeaService) {}
  ngOnInit(): void { this.carregarBebidas(); }
  carregarBebidas(): void { this.bebidas = this.service.listarBebidas(); }
/* : inicia o formulario com campo imagemUrl, injeta servico e carrega lista. */
  salvarBebida(): void {
    if (!this.bebidaForm.nome.trim()) return;
    this.service.salvarBebida({ ...this.bebidaForm });
    this.limparFormulario();
    this.carregarBebidas();
/*  valida o nome, salva a bebida com foto externa/padrao e atualiza tela. */
  }
  editarBebida(item: Bebida): void { this.bebidaForm = { ...item }; }
  excluirBebida(id: number): void {
    this.service.excluirBebida(id);
    this.carregarBebidas();
/* carrega bebida no formulario para edicao e permite excluir pelo id. */
  }
  limparFormulario(): void {
    this.bebidaForm = { id: 0, nome: '', saborBase: 'Chá Preto', tamanho: '500ml', preco: 19.90, imagemUrl: '' };
  }
  aoFalharImagem(event: Event, saborBase: string): void {
/*  reseta os campos do formulario e inicia o fallback caso a foto falhe. */
    const img = event.target as HTMLImageElement;
    const local = this.service.obterFallbackLocal(saborBase);
    if (img && !img.src.endsWith(local)) img.src = local;
  }
}
/*  substitui automaticamente pela ilustracao SVG local se o link externo falhar. */
