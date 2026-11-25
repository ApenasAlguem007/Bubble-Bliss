export interface Bebida {
  id: string;
  nome: string;
  sabor: string;
  tamanho: 'P' | 'M' | 'G';
  preco: number;

  // Os campos acima identificam a bebida e suas informações comerciais principais.

  estoque: number;
  imagem: string;
  disponivel: boolean;
}
