import { Injectable } from '@angular/core';
import { Bebida, Topping } from '../models/bubble-tea.model';

@Injectable({
  providedIn: 'root'
/*  importa Injectable e modelos e torna o servico disponivel globalmente. */
})
export class BubbleTeaService {
  private readonly bebidasKey = 'pastel_boba_bebidas_v3';
  private readonly toppingsKey = 'pastel_boba_toppings_v3';
  readonly imagensExternas: Record<string, string> = {
/*  define chaves v3 do localStorage e links externos por sabor base. */
    'Chá Preto': 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=800&q=80',
    'Matcha': 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80',
    'Taro': 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80',
    'Morango': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
/* mapeia fotos externas do Unsplash para Cha Preto, Matcha, Taro e Morango. */
    'Chá Verde': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
  };
  readonly imagensLocais: Record<string, string> = {
    'Chá Preto': 'assets/images/cha-preto.svg',
/* adiciona Cha Verde externo e inicia o mapa de imagens locais de reserva. */
    'Matcha': 'assets/images/matcha.svg',
    'Taro': 'assets/images/taro.svg',
    'Morango': 'assets/images/morango.svg',
    'Chá Verde': 'assets/images/cha-verde.svg'
/* associa cada sabor a uma ilustracao SVG local caso a rede bloqueie links. */
  };
  private readonly bebidasIniciais: Bebida[] = [
    { id: 1, nome: 'Brown Sugar Boba Milk', saborBase: 'Chá Preto', tamanho: '500ml', preco: 19.90, imagemUrl: this.imagensExternas['Chá Preto'] },
    { id: 2, nome: 'Strawberry Matcha Latte', saborBase: 'Matcha', tamanho: '500ml', preco: 22.50, imagemUrl: this.imagensExternas['Matcha'] },
/* define as duas primeiras bebidas padrao ja com URLs externas de imagem. */
    { id: 3, nome: 'Taro Cream Cloud', saborBase: 'Taro', tamanho: '700ml', preco: 24.00, imagemUrl: this.imagensExternas['Taro'] }
  ];
  private readonly toppingsIniciais: Topping[] = [
    { id: 1, nome: 'Pérola de Tapioca Preta', categoria: 'Clássico', precoExtra: 4.00 },
/* adiciona a terceira bebida inicial e inicia a lista padrao de toppings. */
    { id: 2, nome: 'Popping Boba de Morango', categoria: 'Frutado', precoExtra: 5.00 },
    { id: 3, nome: 'Cheese Foam Cremoso', categoria: 'Cobertura', precoExtra: 5.50 }
  ];
  constructor() {
/* completa os toppings iniciais e abre o construtor do servico. */
    this.inicializarBanco();
  }
  private inicializarBanco(): void {
    if (!localStorage.getItem(this.bebidasKey)) {
      localStorage.setItem(this.bebidasKey, JSON.stringify(this.bebidasIniciais));
/* inicializa o localStorage gravando as bebidas padrao no primeiro acesso. */
    }
    if (!localStorage.getItem(this.toppingsKey)) {
      localStorage.setItem(this.toppingsKey, JSON.stringify(this.toppingsIniciais));
    }
  }
/* grava tambem os toppings iniciais no navegador se ainda nao existirem. */
  obterFallbackLocal(saborBase: string): string {
    return this.imagensLocais[saborBase] || 'assets/images/cha-preto.svg';
  }
  listarBebidas(): Bebida[] {
    return JSON.parse(localStorage.getItem(this.bebidasKey) || '[]');
/* retorna o SVG local correspondente ao sabor e lista as bebidas salvas. */
  }
  salvarBebida(bebida: Bebida): void {
    const lista = this.listarBebidas();
    bebida.imagemUrl = bebida.imagemUrl?.trim() || this.imagensExternas[bebida.saborBase] || this.obterFallbackLocal(bebida.saborBase);
    if (bebida.id) {
/* usa a URL externa informada ou a padrao do sabor antes de salvar/editar. */
      const idx = lista.findIndex((b) => b.id === bebida.id);
      if (idx !== -1) lista[idx] = bebida;
    } else {
      bebida.id = Date.now();
      lista.push(bebida);
/* atualiza bebida existente ou gera um id novo e adiciona na lista. */
    }
    localStorage.setItem(this.bebidasKey, JSON.stringify(lista));
  }
  excluirBebida(id: number): void {
    const atualizada = this.listarBebidas().filter((b) => b.id !== id);
/* persiste as bebidas no localStorage e filtra para excluir o id escolhido. */
    localStorage.setItem(this.bebidasKey, JSON.stringify(atualizada));
  }
  listarToppings(): Topping[] {
    return JSON.parse(localStorage.getItem(this.toppingsKey) || '[]');
  }
/* atualiza o armazenamento apos excluir bebida e inicia listarToppings. */
  salvarTopping(topping: Topping): void {
    const lista = this.listarToppings();
    if (topping.id) {
      const idx = lista.findIndex((t) => t.id === topping.id);
      if (idx !== -1) lista[idx] = topping;
/* le os toppings salvos e atualiza o item caso ele ja possua id. */
    } else {
      topping.id = Date.now();
      lista.push(topping);
    }
    localStorage.setItem(this.toppingsKey, JSON.stringify(lista));
  }
/* cria um novo id para topping novo e salva a lista no navegador. */
  excluirTopping(id: number): void {
    const atualizada = this.listarToppings().filter((t) => t.id !== id);
    localStorage.setItem(this.toppingsKey, JSON.stringify(atualizada));
  }
}
/* remove o topping pelo id, salva no localStorage e fecha o servico. */
