let seuVotoPara = document.querySelector('.d-1--para');
let cargo = document.querySelector('.d-1--cargo');
let aviso = document.querySelector('.d-2');
let descricao = document.querySelector('.d-1--info');
let numeros = document.querySelector('.d-1--digitos');
let lateral = document.querySelector('.d-1--right');

let etapaAtual = 0;
let numero = '';

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';

    for(let i=0; i<etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML += '<div class="numero pisca"></div>';
        } else {
        numeroHTML += '<div class="numero"></div>';
        }
    }

    seuVotoPara.innerHTML = '';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

comecarEtapa();

function atualizaInterface() {
    alert('Finalizou de digitar o voto!')
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
        elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

