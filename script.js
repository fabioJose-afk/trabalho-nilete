const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

// Lista expandida para 10 perguntas intrigantes
const perguntas = [
    {
        enunciado: "Se você pudesse viajar no tempo até a época dos dinossauros Tyrannosaurus Rex, qual destes animais modernos você teria mais chances de encontrar vivo exatamente igual?",
        alternativas: [
            { texto: "O tubarão moderno", correta: false },
            { texto: "A simpática galinha", correta: false },
            { texto: "O crocodilo", correta: true },
            { texto: "O ornitorrinco", correta: false }
        ]
    },
    {
        enunciado: "O que acontece fisicamente se você conseguir disparar uma arma de fogo no vácuo absoluto do espaço sideral?",
        alternativas: [
            { texto: "A bala nem sai do cano por falta de oxigênio", correta: false },
            { texto: "A bala viaja para sempre até colidir com algo", correta: true },
            { texto: "A arma explode na mão de quem disparou", correta: false },
            { texto: "O som do disparo destrói o capacete do astronauta", correta: false }
        ]
    },
    {
        enunciado: "Qual destes fenômenos assustadores da física é capaz de fazer o próprio tempo passar mais devagar?",
        alternativas: [
            { texto: "A força de gravidade de um buraco negro", correta: true },
            { texto: "A temperatura de zero absoluto", correta: false },
            { texto: "A velocidade do som na água", correta: false },
            { texto: "A expansão de uma supernova", correta: false }
        ]
    },
    {
        enunciado: "Se cavássemos um túnel direto de um lado ao outro da Terra passando pelo centro do planeta, e você pulasse dentro, o que aconteceria?",
        alternativas: [
            { texto: "Você cairia eternamente no espaço do outro lado", correta: false },
            { texto: "Você ficaria preso flutuando exatamente no centro", correta: true },
            { texto: "Você derreteria instantaneamente na crosta", correta: false },
            { texto: "Sua velocidade aumentaria até quebrar a barreira do som", correta: false }
        ]
    },
    {
        enunciado: "Qual é o material criado pela humanidade mais escuro do mundo, capaz de absorver impressionantes 99,96% de toda a luz?",
        alternativas: [
            { texto: "Obsidiana polida", correta: false },
            { texto: "Vantablack", correta: true },
            { texto: "Grafeno purificado", correta: false },
            { texto: "Carvão ativado", correta: false }
        ]
    },
    {
        enunciado: "Se você pudesse juntar toda a população da Terra e colocá-la lado a lado sem espaços vazios, toda a humanidade caberia confortavelmente dentro de qual dessas áreas?",
        alternativas: [
            { texto: "Na cidade de Los Angeles (EUA)", correta: true },
            { texto: "No continente da Austrália inteiro", correta: false },
            { texto: "No deserto do Saara", correta: false },
            { texto: "Na extensão territorial do Brasil", correta: false }
        ]
    },
    {
        enunciado: "A grande maioria dos computadores modernos do mundo funciona usando o sistema binário (0 e 1). O que os cientistas usam como unidade básica nos computadores quânticos para processar dados?",
        alternativas: [
            { texto: "Nanabytes", correta: false },
            { texto: "Qubits (Bits quânticos)", correta: true },
            { texto: "Fótons estáticos", correta: false },
            { texto: "Microchips de silício linear", correta: false }
        ]
    },
    {
        enunciado: "No corpo humano adulto, qual é o único órgão capaz de se regenerar completamente, conseguindo reconstruir seu tamanho original mesmo se restar apenas 25% dele?",
        alternativas: [
            { texto: "O estômago", correta: false },
            { texto: "O pulmão esquerdo", correta: false },
            { texto: "O fígado", correta: true },
            { texto: "O rim direito", correta: false }
        ]
    },
    {
        enunciado: "O famoso monumento britânico de Stonehenge é cercado de mistérios. Aproximadamente quantos anos antes de Cristo estima-se que ele começou a ser construído?",
        alternativas: [
            { texto: "Cerca de 100 anos a.C.", correta: false },
            { texto: "Cerca de 500 anos a.C.", correta: false },
            { texto: "Cerca de 1.500 anos a.C.", correta: false },
            { texto: "Cerca de 3.000 anos a.C.", correta: true }
        ]
    },
    {
        enunciado: "Qual destas criaturas marinhas possui três corações, sangue azul e consegue espremer todo o seu corpo para passar por buracos do tamanho de uma moeda?",
        alternativas: [
            { texto: "O polvo", correta: true },
            { texto: "A lula-gigante", correta: false },
            { texto: "A água-viva de caixa", correta: false },
            { texto: "A arraia-manta", correta: false }
        ]
    }
];

let atual = 0; 
let perguntaAtual;
let acertos = 0;
let bloqueado = false; 

function mostraPergunta() {
    if(atual >= perguntas.length){
        mostraResultado();
        return;
    }
    bloqueado = false;
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = `${atual + 1}. ${perguntaAtual.enunciado}`;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas){
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.classList.add("botao-resposta");
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa, botaoAlternativas));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada, botaoClicado) {
    if (bloqueado) return; 
    bloqueado = true;

    if (opcaoSelecionada.correta === true) {
        acertos++;
        botaoClicado.classList.add("correta"); 
    } else {
        botaoClicado.classList.add("errada"); 
        
        Array.from(caixaAlternativas.children).forEach(botao => {
            const textoBotao = botao.textContent;
            const alternativaOriginal = perguntaAtual.alternativas.find(a => a.texto === textoBotao);
            if (alternativaOriginal && alternativaOriginal.correta) {
                botao.classList.add("correta");
            }
        });
    }
    
    setTimeout(() => {
        atual++;
        mostraPergunta();
    }, 1500);
}

function mostraResultado(){ // Corrigido aqui!
    caixaPerguntas.textContent = "Quiz Concluído! 🧠";
    
    let mensagemCustomizada = "";
    if(acertos === perguntas.length) {
        mensagemCustomizada = "Incrível! Você acertou tudo e provou ser um gênio absoluto!";
    } else if(acertos >= 7) {
        mensagemCustomizada = "Excelente! Seus conhecimentos gerais são impressionantes.";
    } else if(acertos >= 5) {
        mensagemCustomizada = "Bom trabalho! Você ficou na média, que tal tentar gabaritar?";
    } else {
        mensagemCustomizada = "Valeu a tentativa! O mundo é cheio de curiosidades, tente de novo para aprender mais.";
    }

    textoResultado.innerHTML = `Você acertou <strong>${acertos}</strong> de ${perguntas.length} perguntas.<br><small>${mensagemCustomizada}</small>`;
    caixaAlternativas.textContent = ""; 
    
    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Jogar Novamente 🔄";
    botaoReiniciar.classList.add("botao-reiniciar");
    botaoReiniciar.addEventListener("click", () => {
        atual = 0;
        acertos = 0;
        textoResultado.textContent = "";
        mostraPergunta();
    });
    caixaAlternativas.appendChild(botaoReiniciar);
}

mostraPergunta();

