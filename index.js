import { ServicoAPI } from "./servico.js";

let paginaAtual = 1;
let postsPorPagina = 5;
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
  destaquesContainer.innerHTML += `
    <div class="title">
      <h1 class="text-2xl font-bold">Destaques</h1>
    </div>
  `;
  destaques.forEach(async (destaque) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <a href="noticias.html?postId=${destaque.id}">
        <hr class="w-48 h-1 mx-auto my-4 border-0 rounded hrNoticia" />
        <div class="box">
          <h1 class="text-2xl font-bold">${destaque.title}</h1>
          <img class="rounded-lg mx-auto" style="display:block" src="${await ServicoAPI.carregarImagem(
            destaque.title
          )}" alt="Imagem da notícia" />
        </div>
      </a>
    `;
    destaquesContainer.appendChild(div);
  });
}

function renderArtigosOpiniao(artigos) {
  const artigosContainer = document.getElementById("artigo");
  artigosContainer.innerHTML = "";
  artigosContainer.innerHTML += `
    <div class="title">
      <h1 class="text-2xl font-bold">Artigos de Opinião</h1>
    </div>
  `;
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

class DetalhesNoticia {
  constructor(postId) {
    this.postId = postId;
    this.tituloNoticia = document.getElementById("tituloNoticia");
    this.corpoNoticia = document.getElementById("corpoNoticia");
    this.autorNoticia = document.getElementById("autorNoticia");
    this.listaComentarios = document.getElementById("listaComentarios");
    this.imagemNoticia = document.getElementById("imagemNoticia");
  }

  async carregarNoticia() {
    try {
      const noticia = await ServicoAPI.carregarNoticia(this.postId);
      this.tituloNoticia.textContent = noticia.title;
      this.corpoNoticia.textContent = noticia.body;

      const user = await ServicoAPI.carregarUsuario(noticia.userId);
      this.autorNoticia.textContent = `Autor: ${user.name}`;

      const imgUrl = await ServicoAPI.carregarImagem(noticia.title);
      if (imgUrl) {
        this.imagemNoticia.src = imgUrl;
      } else {
        console.log("Imagem não encontrada para este título.");
      }

      this.carregarComentarios();
    } catch (error) {
      console.error("Erro ao carregar detalhes da notícia:", error);
    }
  }

  carregarComentarios() {
    this.listaComentarios.innerHTML = "";

    ServicoAPI.carregarComentarios(this.postId)
      .then((comments) => {
        comments.forEach((comment) => {
          ServicoAPI.carregarUsuario(comment.userId)
            .then((user) => {
              const li = document.createElement("li");
              li.innerHTML = `<strong>${comment.email}:</strong> ${comment.body}
                                <button class="btnEdit" onclick="editComment(${comment.id})">Editar</button>
                                <button class="btnDelete" onclick="deleteComment(${comment.id})">Remover</button>`;
              this.listaComentarios.appendChild(li);
            })
            .catch((error) =>
              console.error("Erro ao carregar autor do comentário:", error)
            );
        });
      })
      .catch((error) => console.error("Erro ao carregar comentários:", error));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");
  const detalhesNoticia = new DetalhesNoticia(postId);
  detalhesNoticia.carregarNoticia();
});

function editComment(commentId) {
  const editedComment = prompt("Editar comentário:");
  if (editedComment !== null) {
    ServicoAPI.editarComentario(commentId, editedComment)
      .then(() => {
        console.log("Comentário editado com sucesso.");
        fetchComments();
      })
      .catch((error) => console.error("Erro ao editar comentário:", error));
  }
}

function deleteComment(commentId) {
  if (confirm("Tem certeza que deseja remover este comentário?")) {
    ServicoAPI.removerComentario(commentId)
      .then(() => {
        console.log("Comentário removido com sucesso.");
        fetchComments();
      })
      .catch((error) => console.error("Erro ao remover comentário:", error));
  }
}

function fetchComments() {
  const detalhesNoticia = new DetalhesNoticia(postId);
  detalhesNoticia.carregarComentarios();
}
