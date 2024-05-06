const API_KEY = "c5a29433b35640898b72cebc27b6e988";

const URL = `https://newsapi.org/v2/everything?q=`;

window.addEventListener("load", getNews("india"));

async function getNews(query) {
  const res = await fetch(`${URL}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const main = document.getElementById("main");
  const template = document.getElementById("template__news--card");

  main.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardTemplate = template.content.cloneNode(true);
    fillDataInCard(cardTemplate, article);
    main.appendChild(cardTemplate);
  });
}

function fillDataInCard(cardTemplate, article) {
  const newsImage = cardTemplate.querySelector("#main__news--img");
  const newsTitle = cardTemplate.querySelector("#main__news--title");
  const newsInfo = cardTemplate.querySelector("#main__news--info");
  const newsDesc = cardTemplate.querySelector("#main__news--desc");

  newsImage.src = article.urlToImage;
  newsTitle.innerHTML = article.title;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsInfo.innerHTML = `${article.source.name} • ${date}`;
  newsDesc.innerHTML = article.description;

  cardTemplate.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let currentSelectedNav = null;
function onNavItemClick(id) {
  getNews(id);
  const navLink = document.getElementById(id);
  currentSelectedNav?.classList.remove("active");
  currentSelectedNav = navLink;
  currentSelectedNav.classList.add("active");
}

const input = document.getElementById("nav__search--input");
const inputBtn = document.getElementById("nav__search--btn");

inputBtn.addEventListener("click", searchByInput);
document.addEventListener("keydown", (e) => {
  if (e.code == "Enter") searchByInput();
});

function searchByInput() {
  const inpValue = input.value;
  if (!inpValue) return;

  getNews(inpValue);
  input.value = "";
  nav__search.classList.remove("active");
  nav__items.classList.remove("toggle");
  currentSelectedNav.classList.remove("active");
}

const searchIcon = document.getElementById("searchIcon");
const menuIcon = document.getElementById("menuIcon");
const nav__items = document.getElementById("nav__items");
const nav__search = document.getElementById("nav__search");

menuIcon.addEventListener("click", () => {
  nav__items.classList.toggle("toggle");
});

searchIcon.addEventListener("click", () => {
  nav__search.classList.toggle("active");
});
