// Importa a classe ServicoAPI
import { ServicoAPI } from "./servico.js";

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");

  const tituloNoticia = document.getElementById("tituloNoticia");
  const corpoNoticia = document.getElementById("corpoNoticia");
  const autorNoticia = document.getElementById("autorNoticia");
  const listaComentarios = document.getElementById("listaComentarios");
  const imagemNoticia = document.getElementById("imagemNoticia");

  try {
    const noticia = await ServicoAPI.carregarNoticia(postId);
    tituloNoticia.textContent = noticia.title;
    corpoNoticia.textContent = noticia.body;

    const user = await ServicoAPI.carregarUsuario(noticia.userId);
    autorNoticia.textContent = `Autor: ${user.name}`;

    const imgUrl = await ServicoAPI.carregarImagem(noticia.title);
    if (imgUrl) {
      imagemNoticia.src = imgUrl;
    } else {
      console.log("Imagem não encontrada para este título.");
    }

    const comentarios = await ServicoAPI.carregarComentarios(postId);
    comentarios.forEach((comment) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${comment.email}:</strong> ${comment.body}
                      <button class="btnEdit" onclick="editComment(${comment.id})">Editar</button>
                      <button class="btnDelete" onclick="deleteComment(${comment.id})">Remover</button>`;
      listaComentarios.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar detalhes da notícia:", error);
  }
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
  listaComentarios.innerHTML = "";

  const postId = new URLSearchParams(window.location.search).get("postId");
  ServicoAPI.carregarComentarios(postId)
    .then((comments) => {
      comments.forEach((comment) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${comment.email}:</strong> ${comment.body}
                        <button class="btnEdit" onclick="editComment(${comment.id})">Editar</button>
                        <button class="btnDelete" onclick="deleteComment(${comment.id})">Remover</button>`;
        listaComentarios.appendChild(li);
      });
    })
    .catch((error) => console.error("Erro ao carregar comentários:", error));
}
