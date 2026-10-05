const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Qual é a capital da Austrália?",
        alternativas: [
            { texto: "Sydney", correta: false },
            { texto: "Camberra", correta: true },
            { texto: "Melbourne", correta: false },
            { texto: "Brisbane", correta: false }
        ]
    },
    {
        enunciado: "Qual é o planeta mais quente do Sistema Solar?",
        alternativas: [
            { texto: "Mercúrio", correta: false },
            { texto: "Marte", correta: false },
            { texto: "Vênus", correta: true },
            { texto: "Júpiter", correta: false }
        ]
    },
    {
        enunciado: "Qual organela celular é conhecida como a 'central de energia' da célula, responsável pela respiração celular e produção de ATP?",
        alternativas: [
            { texto: "Mitocôndria", correta: true },
            { texto: "Ribossomo", correta: false },
            { texto: "Complexo de Golgi", correta: false },
            { texto: "Lisossomo", correta: false }
        ]
    },
    {
        enunciado: "Quem pintou a famosa obra pós-impressionista 'A Noite Estrelada' em 1889?",
        alternativas: [
            { texto: "Claude Monet", correta: false },
            { texto: "Vincent van Gogh", correta: true },
            { texto: "Pablo Picasso", correta: false },
            { texto: "Salvador Dalí", correta: false }
        ]
    },
    {
        enunciado: "A Guerra do Peloponeso foi um conflito bélico travado na Grécia Antiga entre quais duas principais cidades-estado rivais?",
        alternativas: [
            { texto: "Atenas e Esparta", correta: true },
            { texto: "Esparta e Troia", correta: false },
            { texto: "Roma e Cartago", correta: false },
            { texto: "Tebas e Corinto", correta: false }
        ]
    }
];

let atual = 0; 
let perguntaAtual;
let acertos = 0;

function mostraPergunta() {
    if(atual >= perguntas.length){
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas){
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada){
    if(opcaoSelecionada.correta) {
        acertos++;
    }
    atual++;
    mostraPergunta();
}

function mostraResultado(){
    caixaPerguntas.textContent = "Fim do Quiz!";
    textoResultado.textContent = `Você acertou ${acertos} de ${perguntas.length} perguntas.`;
    caixaAlternativas.textContent = ""; 
    
    // Cria um botão para reiniciar o quiz
    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Jogar Novamente";
    botaoReiniciar.style.marginTop = "20px";
    botaoReiniciar.addEventListener("click", () => {
        atual = 0;
        acertos = 0;
        textoResultado.textContent = "";
        mostraPergunta();
    });
    caixaAlternativas.appendChild(botaoReiniciar);
}

mostraPergunta();

