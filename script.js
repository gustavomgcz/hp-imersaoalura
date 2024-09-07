const resultadoSection = document.querySelector(".resultado");
const inputPesquisa = document.querySelector(".input-pesquisa");
const pesquisaSection = document.querySelector(".pesquisa");

async function listaDados() {
  const resposta = await fetch("dados.json");
  const dados = await resposta.json();
  return dados;
}

function criarCard(personagem) {
  return `
        <div class="personagem-card">
            <img
                src="${personagem.imagem}"
                alt="Ilustração da personagem ${personagem.nome}"
                class="personagem-img"
            />
            <h2>${personagem.nome}</h2>
            <p><span>Nome Completo:</span> ${personagem.dados.nomeCompleto}</p>
            <p><span>Data de Nascimento:</span> ${personagem.dados.dataNascimento}</p>
            <p><span>Casa:</span> ${personagem.dados.casa}</p>
            <p><span>Varinha:</span> ${personagem.dados.varinha}</p>
            <p><span>Patrono:</span> ${personagem.dados.patrono}</p>
            <p><span>Estado Sanguíneo:</span> ${personagem.dados.estadoSanguineo}</p>
            <p><span>Sobre:</span> ${personagem.sobre}</p>
        </div>
    `;
}

async function mostraDados() {
  const dados = await listaDados();

  const erroMensagem = document.querySelector(".invalido");
  if (erroMensagem) {
    erroMensagem.remove();
  }

  if (inputPesquisa.value.length > 2) {
    const inputDigitado = inputPesquisa.value.toLowerCase();

    const personagensFiltrados = dados.filter((personagem) => {
      return (
        personagem.nome.toLowerCase().includes(inputDigitado) ||
        personagem.dados.nomeCompleto.toLowerCase().includes(inputDigitado) ||
        personagem.dados.casa.toLowerCase().includes(inputDigitado) ||
        personagem.dados.varinha.toLowerCase().includes(inputDigitado) ||
        personagem.dados.patrono.toLowerCase().includes(inputDigitado) ||
        personagem.dados.estadoSanguineo.toLowerCase().includes(inputDigitado)
      );
    });
    resultadoSection.innerHTML = "";

    if (personagensFiltrados.length === 0) {
      resultadoSection.innerHTML = `
        <div class="personagem-card-pequeno">
            <h2>Nenhum personagem encontrado.</h2>
        </div>
        `;
    } else {
      personagensFiltrados.forEach((personagem) => {
        resultadoSection.innerHTML += criarCard(personagem);
      });
    }
  } else {
    const mensagemErro = document.createElement("p");
    mensagemErro.classList.add("invalido");
    mensagemErro.textContent = "A busca deve conter pelo menos 3 caracteres.";
    pesquisaSection.insertBefore(mensagemErro, pesquisaSection.children[1]);
    resultadoSection.innerHTML = "";

    setTimeout(() => {
      mensagemErro.remove();
    }, 3000);
  }
}

async function membrosCasas(casaSelecionada) {
  const dados = await listaDados();

  const filtroDeCasas = dados.filter((personagem) => {
    return personagem.dados.casa === casaSelecionada;
  });

  resultadoSection.innerHTML = "";
  filtroDeCasas.forEach((personagem) => {
    resultadoSection.innerHTML += criarCard(personagem);
  });
}
