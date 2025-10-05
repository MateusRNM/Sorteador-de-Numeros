const qtdInput = document.getElementById('quantidade');
const minInput = document.getElementById('de');
const maxInput = document.getElementById('ate');
const restartButton = document.getElementById('btn-reiniciar');
const resultadosElement = document.getElementById('resultados');
let numerosSorteados = [];

function updateResultadoLabel(){
    resultadosElement.innerHTML = `Números sorteados: ${numerosSorteados.length === 0 ? 'nenhum até agora' : numerosSorteados.toString().replace('[', '').replace(']', '').replaceAll(',', ', ')}`;
}

function obterNumeroAleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function trocarStatusBotao(disabled){
    if(!disabled){
        restartButton.classList.remove('container__botao-desabilitado');
        restartButton.classList.add('container__botao');
    } else {
        restartButton.classList.add('container__botao-desabilitado');
        restartButton.classList.remove('container__botao');
    }
}

function sortear(){
    numerosSorteados = [];
    let min = Number(minInput.value);
    let max = Number(maxInput.value);
    let qtd = Number(qtdInput.value);
    if(min < 0 || max <= 0 || qtd <= 0){
        alert('Preencha todos os campos!');
        return;
    } else if(min >= max) {
        alert('O número mínimo deve ser menor que o máximo!');
        return;
    } else if(max-min+1 < qtd){
        alert(`O intervalo de números não permite que ${qtd} números sejam sorteados!`);
        return;
    }
    while(qtd--){
        let numeroSorteado = obterNumeroAleatorio(min, max);
        while(numerosSorteados.includes(numeroSorteado)){
            numeroSorteado = obterNumeroAleatorio(min, max);
        }
        numerosSorteados.push(numeroSorteado);
    }
    updateResultadoLabel();
    trocarStatusBotao(false);
}

function reiniciar(){
    numerosSorteados = [];
    qtdInput.value = "";
    minInput.value = "";
    maxInput.value = "";
    updateResultadoLabel();
    trocarStatusBotao(true);
}
