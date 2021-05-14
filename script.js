let seuVotoPara = document.querySelector('.d-1--para');
let cargo = document.querySelector('.d-1--cargo');
let aviso = document.querySelector('.d-2');
let descricao = document.querySelector('.d-1--info');
let numeros = document.querySelector('.d-1--digitos');
let lateral = document.querySelector('.d-1--right');

let etapaAtual = 0;
let numero = '';
let votoBranco = '';
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    votoBranco = '';

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
    numeros.style.display = 'block';
}
comecarEtapa();

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if( item.numero === numero ) {
            return true
        } else {
            return false
        }
    })

    if(candidato.length > 0) {
        candidato = candidato[0]

        seuVotoPara.innerHTML = 'SEU VOTO PARA';
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHTML = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small === true) {
                fotosHTML += `<div class="d-1--img smaller"><img src="images/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHTML += `<div class="d-1--img"><img src="images/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.innerHTML = 'SEU VOTO PARA';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`
    }
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

function corrige() {
    comecarEtapa();
};

function branco() {
    numero = '';
    votoBranco = true;

    seuVotoPara.innerHTML = 'SEU VOTO PARA';
    numeros.style.display = 'none';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        })
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    } 
    
    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM!</div>`;
            console.log(votos);
        }
    }
}

