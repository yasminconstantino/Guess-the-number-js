let numeroSecreto;
let tentativas;
let jogoAtivo = true;

function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativas = 0;
    jogoAtivo = true;
    document.getElementById('guessInput').removeAttribute('disabled');
    document.getElementById('submitBtn').removeAttribute('disabled');
    document.getElementById('result').textContent = '';
}

function adivinharNumero() {
    if (!jogoAtivo) return;

    const palpiteInput = document.getElementById('guessInput');
    const resultadoElement = document.getElementById('result');
    const palpite = parseInt(palpiteInput.value);

    if (palpite < 1 || palpite > 100 || isNaN(palpite)) {
        resultadoElement.textContent = "Palpite inválido. Digite um número entre 1 e 100.";
        return;
    }

    const resultado = validarPalpite(palpite, numeroSecreto);
    tentativas++;

    if (resultado === -1) {
        resultadoElement.textContent = `Seu palpite está muito baixo. Tentativas: ${tentativas}`;
    } else if (resultado === 1) {
        resultadoElement.textContent = `Seu palpite está muito alto. Tentativas: ${tentativas}`;
    } else {
        resultadoElement.textContent = `Parabéns! Você acertou o número ${numeroSecreto} em ${tentativas} tentativas.`;
        jogoAtivo = false;
        palpiteInput.setAttribute('disabled', 'true');
        document.getElementById('submitBtn').setAttribute('disabled', 'true');
    }

    if (tentativas === 10 && resultado !== 0) {
        resultadoElement.textContent = `Não foi dessa vez. O número secreto era: ${numeroSecreto}`;
        jogoAtivo = false;
        palpiteInput.setAttribute('disabled', 'true');
        document.getElementById('submitBtn').setAttribute('disabled', 'true');
    }
}

function validarPalpite(palpite, numeroSecreto) {
    if (palpite < numeroSecreto) {
        return -1; // Palpite muito baixo
    } else if (palpite > numeroSecreto) {
        return 1; // Palpite muito alto
    } else {
        return 0; // Palpite correto
    }
}

function reiniciarJogo() {
    const resposta = confirm("Deseja jogar novamente?");
    if (resposta) {
        iniciarJogo();
    }
}

// Iniciar o jogo assim que a página carregar
window.onload = iniciarJogo;