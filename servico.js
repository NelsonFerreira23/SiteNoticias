export class ServicoAPI {
  // Método para carregar noticias
  static carregarPosts(paginaAtual = 1, postsPorPagina = 5) {
    const startIndex = (paginaAtual - 1) * postsPorPagina;
    const endIndex = startIndex + postsPorPagina;

    return fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${paginaAtual}&_limit=5`
    )
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

  // Método para carregar destaques
  static carregarDestaques() {
    return fetch("https://jsonplaceholder.typicode.com/posts?_limit=4")
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

  // Método para carregar artigos de opinião
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
}
