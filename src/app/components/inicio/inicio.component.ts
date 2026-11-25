import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BubbleTeaService } from '../../services/bubble-tea.service';

/* importa RouterLink, cards e botoes do Material e o servico de dados. */
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './inicio.component.html',
/* configura o componente Inicio como standalone com seus modulos e template. */
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  totalBebidas = 0;
  totalToppings = 0;
/* associa o CSS e cria as variaveis que guardam os totais cadastrados. */
  bannerImg = 'https://images.unsplash.com/photo-1525803377227-420ab64e9037?auto=format&fit=crop&w=900&q=80';
  fallbackImg = 'assets/images/banner.svg';
  constructor(private service: BubbleTeaService) {}
  ngOnInit(): void {
/* define a foto externa do banner, o SVG local de reserva e injeta o servico. */
    this.totalBebidas = this.service.listarBebidas().length;
    this.totalToppings = this.service.listarToppings().length;
  }
  aoFalharImagem(event: Event): void {
    const img = event.target as HTMLImageElement;
/* carrega os contadores na inicializacao e prepara o fallback de imagem. */
    if (img && !img.src.endsWith(this.fallbackImg)) img.src = this.fallbackImg;
  }
}
/* troca para o banner SVG local caso a foto externa nao carregue. */
