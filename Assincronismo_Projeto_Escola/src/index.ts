import { readFile } from "fs/promises";
import path from "path";

const caminhoAlunos = path.join(__dirname, "./dados/alunos.json");
const caminhoProfessores = path.join(__dirname, "./dados/professores.json");
const caminhoDisciplinas = path.join(__dirname, "./dados/disciplinas.json");

async function lerAlunos(caminho: string) {
    try {
        const conteudo = await readFile(caminho, "utf-8");
        const dados = JSON.parse(conteudo);

        console.log("\n===== LISTA DE ALUNOS =====");
        dados.alunos.forEach((aluno: any, index: number) => {
            console.log(`(${index + 1}) Nome: ${aluno.nome}`);
            console.log(`     Curso: ${aluno.curso}\n`);
        });
        console.log("===== ===== ===== ===== =====");
    } catch (erro) {
        console.error("Erro ao ler o arquivo de alunos:", erro);
    }
}

async function lerProfessores(caminho: string) {
    try {
        const conteudo = await readFile(caminho, "utf-8");
        const dados = JSON.parse(conteudo);

        console.log("\n\n===== LISTA DE PROFESSORES =====");
        dados.professores.forEach((professor: any, index: number) => {
            console.log(`(${index + 1}) ID: ${professor.id}`);
            console.log(`     Nome: ${professor.nome}\n`);
        });
        console.log("===== ===== ===== ===== =====");
    } catch (erro) {
        console.error("Erro ao ler o arquivo de professores:", erro);
    }
}

async function lerDisciplinas(caminho: string) {
    try {
        const conteudo = await readFile(caminho, "utf-8");
        const dados = JSON.parse(conteudo);

        console.log("\n\n===== LISTA DE DISCIPLINAS =====");
        dados.disciplinas.forEach((disciplina: any, index: number) => {
            console.log(`(${index + 1}) Código: ${disciplina.codigo}`);
            console.log(`     Nome: ${disciplina.nome}\n`);
        });
        console.log("===== ===== ===== ===== =====");
    } catch (erro) {
        console.error("Erro ao ler o arquivo de disciplinas:", erro);
    }
}

async function executarTudo() {
    await Promise.all([
        lerAlunos(caminhoAlunos),
        lerProfessores(caminhoProfessores),
        lerDisciplinas(caminhoDisciplinas)
    ]);
}

executarTudo();
