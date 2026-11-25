import { Injectable } from '@angular/core';
import { Ingrediente } from '../models/ingrediente';

@Injectable({ providedIn: 'root' })
export class IngredienteService {
  private readonly chave = 'bubble-bliss-ingredientes';

  // A chave acima separa os ingredientes dos demais dados da aplicação.

  listar(): Ingrediente[] {
    const dados = localStorage.getItem(this.chave);
    if (dados) return JSON.parse(dados) as Ingrediente[];
    const iniciais = this.criarDadosIniciais();
    this.salvar(iniciais);
    return iniciais;
  }

  // No primeiro acesso, alguns ingredientes são criados para preencher a tela.

  buscarPorId(id: string): Ingrediente | undefined {
    return this.listar().find((item) => item.id === id);
  }

  adicionar(ingrediente: Ingrediente): void {
    const ingredientes = this.listar();
    ingredientes.push(ingrediente);
    this.salvar(ingredientes);
  }

  // O método anterior adiciona o ingrediente ao estoque local.

  atualizar(atualizado: Ingrediente): void {
    const ingredientes = this.listar().map((item) =>
      item.id === atualizado.id ? atualizado : item
    );
    this.salvar(ingredientes);
  }

  // A alteração preserva os outros itens e substitui somente o selecionado.

  excluir(id: string): void {
    const ingredientes = this.listar().filter((item) => item.id !== id);
    this.salvar(ingredientes);
  }

  private salvar(ingredientes: Ingrediente[]): void {
    localStorage.setItem(this.chave, JSON.stringify(ingredientes));
  }

  // A exclusão e a gravação completam as quatro operações do segundo CRUD.

  private criarDadosIniciais(): Ingrediente[] {
    return [
      { id: crypto.randomUUID(), nome: 'Pérolas de tapioca', categoria: 'Pérolas', quantidade: 5, unidade: 'kg' },
      { id: crypto.randomUUID(), nome: 'Leite integral', categoria: 'Leite', quantidade: 12, unidade: 'litros' },
      { id: crypto.randomUUID(), nome: 'Chá verde', categoria: 'Chá', quantidade: 20, unidade: 'pacotes' }
    ];
  }
}
