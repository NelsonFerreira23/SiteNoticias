export class ServicoAPI {
  static carregarPosts(paginaAtual = 1, postsPorPagina = 5) {
    const startIndex = (paginaAtual - 1) * postsPorPagina;
    const endIndex = startIndex + postsPorPagina;

    return fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os posts");
        }
        return response.json();
      })
      .then((posts) => {
        const postsPaginados = posts.slice(startIndex, endIndex);
        return postsPaginados;
      })
      .catch((error) => {
        console.error("Erro ao carregar posts:", error);
        throw error;
      });
  }

  static carregarDestaques() {
    return fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os destaques");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Erro ao carregar destaques:", error);
        throw error;
      });
  }

  static carregarArtigosOpiniao() {
    return fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os artigos de opinião");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Erro ao carregar artigos de opinião:", error);
        throw error;
      });
  }

  static carregarNoticia(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar a notícia");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Erro ao carregar notícia:", error);
        throw error;
      });
  }

  static carregarUsuario(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o usuário");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Erro ao carregar usuário:", error);
        throw error;
      });
  }

  static carregarImagem(title) {
    return fetch(
      `https://api.pexels.com/v1/search?query=${title}&per_page=1&page=1`,
      {
        headers: {
          Authorization:
            "2noocBLOIJ6VORZL3DNCrx07Y0h4JFxZ1hXkUrz7CYVlCkcG2Dpx5ShR",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar a imagem");
        }
        return response.json();
      })
      .then((result) => {
        if (result.photos.length > 0) {
          return result.photos[0].src.medium;
        } else {
          console.log("Imagem não encontrada para este título.");
          return null;
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar imagem:", error);
        throw error;
      });
  }

  static carregarComentarios(postId) {
    return fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os comentários");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Erro ao carregar comentários:", error);
        throw error;
      });
  }

  static editarComentario(commentId, editedComment) {
    return fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
      method: "PUT",
      body: JSON.stringify({
        body: editedComment,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao editar o comentário");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Erro ao editar comentário:", error);
        throw error;
      });
  }

  static removerComentario(commentId) {
    return fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao remover o comentário");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Erro ao remover comentário:", error);
        throw error;
      });
  }
}
