export interface Bebida {
  id: number;
  nome: string;
  saborBase: string;
  tamanho: string;
/* cria a interface Bebida com id, nome, sabor base e tamanho. */
  preco: number;
  imagemUrl: string;
}
export interface Topping {
  id: number;
/* adiciona preco e imagemUrl em Bebida e inicia a interface Topping. */
  nome: string;
  categoria: string;
  precoExtra: number;
}
/* completa Topping com categoria e preco extra para o segundo CRUD. */
