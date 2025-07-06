import * as fs from "fs";
import * as path from "path";
import { Livro } from "../models/Livro";

export class LivroRepository {
    private readonly filePath = path.resolve(__dirname, "../database/livros.json");

    getAll(): Livro[] {
        const data = fs.readFileSync(this.filePath, "utf-8");
        const Livros: Livro[] = JSON.parse(data); // array de usuários
        return Livros;
    }

    add(livro: Livro): void {
        const Livros = this.getAll(); // array
        Livros.push(livro);            // uso de array.push
        this.saveAll(Livros);
    }

    private saveAll(Livros: Livro[]): void {
        const data = JSON.stringify(Livros, null, 2);
        fs.writeFileSync(this.filePath, data);
    }

    removeById(id: number): void {
        const Livros = this.getAll();
        const filtered = Livros.filter(l => l.id !== id); // uso de array.filter
        this.saveAll(filtered);
    }   
}