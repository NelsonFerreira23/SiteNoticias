// criar, ler, atualizar e excluir (CRUD)

//lê os dados de uma API
function getData() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) =>
        reject({
          texto: "Algo correu mal!",
          error: error,
        })
      );
  });
}
