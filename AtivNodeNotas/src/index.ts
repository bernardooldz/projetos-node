import chalk from "chalk";
import readlineSync from "readline-sync";

console.log(chalk.blue("Bem vindo!"));

let totalGeral: number = 0;
let numAprovados: number = 0;
let numReprovados: number = 0;
let numRecuperacao: number = 0;
let maiorNota: number = 0;
let alunoTheBest: string = '';

let qntAlunos: number;

while (true) {
    qntAlunos = parseInt(readlineSync.question("Quantos alunos deseja analisar? "));
    if (!isNaN(qntAlunos) && qntAlunos > 0) {
        break;
    }
    console.log("Por favor, digite um número válido maior que 0.");
}

function obterNota(mensagem: string, max: number): number {
    let nota: number;
    while (true) {
        nota = readlineSync.questionInt(mensagem);
        if (nota >= 0 && nota <= max) {
            break;
        }
        console.log(`Nota inválida! A nota deve ser entre 0 e ${max}.`);
    }
    return nota;
}

function verificarSegundaChamada(prova: string, maxNota: number): number {
    while (true) {
        const resposta = readlineSync.question(`O aluno realizou a prova de segunda chamada da ${prova}? (s) para sim / (n) para nao: `).toLowerCase();

        if (resposta === 's') {
            console.log(`Segunda chamada para ${prova} realizada.`);
            const nota = obterNota(`Nota da segunda chamada de ${prova} (0 a ${maxNota}): `, maxNota);
            return nota;
        } else if (resposta === 'n') {
            console.log(`O aluno ficará com a nota da ${prova} zerada.`);
            return 0;
        } else {
            console.log("Comando inválido! A resposta deve ser 's' ou 'n'.");
        }
    }
}

function processarAluno(indice: number): void {
    console.log(chalk.blue(`\n--- Análise do aluno ${indice + 1} ---`));

    const nome = readlineSync.question("Nome do Aluno: ");

    let notaPI = 0;

    const fezPI = readlineSync.question("O aluno fez a PI? (s) para sim / (qualquer tecla) para nao: ").toLowerCase();
    if (fezPI === 's') {
        notaPI = obterNota('Nota na PI (0 a 6): ', 6);
    } else {
        notaPI = verificarSegundaChamada("PI", 6);
    }

    const notaProj = obterNota('Nota de Projetos (0 a 12): ', 12);

    let notaPF = 0;
    const fezPF = readlineSync.question("O aluno fez a PF? (s) para sim / (qualquer tecla) para nao: ").toLowerCase();
    if (fezPF === 's') {
        notaPF = obterNota('Nota na PF (0 a 12): ', 12);
    } else {
        notaPF = verificarSegundaChamada("PF", 12);
    }

    const ptsTotal = notaPI + notaPF + notaProj;
    totalGeral += ptsTotal;

    if (ptsTotal > maiorNota) {
        maiorNota = ptsTotal;
        alunoTheBest = nome;
    }

    let situacaoAluno: string;

    if (ptsTotal >= 18) {
        situacaoAluno = chalk.green(`O aluno ${nome} está aprovado.`);
        numAprovados++;
    } else {
        console.log(chalk.redBright(`O aluno ${nome} não atingiu a meta.`));
        const fazerRecuperacao = readlineSync.question("Gostaria de fazer a recuperacao? (s) para sim / (qualquer tecla) para nao: ");
        if (fazerRecuperacao === 's') {
            situacaoAluno = chalk.cyan(`A situacao do aluno ${nome} ainda está indefinida. \nA prova de recuperação foi agendada. Aguarde a definição da data.`);
            numRecuperacao++;
        } else {
            situacaoAluno = chalk.red("Prova de recuperacao negada. \nO aluno reprovou.");
            numReprovados++;
        }
    }

    console.log(chalk.yellow(`\n------- Estatísticas do aluno ${nome} -------`));
    console.log(chalk.yellow(`Total de pontos: ${ptsTotal}`));
    console.log(situacaoAluno);
    console.log(chalk.yellow(`---------------------------------------------\n`));
}

for (let i = 0; i < qntAlunos; i++) {
    processarAluno(i);
}

const mediaGeral: number = totalGeral / qntAlunos;
const percAprovados: number = (numAprovados / qntAlunos) * 100;
const percReprovados: number = (numReprovados / qntAlunos) * 100;

console.log(chalk.blue(`\n======= Estatísticas gerais da análise =======`));
console.log(chalk.yellow(`Média geral de pontos: ${mediaGeral.toFixed(2)}`));
console.log(chalk.green(`Porcentagem de alunos aprovados: ${percAprovados.toFixed(2)}%`));
console.log(chalk.red(`Porcentagem de alunos reprovados: ${percReprovados.toFixed(2)}%`));
console.log(chalk.yellow(`Alunos que ainda aguardam a recuperação: ${numRecuperacao}`));
console.log(chalk.green(`Maior nota da análise (The Best): ${maiorNota} - ${alunoTheBest}`));
console.log(chalk.blue(`===============================================\n`));
