const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');
const app = express();
// Aqui eu importo as ferramentas: express cria o servidor, cors libera o Angular, better-sqlite3 acessa o banco e path monta caminhos de arquivo.
app.use(cors());
app.use(express.json());
const db = new Database(path.join(__dirname, 'boba.db'));
db.pragma('foreign_keys = ON');
const PORT = 3000;
// Ligo o CORS, ensino o servidor a ler JSON, abro o arquivo do banco, ativo as chaves estrangeiras e escolho a porta 3000.
db.exec(`
  CREATE TABLE IF NOT EXISTS bebidas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    sabor TEXT NOT NULL,
    -- Começo a tabela de bebidas: cada bebida tem um id automático, um nome e um sabor que não podem ficar vazios.
    preco REAL NOT NULL,
    descricao TEXT
  );
  CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    -- Termino a tabela de bebidas com preço e descrição e começo a tabela de pedidos, que também tem id automático.
    cliente TEXT NOT NULL,
    bebidaId INTEGER NOT NULL,
    tamanho TEXT NOT NULL,
    acucar INTEGER NOT NULL,
    topping TEXT,
    -- Colunas do pedido: nome do cliente, qual bebida foi pedida, tamanho, nível de açúcar e topping (este pode ficar vazio).
    quantidade INTEGER NOT NULL,
    FOREIGN KEY (bebidaId) REFERENCES bebidas(id) ON DELETE CASCADE
  );
`);
const total = db.prepare('SELECT COUNT(*) AS n FROM bebidas').get().n;
// Fecho a tabela de pedidos ligando bebidaId à tabela de bebidas (se a bebida sumir, o pedido some junto) e conto quantas bebidas já existem.
if (total === 0) {
  const ins = db.prepare('INSERT INTO bebidas (nome, sabor, preco, descricao) VALUES (?, ?, ?, ?)');
  ins.run('Taro Dreams', 'Taro', 18.9, 'Chá de taro cremoso com leite');
  ins.run('Morango Pop', 'Morango', 17.5, 'Chá de morango com pedacinhos da fruta');
  ins.run('Matcha Cloud', 'Matcha', 19.9, 'Matcha cremoso com espuma de leite');
  // Se o banco está vazio, preparo o comando INSERT e cadastro as primeiras bebidas do cardápio para a tela não começar vazia.
  ins.run('Maracujá Splash', 'Maracujá', 16.9, 'Chá gelado de maracujá refrescante');
}
app.get('/api/bebidas', (req, res) => {
  res.json(db.prepare('SELECT * FROM bebidas ORDER BY nome').all());
});
// Cadastro a última bebida de exemplo, fecho o if e crio a rota GET que devolve todas as bebidas em ordem alfabética.
app.post('/api/bebidas', (req, res) => {
  const { nome, sabor, preco, descricao } = req.body;
  if (!nome || !sabor || preco == null) return res.status(400).json({ erro: 'Dados inválidos' });
  const r = db.prepare('INSERT INTO bebidas (nome, sabor, preco, descricao) VALUES (?, ?, ?, ?)').run(nome, sabor, preco, descricao || '');
  res.status(201).json({ id: r.lastInsertRowid, nome, sabor, preco, descricao });
// Na rota POST eu pego os dados enviados, recuso se faltar algo obrigatório, gravo no banco e devolvo a bebida criada (status 201).
});
app.put('/api/bebidas/:id', (req, res) => {
  const { nome, sabor, preco, descricao } = req.body;
  db.prepare('UPDATE bebidas SET nome=?, sabor=?, preco=?, descricao=? WHERE id=?').run(nome, sabor, preco, descricao, req.params.id);
  res.json({ id: Number(req.params.id), nome, sabor, preco, descricao });
// Fecho o POST e crio a rota PUT: leio os novos dados, atualizo a linha daquele id e devolvo a bebida já alterada.
});
app.delete('/api/bebidas/:id', (req, res) => {
  db.prepare('DELETE FROM bebidas WHERE id = ?').run(req.params.id);
  res.status(204).end();
});
// Fecho o PUT e crio a rota DELETE, que apaga a bebida pelo id e responde 204 (deu certo, sem conteúdo para devolver).
app.get('/api/pedidos', (req, res) => {
  const sql = `SELECT p.*, b.nome AS bebidaNome, b.preco * p.quantidade AS total
    FROM pedidos p JOIN bebidas b ON b.id = p.bebidaId ORDER BY p.id DESC`;
  res.json(db.prepare(sql).all());
});
// A rota GET de pedidos junta pedidos e bebidas (JOIN) para trazer o nome da bebida e calcular o total de cada pedido.
app.post('/api/pedidos', (req, res) => {
  const { cliente, bebidaId, tamanho, acucar, topping, quantidade } = req.body;
  if (!cliente || !bebidaId || !tamanho || !quantidade) return res.status(400).json({ erro: 'Dados inválidos' });
  const sql = 'INSERT INTO pedidos (cliente, bebidaId, tamanho, acucar, topping, quantidade) VALUES (?, ?, ?, ?, ?, ?)';
  const r = db.prepare(sql).run(cliente, bebidaId, tamanho, acucar, topping || '', quantidade);
// Rota POST de pedidos: leio os campos, barro se faltar algum obrigatório, monto o INSERT e gravo o novo pedido no banco.
  res.status(201).json({ id: r.lastInsertRowid });
});
app.put('/api/pedidos/:id', (req, res) => {
  const { cliente, bebidaId, tamanho, acucar, topping, quantidade } = req.body;
  const sql = 'UPDATE pedidos SET cliente=?, bebidaId=?, tamanho=?, acucar=?, topping=?, quantidade=? WHERE id=?';
// Devolvo o id do pedido criado, fecho o POST e começo o PUT: pego os campos e monto o comando UPDATE.
  db.prepare(sql).run(cliente, bebidaId, tamanho, acucar, topping || '', quantidade, req.params.id);
  res.json({ id: Number(req.params.id) });
});
app.delete('/api/pedidos/:id', (req, res) => {
  db.prepare('DELETE FROM pedidos WHERE id = ?').run(req.params.id);
// Executo o UPDATE, devolvo o id, fecho o PUT e abro o DELETE já apagando o pedido do banco.
  res.status(204).end();
});
app.listen(PORT, () => {
  console.log(`API Boba Pop rodando em http://localhost:${PORT}`);
});
// Respondo 204 no DELETE, fecho a rota e ligo o servidor na porta 3000, avisando no console que a API está no ar.
