import { Livro } from "./models/Livro";
import { LivroRepository } from "./repositories/LivroRepository";

const repo = new LivroRepository();

console.log("\n===== LISTA DE LIVROS ATUAIS =====");
const livros = repo.getAll();
livros.forEach((livro, index) => {
    console.log(`(${livro.id + 1}) ${livro.nome} | ISBN: ${livro.isbn} | Preço: R$ ${livro.preco.toFixed(2)}`);
});
console.log("\n===== ===== ===== ===== ===== =====");

console.log("\n===== Adicionando livros =====");
const novo = new Livro(1, "Harry Potter", 25.90, "43gi5143054gh9g");
repo.add(novo);
console.log(`Livro '${novo.nome}' adicionado com sucesso.`);

const novo2 = new Livro(2, "Senhor dos Aneis 3", 30.90, "127b2h867592b45");
repo.add(novo2);
console.log(`Livro '${novo2.nome}' adicionado com sucesso.`);

const novo3 = new Livro(3, "Diario de um banana", 70.90, "1298cn0zs2uw8de65qwe");
repo.add(novo3);
console.log(`Livro '${novo3.nome}' adicionado com sucesso.`);

const novo4 = new Livro(4, "Dom Quixote", 45.50, "1c74228931x723xy31");
repo.add(novo4);
console.log(`Livro '${novo4.nome}' adicionado com sucesso.`);

const novo5 = new Livro(5, "O Pequeno Príncipe", 29.90, "17834czomx287t7qw932");
repo.add(novo5);
console.log(`Livro '${novo5.nome}' adicionado com sucesso.`);
console.log("\n===== ===== ===== ===== ===== =====");

console.log("\n===== Removendo livros =====");
repo.removeById(3);
console.log("\nLivro com ID 3 removido com sucesso.");
console.log("\n===== ===== ===== ===== ===== =====");

console.log("\n===== LISTA DE LIVROS ATUALIZADA =====");
repo.getAll().forEach((livro, index) => {
    console.log(`(${livro.id}) ${livro.nome} | ISBN: ${livro.isbn} | Preço: R$ ${livro.preco.toFixed(2)}`);
});
