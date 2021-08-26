# Desafio realizado para a vaga de front-end na empresa Manipulaê

O desafio consiste na criação de uma aplicação em que um determinado usuário possa buscar diferentes músicas utilizando os seguintes parâmetros:

* Título da música
* Nome do Artista responsável pela música
* Nome do Álbum em que a música está disponível

Além disso, esse mesmo usuário também deve poder salvar suas músicas favoritas em um local específico da aplicação, de forma que o mesmo possa acessá-las posteriormente, através de uma lista.

## Tecnologias utilizadas

* React JS
* Redux
* Axios
* Styled Components
* Hooks

## Para executar a aplicação em sua máquina

* [Clonar o repositório](https://docs.github.com/pt/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)
* **npm install / npm yarn**
* **npm start**

## Comentários sobre o código

* Resolução do problema de CORS utilizando a seguinte dependência: [cors-anywhere](https://github.com/Rob--W/cors-anywhere). Isso foi feito para garantir que as requests à API aconteçam para qualquer pessoa que queira utilizar a aplicação.
* Além do armazenamento das músicas favoritas em uma redux store, as mesmas também foram adicionadas a localStorage (esse segundo ponto foi feito pensando no usuário, que poderá acessar as músicas que salvou mesmo fechando a página da aplicação).
* Para navegação através dos cards renderizados na página "Músicas", foi utilizado o conceito de infinity scroll ao invés da paginação tradicional. O mesmo foi feito utilizando um observer e, além disso, a lógica da implementação foi feita pensando nos conceitos de "debounce" and "throttle". Ou seja, de forma que um possível mal uso dessa feature seja evitado.
* A estilização foi feita através da biblioteca **styled-components**.
* Foram utilizados componentes funcionais para o gerenciamento de estados da aplicação. 

## Resultado final

![App Layout](https://github.com/vitorguima/manipulae-challenge/blob/3b68e2254b57894bbb4e7ddbb196589820737fcc/teste%20final.png)
