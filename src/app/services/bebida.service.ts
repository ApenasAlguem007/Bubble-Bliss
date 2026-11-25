import { Injectable } from '@angular/core';
import { Bebida } from '../models/bebida';

@Injectable({ providedIn: 'root' })
export class BebidaService {
  private readonly chave = 'bubble-bliss-bebidas';

  // A chave acima identifica onde as bebidas ficam salvas no navegador.

  listar(): Bebida[] {
    const dados = localStorage.getItem(this.chave);
    if (dados) return JSON.parse(dados) as Bebida[];
    const iniciais = this.criarDadosIniciais();
    this.salvar(iniciais);
    return iniciais;
  }

  // A listagem recupera os dados ou cria três exemplos no primeiro acesso.

  buscarPorId(id: string): Bebida | undefined {
    return this.listar().find((bebida) => bebida.id === id);
  }

  adicionar(bebida: Bebida): void {
    const bebidas = this.listar();
    bebidas.push(bebida);
    this.salvar(bebidas);
  }

  // A inclusão acrescenta a nova bebida e grava novamente a lista completa.

  atualizar(atualizada: Bebida): void {
    const bebidas = this.listar().map((bebida) =>
      bebida.id === atualizada.id ? atualizada : bebida
    );
    this.salvar(bebidas);
  }

  // A atualização troca apenas o registro com o mesmo identificador.

  excluir(id: string): void {
    const bebidas = this.listar().filter((bebida) => bebida.id !== id);
    this.salvar(bebidas);
  }

  private salvar(bebidas: Bebida[]): void {
    localStorage.setItem(this.chave, JSON.stringify(bebidas));
  }

  // Os métodos anteriores removem registros e persistem o resultado no navegador.

  private criarDadosIniciais(): Bebida[] {
    return [
      { id: crypto.randomUUID(), nome: 'Morango Dream', sabor: 'Morango com leite', tamanho: 'M', preco: 16.9, estoque: 12, imagem: 'https://images.unsplash.com/photo-1558857563-c0c6ee9d5a77?auto=format&fit=crop&w=800&q=80', disponivel: true },
      { id: crypto.randomUUID(), nome: 'Matcha Cloud', sabor: 'Matcha cremoso', tamanho: 'G', preco: 19.9, estoque: 8, imagem: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80', disponivel: true },
      { id: crypto.randomUUID(), nome: 'Mango Pop', sabor: 'Manga e maracujá', tamanho: 'P', preco: 14.5, estoque: 0, imagem: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80', disponivel: false }
    ];
  }
}
