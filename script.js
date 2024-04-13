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

// Array de URLs de imagens
const imagens = [
  "https://images.unsplash.com/photo-1712174766230-cb7304feaafe?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://t.ctcdn.com.br/JlHwiRHyv0mTD7GfRkIlgO6eQX8=/640x360/smart/i257652.jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAAu09Q1i9ty0Aroxh739MYwHQXc1HwXK74hGwKFIhVQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAAu09Q1i9ty0Aroxh739MYwHQXc1HwXK74hGwKFIhVQ&s",
];

// Função para obter uma imagem aleatória da array
function getImagemAleatoria() {
  // Gera um índice aleatório dentro do intervalo da array de imagens
  const indiceAleatorio = Math.floor(Math.random() * imagens.length);
  // Retorna a URL da imagem correspondente ao índice aleatório
  return imagens[indiceAleatorio];
}
