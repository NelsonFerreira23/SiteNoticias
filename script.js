// script.js
import { ServicoAPI } from "./servico.js";

let paginaAtual = 1;
let postsPorPagina = 5;
let totalPosts;
const novaNoticia = document.getElementById("noticias");
const paginationContainer = document.getElementById("pagination");

function init() {
  carregaPosts();
  carregaDestaques();
  carregaArtigosOpiniao();
}

function carregaPosts() {
  ServicoAPI.carregarPosts(paginaAtual, postsPorPagina)
    .then((posts) => {
      console.log("Posts carregados:", posts);
      totalPosts = posts.length;
      renderPosts(posts);
      renderPagination();
    })
    .catch((error) => {
      console.error("Erro ao carregar posts:", error);
    });
}

function carregaDestaques() {
  ServicoAPI.carregarDestaques()
    .then((destaques) => {
      console.log("Destaques carregados:", destaques);
      renderDestaques(destaques);
    })
    .catch((error) => {
      console.error("Erro ao carregar destaques:", error);
    });
}

function carregaArtigosOpiniao() {
  ServicoAPI.carregarArtigosOpiniao()
    .then((artigos) => {
      console.log("Artigos de opinião carregados:", artigos);
      renderArtigosOpiniao(artigos);
    })
    .catch((error) => {
      console.error("Erro ao carregar artigos de opinião:", error);
    });
}

function renderDestaques(destaques) {
  const destaquesContainer = document.getElementById("destaques");
  destaquesContainer.innerHTML = "";
  destaques.forEach((destaque) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <a href="noticias.html?postId=${destaque.id} ">
        <hr class="w-full h-1 mx-auto my-4 border-0 rounded hrNoticia"/>
        <div class="box">
          <img src="${destaque.imagem}" alt="Imagem" class="w-full h-auto mx-auto my-4 sm:w-48 sm:h-48" />
          <h1 class="text-2xl font-bold">${destaque.title}</h1>
          <p class="text-sm">
            ${destaque.body}
          </p>
        </div>
      </a>
    `;
    destaquesContainer.appendChild(div);
  });
}

function renderArtigosOpiniao(artigos) {
  const artigosContainer = document.getElementById("artigo");
  artigosContainer.innerHTML = "";
  artigos.forEach((artigo) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <a href="noticias.html?postId=${artigo.id}">
        <hr class="w-48 h-1 mx-auto my-4 border-0 rounded hrNoticia" />
        <div class="box">
        <h1 class="text-2xl font-bold">${artigo.title}</h1>
        <p class="text-sm">
          ${artigo.body}
        </p>
        </div>
      </a>
    `;
    artigosContainer.appendChild(div);
  });
}

function renderPosts(posts) {
  novaNoticia.innerHTML = "";
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <a href="noticias.html?postId=${post.id}">
        <hr class="w-48 h-1 mx-auto my-4 border-0 rounded hrNoticia" />
        <div class="box">
          <h1 class="text-2xl font-bold">${post.title}</h1>
        </div>
      </a>
    `;
    novaNoticia.appendChild(div);
  });
}

function renderPagination() {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(40 / postsPorPagina);
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.classList.add("pagination-button");
    button.addEventListener("click", (event) => {
      const pageNumber = parseInt(event.target.innerText);
      paginaAtual = pageNumber;
      carregaPosts();
    });
    paginationContainer.appendChild(button);
  }
}

init();
