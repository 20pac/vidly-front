const quote = document.querySelector("#quote");
const getNewquote = document.querySelector("#newQuote");
const author = document.querySelector("#author");

getNewquote.addEventListener("click", newQuote);

function setQuote(data) {
  quote.innerHTML = data.content;
  author.innerHTML = data.author;
}
function newQuote() {
  const url = new URL("https://api.quotable.io/random?maxLength=100");

  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        console.log("Looks like something's wrong " + response.status);
        return;
      }
      response.json().then((data) => setQuote(data));
    })
    .catch((err) => console.log(err));
}
