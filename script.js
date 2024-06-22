// URL da API
let url = 'https://significado.herokuapp.com/v2/';
{
    "id"; 5,
    "titulo"; "Arrays em JavaScript",
    "descricao"; "Um array em JavaScript é um objeto global usado na construção de 'arrays', que são tipos de dados de alto nível, semelhantes a listas."
}

// Selecionando os elementos do DOM
let inputTxt = document.querySelector('#container__inputtxt');
let btnTxt = document.querySelector('#container__btn');
let resultado = document.querySelector('#container__result');

// Função para renderizar os resultados na página
function renderizarResultados(termo, significados) {
    if (significados.length === 0) {
        resultado.innerHTML = `<p id="container__significado">Não foi possível encontrar definições para "${termo}".</p>`;
    } else {
        let html = `<h3 id="container__palavra">${termo}</h3>`;
        significados.forEach((significado, index) => {
            html += `<p id="container__significado"><span>${index + 1}º</span> ${significado}</p>`;
        });
        resultado.innerHTML = html;
    }
}

// Evento de clique no botão de busca
btnTxt.addEventListener('click', () => {
    let palavra = inputTxt.value.trim();
    if (palavra === '') {
        resultado.innerHTML = `<p id="container__significado">Por favor, digite uma palavra no campo de busca.</p>`;
    } else {
        fetch(`${url}${palavra}`)
        .then((resposta) => {
            if (!resposta.ok) {
                throw new Error(`Erro ao buscar a definição de "${palavra}". Código de status: ${resposta.status}`);
            }
            return resposta.json();
        })
        .then((data) => {
            console.log('Dados retornados pela API:', data);
            if (data && data.length > 0 && data[0].meanings) {
                renderizarResultados(palavra, data[0].meanings);
            } else {
                throw new Error(`Dados inválidos retornados pela API para "${palavra}".`);
            }
        })
        .catch((error) => {
            console.error('Erro durante a busca:', error);
            resultado.innerHTML = `<p id="container__significado">Ocorreu um erro ao buscar a definição de "${palavra}". Por favor, tente novamente mais tarde.</p>`;
        });
    }
});

// Selecionando todos os termos do glossário
const termos = document.querySelectorAll('.termo');

// Adicionando evento de clique a cada termo
termos.forEach((termo) => {
    termo.addEventListener('click', () => {
        // Alternando a classe 'expandido' para mostrar/ocultar a definição
        termo.classList.toggle('expandido');
    });
});


